import type { IEvent, IEventImage } from "../../shared/types.js";
import { Event } from "../models/event.js";
import { BAD_REQUEST_ERROR, INVALID_ID } from "../../shared/constants/responseMessages.js";
import { BadRequestError } from "../errors/customErrors.js";
import { ID_LENGTH, MAX_EVENTS_LISTED } from "../constants/validationNumbers.js";
import { getTokenData } from "../utils/jwt.js";
import { DESC, TWO_WEEKS_DAYS_COUNT, eventImageFieldSelector } from "../constants/queryConstants.js";
import { getDateBefore, getDateNow, getTimeStamp } from "../utils/time.js";
import type { DBEvent } from "../types.js";
import { checkDateFormat } from "../../shared/utils/dateValidations.js";
import { EVENT_NOT_EXIST } from "../constants/customErrorMessages.js";
import mongoose from "mongoose";
import { isPastDate } from "../../shared/utils/dateUtils.js";
import { getIntegerEnvVarOrDefault } from "../utils/environmentVariablesParseUtils.js";
import { logger } from "../config/logger.js";
import { DELETE_EVENT_FAIL, DELETE_EXPIRED_EVENT_FAIL } from "../constants/internalErrorMessages.js";
import { getExactIds } from "../utils/mappingUtils.js";

async function create(accessToken: string, event: IEvent): Promise<DBEvent> {
    checkDateFormat(event.startingDate);

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const newEvent: DBEvent = new Event(event);
        newEvent.dateCreated = getDateNow();
        newEvent.createdBy = getTokenData(accessToken).userId;
        newEvent.chatRoomId = "NOT IMPLEMENTED";

        const savedEvent = await newEvent.save({ session });

        await session.commitTransaction()

        return savedEvent;
    } catch (error) {
        await session.abortTransaction();

        throw error;
    } finally {
        await session.endSession();
    }
}

async function getAll(): Promise<DBEvent[]> {
    const events = await getLatestEventsLimited();

    return sortEventsUpcomingBeforePast(events);
}

async function getAllEventImages(): Promise<IEventImage[]> {
    const eventImages = await Event.find()
        .select(eventImageFieldSelector)
        .sort({ startingDate: DESC })
        .limit(MAX_EVENTS_LISTED)
        .exec();

    return eventImages;
}

async function getById(id: string): Promise<DBEvent> {
    checkForInvalidId(id);

    const event = await Event.findOne({ _id: id }).select({ imageUri: 0 });

    if (!event) {
        throw new BadRequestError(EVENT_NOT_EXIST);
    }

    return event;
}

async function getEventImageById(id: string): Promise<IEventImage> {
    checkForInvalidId(id);

    const event = await Event.findOne({ _id: id }).select(eventImageFieldSelector);

    if (!event) {
        throw new BadRequestError(EVENT_NOT_EXIST);
    }

    return event;
}

async function deleteById(id: string): Promise<void> {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        checkForInvalidId(id);

        const event = await Event.findOneAndDelete({ _id: id }, { session });

        if (!event) {
            throw new BadRequestError(EVENT_NOT_EXIST);
        }

        await session.commitTransaction()
    } catch (error) {
        await session.abortTransaction();
        logger.error(DELETE_EVENT_FAIL + id);

        throw error;
    } finally {
        await session.endSession();
    }
}

async function updateById(id: string, values: IEvent): Promise<DBEvent> {
    checkForInvalidId(id);

    if (values.startingDate) {
        checkDateFormat(values.startingDate);
    }

    const event = await Event
        .findByIdAndUpdate(id, values, { runValidators: true, new: true }).lean();
        
    if (!event) {
        throw new BadRequestError(BAD_REQUEST_ERROR);
    }

    return event;
}

async function deleteExpiredEvents(): Promise<void> {
    const eventIds = await getExpiredEventIds();

    await Promise.all(eventIds.map(async eventId => {
        try {
            await deleteById(eventId);
        } catch (error) {
            logger.error(DELETE_EXPIRED_EVENT_FAIL + eventId);
            logger.error(error);
        }
    }));
}

async function getExpiredEventIds(): Promise<string[]> {
    const expirationDate = getExpirationDate();

    const eventIds = await Event
        .find()
        .select({
             _id: 1 
            })
        .where({
            startingDate: {
                $lte: expirationDate
            }
        })
        .exec();

    const exactIds = getExactIds(eventIds);

    return exactIds;
}

function getExpirationDate(): Date {
    const days = getIntegerEnvVarOrDefault(process.env.EVENTS_LIFESPAN_IN_DAYS, TWO_WEEKS_DAYS_COUNT);

    return getDateBefore(days);
}

async function deleteAllEvents(): Promise<void> {
    const eventIds = await getAllEventIds();
  
    await Promise.all(eventIds.map(async eventId => {
        try {
            await deleteById(eventId);
        } catch (error) {
          logger.error(DELETE_EVENT_FAIL + eventId);
          logger.error(error);
        }
    }));
}
  
async function getAllEventIds(): Promise<string[]> {
    const eventIds = await Event
        .find()
        .select({
             _id: 1 
            })
        .exec();
  
    const exactIds = getExactIds(eventIds);

    return exactIds;
}

function sortEventsUpcomingBeforePast(events: DBEvent[]) {
    const upcomingEvents = getUpcomingEvents(events);
    const pastEvents = getPastEvents(events);
    const allEvents = upcomingEvents.concat(pastEvents);

    return allEvents;
}

function getUpcomingEvents(events: DBEvent[]) {
    return events.filter(event => {
        return !isPastDate(event.startingDate);
    }).sort((a, b) => {
        const timeStampA = getTimeStamp(a.startingDate, a.startingTime);
        const timeStampB = getTimeStamp(b.startingDate, b.startingTime);

        return timeStampA - timeStampB;
    });
}

function getPastEvents(events: DBEvent[]) {
    return events.filter(event => {
        return isPastDate(event.startingDate);
    }).sort((a, b) => {
        const timeStampA = getTimeStamp(a.startingDate, a.startingTime);
        const timeStampB = getTimeStamp(b.startingDate, b.startingTime);

        return timeStampA + timeStampB;
    });
}

async function getLatestEventsLimited() {
    const events = await Event
        .find()
        .select({ imageUri: 0 })
        .sort({ startingDate: DESC })
        .limit(MAX_EVENTS_LISTED)
        .exec();
    return events;
}

function checkForInvalidId(id: string) {
    if (id.length !== ID_LENGTH) {
        throw new BadRequestError(INVALID_ID);
    }
}

export default { create, getAll, getAllEventImages, getById, getEventImageById, deleteById, updateById, deleteExpiredEvents, deleteAllEvents };

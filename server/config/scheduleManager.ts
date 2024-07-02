import cron from "node-cron";
import { getLocalTimeZone } from "../utils/time.js";
import { logger } from "./logger.js";
import eventService from "../services/eventService.js";
import { EVENT_CLEANUP_FINISHED } from "../../shared/constants/responseMessages.js";
import { CRON_PATTERN_DELETE_EVENTS } from "../constants/configConstants.js";

function deleteExpiredEvents(): void {
    const localTimeZone = getLocalTimeZone();

    cron.schedule(CRON_PATTERN_DELETE_EVENTS, async () => {
        await eventService.deleteExpiredEvents();
        logger.info(EVENT_CLEANUP_FINISHED + new Date());
    }, {
        scheduled: true,
        timezone: localTimeZone
    });
}

export function startScheduleManager(): void {
        deleteExpiredEvents();
}
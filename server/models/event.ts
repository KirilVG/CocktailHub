import { Schema, model } from "mongoose";
import { LocationSchema } from "./location.js";
import {
    EVENT_NAME_REQUIRED, SHORT_DESCR_REQUIRED, STARTING_TIME_REQUIRED,
    STARTING_DATE_VALIDATION_ERROR, FORBIDDEN_SYMBOL_ERROR, STARTING_DATE_REQUIRED,
    IMG_REQUIRED, SHORT_DESCR_MAX_LENGTH_ERROR, DESCR_MAX_LENGTH_ERROR,
    AGE_GROUP_MAX_LENGTH_ERROR, EVENT_NAME_MAX_LENGTH_ERROR, CHAT_ID_MAX_LENGTH_ERROR,
    ORGANIZER_NAME_REQUIRED, ORGANIZER_NAME_MAX_LENGTH_ERROR
}
    from "../constants/validationErrorMessages.js";
import { eventDescriptionRegex, eventNameRegex, eventTimeRegex }
    from "../../shared/utils/regexPatterns.js";
import {
    AGE_GROUP_MAX_LENGTH, CHAT_ID_MAX_LENGTH, DESCR_MAX_LENGTH, EVENT_NAME_MAX_LENGTH,
    ORGANIZER_NAME_MAX_LENGTH, SHORT_DESCR_MAX_LENGTH
} from "../constants/validationNumbers.js";
import type { DBEvent } from "../types.js";
import { EVENT_MODEL_NAME, EventFields, USER_MODEL_NAME, UserFields } from "../constants/modelConstants.js";
import { isPastDate } from "../../shared/utils/dateUtils.js";

const schema = new Schema<DBEvent>({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: USER_MODEL_NAME
    },
    organizerName: {
        type: String,
        required: [true, ORGANIZER_NAME_REQUIRED],
        maxlength: [ORGANIZER_NAME_MAX_LENGTH, ORGANIZER_NAME_MAX_LENGTH_ERROR]
    },
    chatRoomId: {
        type: String,
        maxlength: [CHAT_ID_MAX_LENGTH, CHAT_ID_MAX_LENGTH_ERROR]
    },
    imageUri: {
        type: String,
        required: [true, IMG_REQUIRED]
    },
    name: {
        type: String,
        required: [true, EVENT_NAME_REQUIRED],
        maxlength: [EVENT_NAME_MAX_LENGTH, EVENT_NAME_MAX_LENGTH_ERROR],
        validate: {
            validator: (v: string) => eventNameRegex.test(v),
            message: (props: { value: string; }) => `${props.value}${FORBIDDEN_SYMBOL_ERROR}`
        }
    },
    shortDescription: {
        type: String,
        required: [true, SHORT_DESCR_REQUIRED],
        maxlength: [SHORT_DESCR_MAX_LENGTH, SHORT_DESCR_MAX_LENGTH_ERROR],
        validate: {
            validator: (v: string) => eventDescriptionRegex.test(v),
            message: (props: { value: string; }) => `${props.value}${FORBIDDEN_SYMBOL_ERROR}`
        }
    },
    description: {
        type: String,
        maxlength: [DESCR_MAX_LENGTH, DESCR_MAX_LENGTH_ERROR],
        validate: {
            validator: (v: string) => eventDescriptionRegex.test(v),
            message: (props: { value: string; }) => `${props.value}${FORBIDDEN_SYMBOL_ERROR}`
        }
    },
    startingDate: {
        type: Date,
        required: [true, STARTING_DATE_REQUIRED],
        validate: {
            validator: (input: Date) => !isPastDate(input),
            message: STARTING_DATE_VALIDATION_ERROR
        }
    },
    startingTime: {
        type: String,
        required: [true, STARTING_TIME_REQUIRED],
        validate: {
            validator: (v: string) => eventTimeRegex.test(v),
            message: (props: { value: string; }) => `${props.value}${FORBIDDEN_SYMBOL_ERROR}`
        }
    },
    dateCreated: {
        type: Date
    },
    ageGroup: {
        type: String,
        maxlength: [AGE_GROUP_MAX_LENGTH, AGE_GROUP_MAX_LENGTH_ERROR]
    },
    location: LocationSchema
});

schema.index({ startingDate: -1 });
schema.index({ createdBy: 1 });
schema.index({ name: 1 });
schema.index({ organizerName: 1 });
schema.index({ ageGroup: 1 });

schema.pre(['find', 'findOne', 'findOneAndUpdate'], function(next) {
    this.populate({
        path: EventFields.createdBy,
        select: UserFields.username
    });
    next();
});

export const Event = model<DBEvent>(EVENT_MODEL_NAME, schema);
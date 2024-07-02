import { Schema, model } from "mongoose";
import { BAR_MODEL_NAME } from "../constants/modelConstants";
import { DBBar,  } from "../types";
import { BAR_NAME_MAX_LENGTH_ERROR, BAR_NAME_REQUIRED } from "../constants/validationErrorMessages";
import { BAR_NAME_MAX_LENGTH, COCKTAIL_NAME_MAX_LENGTH } from "../constants/validationNumbers";

const BarSchema: Schema = new Schema<DBBar>({
    ownerID: {
        type: String,
    },
    imageUri: {
        type: String,
    },
    name:  {
        type: String,
        required: [true, BAR_NAME_REQUIRED],
        unique: true,
        maxlength: [BAR_NAME_MAX_LENGTH, BAR_NAME_MAX_LENGTH_ERROR],
    },
    description:  {
        type: String,
    },
    cocktails: {
        type: [],
    },
    workingHours: {
        type: String,
    },
    dateCreated: {
        type: Date
    },
});

export const Bar = model<DBBar>(BAR_MODEL_NAME, BarSchema);
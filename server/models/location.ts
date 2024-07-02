import mongoose from "mongoose";
import { LOCATION_NAME_MAX_LENGTH } from "../constants/validationNumbers.js";
import { LATITUDE_REQUIRED, LOCATION_NAME_MAX_LENGTH_ERROR, LONGITUDE_REQUIRED } 
from "../constants/validationErrorMessages.js";
import { ILocation } from "../../shared/types.js";

export const LocationSchema = new mongoose.Schema<ILocation>({
    name: {
        type: String,
        required: true,
        maxlength: [LOCATION_NAME_MAX_LENGTH, LOCATION_NAME_MAX_LENGTH_ERROR]
    },
    position: {
        lat: {
            type: Number,
            require: [true, LATITUDE_REQUIRED]
        },
        lng: {
            type: Number,
            require: [true, LONGITUDE_REQUIRED]
        }
    }
});
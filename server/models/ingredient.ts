import { Schema, model } from "mongoose";
import { INGREDIENT_NAME_MAX_LENGTH } from "../constants/validationNumbers";
import { INGREDIENT_NAME_MAX_LENGTH_ERROR, INGREDIENT_NAME_REQUIRED } from "../constants/validationErrorMessages";
import { DBIngredient } from "../types";
import { INGREDIENT_MODEL_NAME } from "../constants/modelConstants";

const IngredientSchema: Schema = new Schema<DBIngredient>({
    creatorId: {
        type: String,
    },
    imageUri: {
        type: String,
    },
    name:  {
        type: String,
        required: [true, INGREDIENT_NAME_REQUIRED],
        unique: true,
        maxlength: [INGREDIENT_NAME_MAX_LENGTH, INGREDIENT_NAME_MAX_LENGTH_ERROR],
    },
    description:  {
        type: String,
    },
    dateCreated: {
        type: Date
    },
});

export const Ingredient = model<DBIngredient>(INGREDIENT_MODEL_NAME, IngredientSchema);
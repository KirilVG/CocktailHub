import { Schema, model } from "mongoose";
import { COCKTAIL_MODEL_NAME, INGREDIENT_MODEL_NAME } from "../constants/modelConstants";
import { DBCocktail } from "../types";
import { COCKTAIL_NAME_MAX_LENGTH_ERROR, COCKTAIL_NAME_REQUIRED } from "../constants/validationErrorMessages";
import { COCKTAIL_NAME_MAX_LENGTH } from "../constants/validationNumbers";

const CocktailSchema: Schema = new Schema<DBCocktail>({
    creatorId: {
        type: String,
    },
    imageUri: {
        type: String,
    },
    name:  {
        type: String,
        required: [true, COCKTAIL_NAME_REQUIRED],
        unique: true,
        maxlength: [COCKTAIL_NAME_MAX_LENGTH, COCKTAIL_NAME_MAX_LENGTH_ERROR],
    },
    description:  {
        type: String,
    },
    ingredients: {
        type: [],
    },
    preparationInstructions: {
        type: String,
    },
    dateCreated: {
        type: Date
    },
});

export const Cocktail = model<DBCocktail>(COCKTAIL_MODEL_NAME, CocktailSchema);
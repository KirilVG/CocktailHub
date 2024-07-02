import mongoose from "mongoose";
import { IIngredient } from "../../shared/types";
import { DBIngredient } from "../types";
import { Ingredient } from "../models/ingredient";
import { getDateNow } from "../utils/time";
import { getTokenData } from "../utils/jwt";
import { DESC } from "../constants/queryConstants";
import { ID_LENGTH, MAX_INGREDIENTS_LISTED } from "../constants/validationNumbers";
import { BadRequestError } from "../errors/customErrors";
import { INGREDIENT_NOT_EXIST } from "../constants/customErrorMessages";
import { DELETE_INGREDIENT_FAIL, INVALID_ID } from "../constants/internalErrorMessages";
import { logger } from "../config/logger";
import { BAD_REQUEST_ERROR } from "../../shared/constants/responseMessages";
import { Cocktail } from "../models/cocktail";

async function create(accessToken: string, ingredient: IIngredient): Promise<DBIngredient> {

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const newIngredient: DBIngredient = new Ingredient(ingredient);
        newIngredient.dateCreated = getDateNow();
        newIngredient.creatorId = getTokenData(accessToken).userId;

        const savedIngredient = await newIngredient.save({ session });

        await session.commitTransaction()

        return savedIngredient;
    } catch (error) {
        await session.abortTransaction();

        throw error;
    } finally {
        await session.endSession();
    }
}

async function getAll(): Promise<DBIngredient[]> {
    const ingredients = await Ingredient
        .find()
        .sort({ dateCreated: DESC })
        .limit(MAX_INGREDIENTS_LISTED)
        .exec();

    return ingredients;
}

async function getById(id: string): Promise<DBIngredient> {
    checkForInvalidId(id);

    const ingredient = await Ingredient.findOne({ _id: id });

    if (!ingredient) {
        throw new BadRequestError(INGREDIENT_NOT_EXIST);
    }

    return ingredient;
}

async function deleteById(id: string): Promise<void> {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        checkForInvalidId(id);

        const ingredient = await Ingredient.findOneAndDelete({ _id: id }, { session });

        if (!ingredient) {
            throw new BadRequestError(INGREDIENT_NOT_EXIST);
        }

        updateAffectedCocktails(id);

        await session.commitTransaction()
    } catch (error) {
        await session.abortTransaction();
        logger.error(DELETE_INGREDIENT_FAIL + id);

        throw error;
    } finally {
        await session.endSession();
    }
}

async function updateAffectedCocktails(ingredientId: string) {
    const cocktails = await Cocktail.find( {ingredients: ingredientId });

    for (let i = 0; i < cocktails.length; i++) {
        cocktails[i].ingredients = cocktails[i].ingredients
            .filter((ingredient: string) => ingredient !== ingredientId)
        
        await Cocktail
            .findByIdAndUpdate(cocktails[i]._id, cocktails[i], { runValidators: true, new: true }).lean();
    }
}

async function updateById(id: string, values: IIngredient): Promise<DBIngredient> {
    checkForInvalidId(id);

    const ingredient = await Ingredient
        .findByIdAndUpdate(id, values, { runValidators: true, new: true }).lean();
        
    if (!ingredient) {
        throw new BadRequestError(BAD_REQUEST_ERROR);
    }

    return ingredient;
}

function checkForInvalidId(id: string) {
    if (id.length !== ID_LENGTH) {
        throw new BadRequestError(INVALID_ID);
    }
}

export default { create, getAll, getById, deleteById, updateById };

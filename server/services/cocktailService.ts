import mongoose from "mongoose";
import { ICocktail } from "../../shared/types";
import { DBCocktail } from "../types";
import { Cocktail } from "../models/cocktail";
import { getDateNow } from "../utils/time";
import { getTokenData } from "../utils/jwt";
import ingredientService from "./ingredientService";
import { DESC } from "../constants/queryConstants";
import { ID_LENGTH, MAX_COCKTAILS_LISTED } from "../constants/validationNumbers";
import { BadRequestError } from "../errors/customErrors";
import { logger } from "../config/logger";
import { BAD_REQUEST_ERROR, INVALID_ID } from "../../shared/constants/responseMessages";
import { Bar } from "../models/bar";


async function create(accessToken: string, cocktail: ICocktail): Promise<DBCocktail> {

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const newCocktail: DBCocktail = new Cocktail(cocktail);
        newCocktail.dateCreated = getDateNow();
        newCocktail.creatorId = getTokenData(accessToken).userId;

        for (let i = 0; i < newCocktail.ingredients.length; i++) {
            const ingredient = await ingredientService.getById(newCocktail.ingredients[i]);

            if(!ingredient) {
                throw new Error("Invalid Ingredient ID");
            }
        }

        const savedCocktail = await newCocktail.save({ session });

        await session.commitTransaction()

        return savedCocktail;
    } catch (error) {
        await session.abortTransaction();

        throw error;
    } finally {
        await session.endSession();
    }
}

async function getAll(): Promise<DBCocktail[]> {
    const cocktails = await Cocktail
        .find()
        .sort({ dateCreated: DESC })
        .limit(MAX_COCKTAILS_LISTED)
        .exec();

    return cocktails;
}

async function getById(id: string): Promise<DBCocktail> {
    checkForInvalidId(id);

    const cocktail = await Cocktail.findOne({ _id: id });

    if (!cocktail) {
        throw new BadRequestError("Cocktail does not exist");
    }

    return cocktail;
}

async function deleteById(id: string): Promise<void> {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        checkForInvalidId(id);

        const cocktail = await Cocktail.findOneAndDelete({ _id: id }, { session });

        if (!cocktail) {
            throw new BadRequestError("Cocktail does not exist");
        }

        updateAffectedBars(id);

        await session.commitTransaction()
    } catch (error) {
        await session.abortTransaction();
        logger.error("Cocktail delition failed " + id);

        throw error;
    } finally {
        await session.endSession();
    }
}

async function updateAffectedBars(cocktailID: string) {
    const bars = await Bar.find( {cocktails: cocktailID });

    for (let i = 0; i < bars.length; i++) {
        bars[i].cocktails = bars[i].cocktails
            .filter((coktail: string) => coktail !== cocktailID)
        
        await Bar
            .findByIdAndUpdate(bars[i]._id, bars[i], { runValidators: true, new: true }).lean();
    }
}

async function updateById(id: string, values: ICocktail): Promise<DBCocktail> {
    checkForInvalidId(id);

    if(values.ingredients) {
        for (let i = 0; i < values.ingredients.length; i++) {
            const ingredient = await ingredientService.getById(values.ingredients[i].toString());
    
            if(!ingredient) {
                throw new Error("Invalid Ingredient ID");
            }
        }
    }

    const cocktail = await Cocktail
        .findByIdAndUpdate(id, values, { runValidators: true, new: true }).lean();
        
    if (!cocktail) {
        throw new BadRequestError(BAD_REQUEST_ERROR);
    }

    return cocktail;
}

function checkForInvalidId(id: string) {
    if (id.length !== ID_LENGTH) {
        throw new BadRequestError(INVALID_ID);
    }
}

export default { create, getAll, getById, deleteById, updateById };

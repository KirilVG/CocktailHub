import mongoose from "mongoose";
import { IBar } from "../../shared/types";
import { DBBar } from "../types";
import { Bar } from "../models/bar";
import { getDateNow } from "../utils/time";
import { getTokenData } from "../utils/jwt";
import cocktailService from "./cocktailService";
import { DESC } from "../constants/queryConstants";
import { BAR_MAX_LISTED, ID_LENGTH } from "../constants/validationNumbers";
import { BadRequestError } from "../errors/customErrors";
import { logger } from "../config/logger";
import { BAD_REQUEST_ERROR, INVALID_ID } from "../../shared/constants/responseMessages";

async function create(accessToken: string, cocktail: IBar): Promise<DBBar> {

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const newBar: DBBar = new Bar(cocktail);
        newBar.dateCreated = getDateNow();
        newBar.ownerID = getTokenData(accessToken).userId;

        for (let i = 0; i < newBar.cocktails.length; i++) {
            const cocktail = await cocktailService.getById(newBar.cocktails[i]);

            if(!cocktail) {
                throw new Error("Invalid cocktail ID");
            }
        }

        const savedBar = await newBar.save({ session });

        await session.commitTransaction()

        return savedBar;
    } catch (error) {
        await session.abortTransaction();

        throw error;
    } finally {
        await session.endSession();
    }
}

async function getAll(): Promise<DBBar[]> {
    const bars = await Bar
        .find()
        .sort({ dateCreated: DESC })
        .limit(BAR_MAX_LISTED)
        .exec();

    return bars;
}

async function getById(id: string): Promise<DBBar> {
    checkForInvalidId(id);

    const bar = await Bar.findOne({ _id: id });

    if (!bar) {
        throw new BadRequestError("Cocktail does not exist");
    }

    return bar;
}

async function deleteById(id: string): Promise<void> {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        checkForInvalidId(id);

        const bar = await Bar.findOneAndDelete({ _id: id }, { session });

        if (!bar) {
            throw new BadRequestError("Bar does not exist");
        }

        await session.commitTransaction()
    } catch (error) {
        await session.abortTransaction();
        logger.error("Bar delition failed " + id);

        throw error;
    } finally {
        await session.endSession();
    }
}

async function updateById(id: string, values: IBar): Promise<DBBar> {
    checkForInvalidId(id);

    if(values.cocktails) {
        for (let i = 0; i < values.cocktails.length; i++) {
            const ingredient = await cocktailService.getById(values.cocktails[i].toString());
    
            if(!ingredient) {
                throw new Error("Invalid Coktail ID");
            }
        }
    }

    const bar = await Bar
        .findByIdAndUpdate(id, values, { runValidators: true, new: true }).lean();
        
    if (!bar) {
        throw new BadRequestError(BAD_REQUEST_ERROR);
    }

    return bar;
}

function checkForInvalidId(id: string) {
    if (id.length !== ID_LENGTH) {
        throw new BadRequestError(INVALID_ID);
    }
}

export default { create, getAll, getById, deleteById, updateById };

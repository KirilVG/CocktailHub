import type { NextFunction, Request, Response } from "express";
import { CustomError } from "./customErrors.js";
import mongoose from "mongoose";
import { BAD_REQUEST_ERROR, HttpStatusCode, INTERNAL_SERVER_ERROR } from "../../shared/constants/responseMessages.js";
import { logger } from "../config/logger.js";

export const errorHandler = (
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = HttpStatusCode.INTERNAL_SERVER;
    let responseMessage: string = INTERNAL_SERVER_ERROR;
    let loggerMessages: string[] = [INTERNAL_SERVER_ERROR];

    if (error instanceof mongoose.Error.ValidationError) {
        const validationErrors = Object.values(error.errors).map((err) => err.message);
        statusCode = HttpStatusCode.BAD_REQUEST;
        responseMessage = BAD_REQUEST_ERROR;
        loggerMessages = validationErrors;
        logErrors(loggerMessages);
        res.status(statusCode).json({ message: responseMessage });
        return;
    }

    if (error instanceof CustomError) {
        statusCode = error.statusCode;
        responseMessage = error.message;
        loggerMessages = [error.loggerMessage];
        logErrors(loggerMessages);
        res.status(statusCode).json({ message: responseMessage });
        return;
    }

    if (error instanceof Error) {
        logErrors([error.message]);
        res.status(statusCode).json({ message: responseMessage });
        return;
    }

    logger.error(JSON.stringify(error));
    logErrors([responseMessage]);

    res.status(statusCode).json({ message: responseMessage });
    return;
};

function logErrors(errorMessages: string[]) {
    logger.error(errorMessages);
}
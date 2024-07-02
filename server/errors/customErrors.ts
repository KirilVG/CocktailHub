import { NOT_FOUND_ERROR, UNAUTHORIZED_ERROR, BAD_REQUEST_ERROR, INTERNAL_SERVER_ERROR,
     HttpStatusCode, FORBIDDEN_ERROR } from "../../shared/constants/responseMessages.js";

class CustomError extends Error {
    statusCode: number;
    loggerMessage: string;
    constructor(responseMessage: string, statusCode: number, loggerMessage: string) {
        super(responseMessage);
        this.name = this.constructor.name;
        this.statusCode = statusCode || HttpStatusCode.INTERNAL_SERVER;
        this.loggerMessage = loggerMessage;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends CustomError {
    constructor(loggerMessage: string) {
        super(NOT_FOUND_ERROR, HttpStatusCode.NOT_FOUND, loggerMessage);
    }
}

class UnauthorizedError extends CustomError {
    constructor(loggerMessage: string) {
        super(UNAUTHORIZED_ERROR, HttpStatusCode.UNAUTHORIZED, loggerMessage);
    }
}

class ForbiddenError extends CustomError {
    constructor(loggerMessage: string) {
        super(FORBIDDEN_ERROR, HttpStatusCode.FORBIDDEN, loggerMessage);
    }
}

class DuplicateEntryError extends CustomError {
    constructor(loggerMessage: string) {
        super(BAD_REQUEST_ERROR, HttpStatusCode.BAD_REQUEST, loggerMessage);
    }
}

class BadRequestError extends CustomError {
    constructor(loggerMessage: string) {
        super(BAD_REQUEST_ERROR, HttpStatusCode.BAD_REQUEST, loggerMessage);
    }
}

class InternalServerError extends CustomError {
    constructor(loggerMessage: string) {
        super(INTERNAL_SERVER_ERROR, HttpStatusCode.INTERNAL_SERVER, loggerMessage);
    }
}

class ModelValidationError extends CustomError {
    constructor(loggerMessage: string) {
        super(BAD_REQUEST_ERROR, HttpStatusCode.BAD_REQUEST, loggerMessage);
    }
}

export { 
    CustomError, 
    NotFoundError, 
    UnauthorizedError, 
    DuplicateEntryError,
    BadRequestError, 
    InternalServerError,
    ModelValidationError, 
    ForbiddenError
};
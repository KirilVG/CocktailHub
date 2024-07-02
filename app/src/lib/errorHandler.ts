import { errorMessagesTranslationsMap, ErrorType } from "@/constants/errorMessages";
import getTranslation from "@/utils/transtationUtil";

export class AppError extends Error {
    constructor(message: string, public errorType: string, public cause?: Error) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const handleError = (error: AppError): string => {
    const httpStatus = String(error.errorType || ErrorType.UnknownError);

    const errorMessageKey = errorMessagesTranslationsMap.get(httpStatus);

    if (errorMessageKey) {
        return getTranslation(errorMessageKey);
    }

    return getTranslation("form.responseMessages.unknownError");
};
import { INVALID_DATE_FORMAT } from "../../server/constants/validationErrorMessages.js";
import { BadRequestError } from "../../server/errors/customErrors.js";
import { dateRegex } from "./regexPatterns.js";

export function checkDateFormat(date: string) {
    if (!dateRegex.test(date)) {
        throw new BadRequestError(INVALID_DATE_FORMAT);
    }
}
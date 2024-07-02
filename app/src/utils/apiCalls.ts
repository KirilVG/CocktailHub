import { ErrorMessage, ErrorType } from "@/constants/errorMessages";
import { AppError } from "@/lib/errorHandler";
import { AxiosError } from "axios";

export function handleError(error: unknown): AppError {
    if (error instanceof AxiosError) {
        switch (error.response?.status) {
            case 400:
                return new AppError(ErrorMessage.BadRequestError, ErrorType.BadRequestError);
            case 401:
                return new AppError(ErrorMessage.UnauthorizedError, ErrorType.Unauthorized);
            default:
                return new AppError(ErrorMessage.UnknownError, ErrorType.UnknownError);
        }
    }
    return new AppError(ErrorMessage.UnknownError, ErrorType.UnknownError);
}
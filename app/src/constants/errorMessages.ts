export enum ErrorType {
    LoginError = 'LoginError',
    RegisterError = 'RegisterError',
    ForbiddenError = 'ForbiddenError',
    BadRequestError = 'BadRequestError',
    DuplicateEntryError = 'DuplicateEntryError',
    Unauthorized = 'Unauthorized',
    UnknownError = 'UnknownError'
}

export enum ErrorMessage {
    BadRequestError = 'Bad request',
    UnauthorizedError = 'Unauthorized access',
    ForbiddenError = 'Forbidden access',
    DuplicateEntryError = 'Duplicate entry',
    DuplicateEventError = 'Duplicate event',
    UnknownError = 'Something went wrong'
}

export const errorMessagesTranslationsMap = new Map([
    ["LoginError", "form.responseMessages.loginFailed"],
    ["RegisterError", "form.responseMessages.registrationFailed"],
    ["DuplicateEventError", "landingPage.messages.duplicateEvent"],
    ["UnknownError", "form.responseMessages.unknownError"],
    ["BadRequestError","modalForm.responseMessages.invalidInputData"],
    ["Unauthorized", "landingPage.messages.unauthorizedMessage"]
]);

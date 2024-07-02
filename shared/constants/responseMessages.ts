export const REGISTRATION_SUCCESSFUL = "Registration successful";
export const LOGIN_SUCCESSFUL = "Login successful";
export const LOGOUT_SUCCCESSFUL = "Logout successful";
export const INTERNAL_SERVER_ERROR = "Internal Server Error";
export const UNAUTHORIZED_ERROR = "Unauthorized";
export const FORBIDDEN_ERROR = "Forbidden";
export const NOT_FOUND_ERROR = "Not Found";
export const BAD_REQUEST_ERROR = "Bad Request";
export const CHANGE_ROLE_SUCCESSFUL = 'User role updated successfully';
export const GET_ALL_USERS_SUCCESSFUL = 'Get all users successful';
export const GET_USER_SCCESSFUL = 'Get user success';
export const DELETE_USER_SUCCESSFUL = 'User deleted successfully';
export const INVALID_ID = 'Invalid Id';
export const EVENT_CLEANUP_FINISHED = "Event cleanup finished at: ";

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}
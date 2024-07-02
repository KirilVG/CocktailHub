import { UserRole } from "../../shared/constants/userRoles.js";

export const ACCESS_TOKEN = "accessToken";
export const ALL_ROLES = [UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER];
export const EVENT_MODEL_NAME = "Event";
export const INGREDIENT_MODEL_NAME = "Ingredient";
export const COCKTAIL_MODEL_NAME = "Cocktail";
export const BAR_MODEL_NAME = "Bar";
export const USER_MODEL_NAME = "User";
export const EventFields = {
    organizerName: 'organizerName',
    _id: '_id',
    createdBy: 'createdBy',
    chatRoomId: 'chatRoomId',
    imageUri: 'imageUri',
    name: 'name',
    shortDescription: 'shortDescription',
    description: 'description',
    startingDate: 'startingDate',
    startingTime: 'startingTime',
    ageGroup: 'ageGroup',
    location: 'location',
    dateCreated: 'dateCreated'
};
export const UserFields = {
    _id: '_id',
    username: 'username',
    email: 'email',
    role: 'role'
};
import { EventFields, UserFields } from "./modelConstants.js";

export const DESC = "desc";
export const ASC = "asc";
export const TWO_WEEKS_DAYS_COUNT = 14;
export const userFieldSelector = {
    [UserFields._id]: 1,
    [UserFields.username]: 1,
    [UserFields.email]: 1,
    [UserFields.role]: 1
};
export const eventImageFieldSelector = {
    [EventFields._id]: 1,
    [EventFields.imageUri]: 1
};

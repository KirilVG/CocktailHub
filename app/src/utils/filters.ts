import type { IEvent, ILocation, IUser } from "../../../shared/types.js";

export function createFilterById(inputId: string) {
    return (item: IEvent | ILocation | IUser) => item._id !== inputId;
}
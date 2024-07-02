export interface IEvent {
    organizerName: string;
    _id?: string;
    createdBy: {
        _id: string;
        username?: string;
    };
    chatRoomId?: string;
    imageUri?: string;
    name: string;
    shortDescription: string;
    description?: string;
    startingDate: Date.UTC;
    startingTime: string;
    ageGroup?: string;
    location: ILocation;
    dateCreated?: Date.UTC;
}

export interface IEventImage {
    _id?: string;
    imageUri: string;
}

export type ILocation = {
    _id?: string;
    name: string;
    position: {
        lat: number;
        lng: number;
    }
}

export interface IUser {
    _id?: string;
    username: string;
    email: string;
    role: string;
}

export type EventFormValues = {
    organizerName?: string;
    imageUri?: string ;
    name?: string;
    shortDescription?: string;
    description?: string;
    startingDate?: Date;
    startingTime?: string;
    ageGroup?: string;
    location: ILocation;
} | undefined;

export interface IIngredient {
    _id?: string;
    creatorId?: string;
    imageUri?: string ;
    name: string;
    description?: string;
    dateCreated: Date.UTC;
}

export interface ICocktail {
    _id?: string;
    creatorId?: string;
    imageUri?: string ;
    name: string;
    description?: string;
    dateCreated: Date.UTC;
    ingredients: string[];
    preparationInstructions: string;
}

export interface IBar {
    _id?: string;
    ownerID?: string;
    imageUri?: string ;
    name: string;
    description?: string;
    workingHours?: string;
    dateCreated: Date.UTC;
    cocktails: string[];
}
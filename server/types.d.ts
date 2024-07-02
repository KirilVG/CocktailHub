import type { Request, Response, NextFunction } from "express";
import type { Document } from "mongoose";
import type { IBar, IEvent, IIngredient, IUser } from "../shared/types.js";

export interface IEnvironmentConfig {
    port: number;
    saltRounds: number;
    secret: string;
    connectionString: string;
    accessTokenExpireTime: string
    cookieExpireTime: number
}

export interface IConfig {
    [key: string]: IEnvironmentConfig;
}

export type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;

export type RouteDefinition = {
    method: string;
    path: string;
    middleware?: MiddlewareFunction[];
    handler: (req: Request, res: Response) => void;
}

export interface IUserDocument extends Document, IUser {
    password: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export type Credentials = {
    email: string;
    username?: string;
    password: string;
}

export type DBEvent = mongoose.Document<unknown, {}, IEvent> & 
    IEvent & { _id: mongoose.Types.ObjectId; };

export type DBIngredient = mongoose.Document<unknown, {}, IIngredient> & 
    IIngredient & { _id: mongoose.Types.ObjectId; };

export type DBCocktail = mongoose.Document<unknown, {}, ICocktail> & 
    ICocktail & { _id: mongoose.Types.ObjectId; };

export type DBBar = mongoose.Document<unknown, {}, IBar> & 
    IBar & { _id: mongoose.Types.ObjectId; };

export type LoginServiceResponse = {
    accessToken: string;
}

export type AuthHeader = {
    authToken: string;
    userId: string;
}

export type JWTTokenData = {
    userId: string,
    role: UserRole,
    username: string
}

export type ChatAdminData = {
    userId: string
    authToken: string
}

export type ChatAdminAuthHeaders = {
    headers: {
        [ADMIN_AUTH_TOKEN_HEADER_NAME]: string;
        [ADMIN_ID_HEADER_NAME]: string;
    };
}
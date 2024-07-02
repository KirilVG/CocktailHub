import { UNAUTHORIZED_ERROR } from "../../shared/constants/responseMessages.js";
import { ADMIN_CAN_MANAGE, MODERATOR_CAN_NOT_MANAGE, NORMAL_USER_CAN_NOT_CREATE, NORMAL_USER_CAN_NOT_MANAGE, SELF_UPSERT_RESTRICT } 
    from "../constants/customErrorMessages.js";
import { ALL_ROLES } from "../constants/modelConstants.js";
import { ForbiddenError, UnauthorizedError } from "../errors/customErrors.js";
import { DBBar, DBCocktail, DBEvent, DBIngredient } from "../types.js";
import { getTokenData } from "../utils/jwt.js";
import { Request } from "express";
import eventService from "./eventService.js";
import { UserRole } from "../../shared/constants/userRoles.js";
import cocktailService from "./cocktailService.js";
import { logger } from "../config/logger.js";
import barService from "./barService.js";

const USER_ROLES_RIGHT = {
    CREATE: [UserRole.ADMIN, UserRole.MODERATOR],
    MANAGE_INGREDIENTS: [UserRole.ADMIN, UserRole.MODERATOR],
    MANAGE_COCKTAILS: [UserRole.ADMIN, UserRole.MODERATOR],
    MANAGE_BARS: [UserRole.ADMIN, UserRole.MODERATOR],
    MANAGE: [UserRole.ADMIN],
    ACCESS: ALL_ROLES,
}

export function canPerformCreate(accessToken: string): boolean {
    if (userHasRole(accessToken, USER_ROLES_RIGHT.CREATE)) {
        return true;
    }

    throw new ForbiddenError(NORMAL_USER_CAN_NOT_CREATE);
}

export function isAuthorized(accessToken: string): boolean {
    if (userHasRole(accessToken, USER_ROLES_RIGHT.ACCESS)) {
        return true;
    }

    throw new UnauthorizedError(UNAUTHORIZED_ERROR);
}

export function canManageUsers(accessToken: string, userId: string): boolean {
    if (!userHasRole(accessToken, USER_ROLES_RIGHT.MANAGE)) {
        throw new ForbiddenError(ADMIN_CAN_MANAGE);
    }

    if (userSelfUpsert(accessToken, userId)) {
        throw new ForbiddenError(SELF_UPSERT_RESTRICT);
    }

    return true;
}

export async function canManageEvents(req: Request): Promise<boolean> {
    const accessToken = req.cookies.accessToken;

    if (userHasRole(accessToken, USER_ROLES_RIGHT.MANAGE)) {
        return true;
    }

    if (userHasRole(accessToken, [UserRole.USER])) {
        throw new ForbiddenError(NORMAL_USER_CAN_NOT_MANAGE);
    }

    const event: DBEvent = await eventService.getById(req.params.id);
    const loggedUserId = getTokenData(req.cookies.accessToken).userId;
    const creatorId = event.createdBy._id.toString();

    if (loggedUserId !== creatorId) {
        throw new ForbiddenError(MODERATOR_CAN_NOT_MANAGE);
    }
    
    return true;
}

export async function canManageBars(req: Request): Promise<boolean> {
    const accessToken = req.cookies.accessToken;
    
    if (userHasRole(accessToken, USER_ROLES_RIGHT.MANAGE_BARS)) {
        return true;
    }
    
    const bar: DBBar = await barService.getById(req.params.id);
    const loggedUserId = getTokenData(accessToken).userId;
    const ownerID = bar.ownerID;

    if (loggedUserId != ownerID) {
        throw new ForbiddenError("user can not manage other people's bars");
    }
    
    return true;
}

export async function canManageCocktails(req: Request): Promise<boolean> {
    logger.info("auth1");
    const accessToken = req.cookies.accessToken;
    logger.info("auth2");
    if (userHasRole(accessToken, USER_ROLES_RIGHT.MANAGE_COCKTAILS)) {
        return true;
    }
    logger.info("auth3");
    const cocktail: DBCocktail = await cocktailService.getById(req.params.id);
    logger.info("auth4")
    const loggedUserId = getTokenData(accessToken).userId;
    logger.info("auth5")
    const creatorId = cocktail.creatorId;
    logger.info("auth6")

    if (loggedUserId != creatorId) {
        throw new ForbiddenError("user can not manage other people's cocktails");
    }
    logger.info("auth7")
    
    return true;
}

export async function canManageIngredients(req: Request): Promise<boolean> {
    const accessToken = req.cookies.accessToken;

    if (!userHasRole(accessToken, USER_ROLES_RIGHT.MANAGE_INGREDIENTS)) {
        throw new ForbiddenError(NORMAL_USER_CAN_NOT_MANAGE);
    }

    return true;
}

export async function canDeleteAllEvents(accessToken: string) {
    if (userHasRole(accessToken, USER_ROLES_RIGHT.MANAGE)) {
        return true;
    }

    throw new UnauthorizedError(UNAUTHORIZED_ERROR);
}

function userHasRole(accessToken: string, roles: UserRole[]) {
    const role = getTokenData(accessToken).role;
    
    return roles.indexOf(role) > -1;
}

function userSelfUpsert(accessToken: string, userIdToUpsert: string): boolean {
    const authenticatedUserId = getTokenData(accessToken).userId;

    return userIdToUpsert === authenticatedUserId;
}
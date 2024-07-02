import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authorizationService.js";

export function canPerformCreate(req: Request, res: Response, next: NextFunction): void {
    try {
        canPerformOperation(authService.canPerformCreate(req.cookies.accessToken), next);
    } catch (error) {
        next(error);
    }
}

export function isAuthorized(req: Request, res: Response, next: NextFunction): void {
    try {
        canPerformOperation(authService.isAuthorized(req.cookies.accessToken), next);   
    } catch (error) {
        next(error);
    }
}

export function canManageUsers(req: Request, res: Response, next: NextFunction): void {
    try {
        const accessToken = req.cookies.accessToken;
        const userId = req.params.id
        canPerformOperation(authService.canManageUsers(accessToken, userId), next);
    } catch (error) {
        next(error);
    }
}

export async function canManageEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        canPerformOperation(await authService.canManageEvents(req), next);
    } catch (error) {
        next(error)
    }
}

export async function canManageBars(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        canPerformOperation(await authService.canManageBars(req), next);
    } catch (error) {
        next(error)
    }
}

export async function canManageCocktails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        canPerformOperation(await authService.canManageCocktails(req), next);
    } catch (error) {
        next(error)
    }
}

export async function canManageIngredients(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        canPerformOperation(await authService.canManageIngredients(req), next);
    } catch (error) {
        next(error)
    }
}

export async function canDeleteAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        canPerformOperation(await authService.canDeleteAllEvents(req.cookies.accessToken), next);
    } catch (error) {
        next(error)
    }
}

function canPerformOperation(canPerform: boolean | Promise<boolean>, next: NextFunction): void {
    if (canPerform) {
        return next();
    }
}
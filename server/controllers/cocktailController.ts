import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../shared/constants/responseMessages.js";
import cocktailService from "../services/cocktailService.js";
import { SUCCESS_PAYLOAD } from "../constants/payloads.js";
import { ICocktail } from "../../shared/types.js";

const { OK, CREATED } = HttpStatusCode;

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newCocktail = await cocktailService.create(req.cookies.accessToken, req.body);
        buildResponse(res, newCocktail, CREATED);
    } catch (error) {
        next(error);
    }
}

async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const cocktails = await cocktailService.getAll();
        res.status(OK).json(cocktails).end();
    } catch (error) {
        next(error);
    }
}

async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const cocktail = await cocktailService.getById(req.params.id);
        buildResponse(res, cocktail, OK);
    } catch (error) {
        next(error);
    }
}

async function deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await cocktailService.deleteById(req.params.id);
        buildResponse(res, SUCCESS_PAYLOAD, OK);
    } catch (error) {
        next(error);
    }
}

async function updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const requestBody: ICocktail = req.body;
        const cocktail = await cocktailService.updateById(req.params.id, requestBody);
        buildResponse(res, cocktail, OK);
    } catch (error) {
        next(error)
    }
}

function buildResponse(res: Response, payload: object, status: number): Response {
    return res.status(status).json(payload).end();
}

export default { create, getAll, getById, deleteById, updateById };
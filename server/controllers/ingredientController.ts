import { HttpStatusCode } from "../../shared/constants/responseMessages.js";
import type { NextFunction, Request, Response } from "express";
import ingredientService from "../services/ingredientService";
import { SUCCESS_PAYLOAD } from "../constants/payloads.js";
import { IIngredient } from "../../shared/types.js";

const { OK, CREATED } = HttpStatusCode;

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newIngredient = await ingredientService.create(req.cookies.accessToken, req.body);
        buildResponse(res, newIngredient, CREATED);
    } catch (error) {
        next(error);
    }
}

async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const ingredients = await ingredientService.getAll();
        res.status(OK).json(ingredients).end();
        res.status(OK)
    } catch (error) {
        next(error);
    }
}

async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const event = await ingredientService.getById(req.params.id);
        buildResponse(res, event, OK);
    } catch (error) {
        next(error);
    }
}

async function deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await ingredientService.deleteById(req.params.id);
        buildResponse(res, SUCCESS_PAYLOAD, OK);
    } catch (error) {
        next(error);
    }
}

async function updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const requestBody: IIngredient = req.body;
        const ingredient = await ingredientService.updateById(req.params.id, requestBody);
        buildResponse(res, ingredient, OK);
    } catch (error) {
        next(error)
    }
}

function buildResponse(res: Response, payload: object, status: number): Response {
    return res.status(status).json(payload).end();
}

export default { create, getAll, getById, deleteById, updateById };
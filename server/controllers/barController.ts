import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../shared/constants/responseMessages";
import barService from "../services/barService";
import { SUCCESS_PAYLOAD } from "../constants/payloads";
import { IBar } from "../../shared/types";

const { OK, CREATED } = HttpStatusCode;

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newCocktail = await barService.create(req.cookies.accessToken, req.body);
        buildResponse(res, newCocktail, CREATED);
    } catch (error) {
        next(error);
    }
}

async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const bars = await barService.getAll();
        res.status(OK).json(bars).end();
    } catch (error) {
        next(error);
    }
}

async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const bar = await barService.getById(req.params.id);
        buildResponse(res, bar, OK);
    } catch (error) {
        next(error);
    }
}

async function deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await barService.deleteById(req.params.id);
        buildResponse(res, SUCCESS_PAYLOAD, OK);
    } catch (error) {
        next(error);
    }
}

async function updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const requestBody: IBar = req.body;
        const bar = await barService.updateById(req.params.id, requestBody);
        buildResponse(res, bar, OK);
    } catch (error) {
        next(error)
    }
}

function buildResponse(res: Response, payload: object, status: number): Response {
    return res.status(status).json(payload).end();
}

export default { create, getAll, getById, deleteById, updateById };
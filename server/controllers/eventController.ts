import type { NextFunction, Request, Response } from "express";
import eventService from "../services/eventService.js";
import { HttpStatusCode } from "../../shared/constants/responseMessages.js";
import type { IEvent } from "../../shared/types.js";
import { SUCCESS_PAYLOAD } from "../constants/payloads.js";

const { OK, CREATED } = HttpStatusCode;

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newEvent = await eventService.create(req.cookies.accessToken, req.body);
        buildResponse(res, newEvent, CREATED);
    } catch (error) {
        next(error);
    }
}

async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const events = await eventService.getAll();
        res.status(OK).json(events).end();
    } catch (error) {
        next(error);
    }
}

async function getAllEventImages(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const eventImages = await eventService.getAllEventImages();
        res.status(OK).json(eventImages).end();
    } catch (error) {
        next(error);
    }
}

async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const event = await eventService.getById(req.params.id);
        buildResponse(res, event, OK);
    } catch (error) {
        next(error);
    }
}

async function getEventImageById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const eventImage = await eventService.getEventImageById(req.params.id);
        res.status(OK).json(eventImage).end();
    } catch (error) {
        next(error);
    }
}

async function deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await eventService.deleteById(req.params.id);
        buildResponse(res, SUCCESS_PAYLOAD, OK);
    } catch (error) {
        next(error);
    }
}

async function updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const requestBody: IEvent = req.body;
        const event = await eventService.updateById(req.params.id, requestBody);
        buildResponse(res, event, OK);
    } catch (error) {
        next(error)
    }
}

async function deleteAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await eventService.deleteAllEvents();
        buildResponse(res, SUCCESS_PAYLOAD, OK);
    } catch (error) {
        next(error);
    }
}

function buildResponse(res: Response, payload: object, status: number): Response {
    return res.status(status).json(payload).end();
}

export default { create, getAll, getAllEventImages, getById, getEventImageById, deleteById, updateById, deleteAll };
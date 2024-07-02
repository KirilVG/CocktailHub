import { Router, type Request, type Response } from 'express';

export const apiRouter = Router();

apiRouter.get('/', (_req: Request, res: Response): void => {
    res.send("You have reached the API!");
});
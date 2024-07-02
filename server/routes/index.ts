
import express from 'express';
import { apiRouter } from './api-routes.js';
import userRouter from './userRoutes.js';
import eventRouter from './eventRoutes.js';
import ingredintRouter from './ingredintRoutes.js';
import cocktailRouter from './cocktailRoutes.js';
import barRouter from './barRoutes.js';

export const routes = express.Router();

routes.use('/api', apiRouter);
routes.use('/api', userRouter);
routes.use('/api', eventRouter);
routes.use('/api', ingredintRouter);
routes.use('/api', cocktailRouter);
routes.use('/api', barRouter);
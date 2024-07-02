import { Router } from 'express';
import eventController from '../controllers/eventController.js';
import { isAuthorized, canPerformCreate, canManageEvents, canDeleteAllEvents } from '../middlewares/authorization.js';

const eventRouter = Router();

eventRouter.post('/events', canPerformCreate, eventController.create);
eventRouter.get('/events', isAuthorized, eventController.getAll);
eventRouter.get('/events/images', isAuthorized, eventController.getAllEventImages);
eventRouter.get('/events/:id', isAuthorized, eventController.getById);
eventRouter.get('/events/:id/image', isAuthorized, eventController.getEventImageById);
eventRouter.patch('/events/:id', canManageEvents, eventController.updateById);
eventRouter.delete('/events/deleteAll', canDeleteAllEvents, eventController.deleteAll);
eventRouter.delete('/events/:id', canManageEvents, eventController.deleteById);

export default eventRouter;
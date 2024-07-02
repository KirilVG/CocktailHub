import { Router } from 'express';
import { canManageBars, isAuthorized } from '../middlewares/authorization.js';
import barController from '../controllers/barController.js';

const barRouter = Router();

barRouter.post('/bars', isAuthorized, barController.create);
barRouter.get('/bars', isAuthorized, barController.getAll);
barRouter.get('/bars/:id', isAuthorized, barController.getById);
barRouter.patch('/bars/:id', canManageBars, barController.updateById);
barRouter.delete('/bars/:id', canManageBars, barController.deleteById);

export default barRouter;
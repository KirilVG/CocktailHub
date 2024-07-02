import { Router } from 'express';
import { canManageCocktails, isAuthorized } from '../middlewares/authorization.js';
import cocktailController from '../controllers/cocktailController.js';

const cocktailRouter = Router();

cocktailRouter.post('/cocktails', isAuthorized, cocktailController.create);
cocktailRouter.get('/cocktails', isAuthorized, cocktailController.getAll);
cocktailRouter.get('/cocktails/:id', isAuthorized, cocktailController.getById);
cocktailRouter.patch('/cocktails/:id', canManageCocktails, cocktailController.updateById);
cocktailRouter.delete('/cocktails/:id', canManageCocktails, cocktailController.deleteById);

export default cocktailRouter;
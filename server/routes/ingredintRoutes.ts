import { Router } from 'express';
import { isAuthorized, canPerformCreate, canManageIngredients, } from '../middlewares/authorization.js';
import ingredientController from '../controllers/ingredientController.js';

const ingredintRouter = Router();

ingredintRouter.post('/ingredients', canPerformCreate, ingredientController.create);
ingredintRouter.get('/ingredients', isAuthorized, ingredientController.getAll);
ingredintRouter.get('/ingredients/:id', isAuthorized, ingredientController.getById);
ingredintRouter.patch('/ingredients/:id', canManageIngredients, ingredientController.updateById);
ingredintRouter.delete('/ingredients/:id', canManageIngredients, ingredientController.deleteById);

export default ingredintRouter;
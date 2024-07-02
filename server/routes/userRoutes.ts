import { Router } from 'express';
import userController from '../controllers/userController.js';
import { canManageUsers, isAuthorized } from "../middlewares/authorization.js";

const userRouter = Router();

userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.post('/logout', userController.logout);
userRouter.get('/users', isAuthorized, userController.getAllUsers);
userRouter.get('/users/:id', isAuthorized, userController.getUserById);
userRouter.patch('/users/changerole/:id', canManageUsers, userController.updateUserRole);
userRouter.delete('/users/:id', canManageUsers, userController.deleteUser);

export default userRouter;
import type { NextFunction, Request, Response } from "express";
import userService from "../services/userService.js";
import {
	REGISTRATION_SUCCESSFUL,
	LOGIN_SUCCESSFUL,
	HttpStatusCode,
	BAD_REQUEST_ERROR,
	CHANGE_ROLE_SUCCESSFUL,
	GET_ALL_USERS_SUCCESSFUL,
	DELETE_USER_SUCCESSFUL,
	LOGOUT_SUCCCESSFUL,
	GET_USER_SCCESSFUL,
} from "../../shared/constants/responseMessages.js";
import { logger } from "../config/logger.js";
import type { Credentials } from "../types.js";
import { clearAuthCookie, setResponseCookiesForLogin } from "../utils/cookie.js";
import { ALL_ROLES } from "../constants/modelConstants.js";
import { getDecodedToken } from "../utils/jwt.js";

async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const { email, username, password }: Credentials = req.body;
		await userService.register({ email, username, password });
		logger.info(REGISTRATION_SUCCESSFUL);
		res.status(HttpStatusCode.CREATED).json({ message: REGISTRATION_SUCCESSFUL });
	} catch (error) {
		next(error);
	}
}

async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const { email, username, password }: Credentials = req.body;
		const loginResponse = await userService.login({ email, username, password });

		setResponseCookiesForLogin(res, loginResponse);

		logger.info(LOGIN_SUCCESSFUL);
		res.status(HttpStatusCode.OK).json({ message: LOGIN_SUCCESSFUL, token: loginResponse.accessToken });
	} catch (error) {
		next(error);
	}
}

async function logout(_req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		clearAuthCookie(res);
		res.status(HttpStatusCode.OK).json({ message: LOGOUT_SUCCCESSFUL });
	} catch (error) {
		next(error);
	}
}

async function updateUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const userId = req.params.id;

		const { role } = req.body;

		if (!role || !ALL_ROLES.includes(role)) {
			res.status(HttpStatusCode.BAD_REQUEST).json({ message: BAD_REQUEST_ERROR });
			return;
		}

		const updatedUser = await userService.updateUserRole(userId, role);

		logger.info(`${CHANGE_ROLE_SUCCESSFUL} for userId: ${updatedUser.id}`);
		res.status(HttpStatusCode.OK).json({ message: CHANGE_ROLE_SUCCESSFUL, updatedUser });
	} catch (error) {
		next(error);
	}
}

async function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const userId = getDecodedToken(req.cookies.accessToken).userId;
		const users = await userService.getAllUsers(userId);

		logger.info(`${GET_ALL_USERS_SUCCESSFUL}`);
		res.status(HttpStatusCode.OK).json(users);
	} catch (error) {
		next(error);
	}
}

async function getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const userId = req.params.id;
		const user = await userService.getUserById(userId);

		logger.info(`${GET_USER_SCCESSFUL}`);
		res.status(HttpStatusCode.OK).json(user);
	} catch (error) {
		next(error);
	}
}

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const userId = req.params.id;
		await userService.deleteUser(userId);

		logger.info(`${DELETE_USER_SUCCESSFUL} for userId: ${userId}`);
		res.status(HttpStatusCode.OK).json({ message: DELETE_USER_SUCCESSFUL });
	} catch (error) {
		next(error);
	}
}

export default { register, login, logout, updateUserRole, getAllUsers, deleteUser, getUserById };
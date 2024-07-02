import User from "../models/user.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import type { Credentials, IEnvironmentConfig, IUserDocument, LoginServiceResponse } from "../types.js";
import config from "../config/config.js";
import { UnauthorizedError, DuplicateEntryError, ModelValidationError, NotFoundError, BadRequestError, InternalServerError } from "../errors/customErrors.js";
import { logger } from "../config/logger.js";
import { INVALID_CREDENTIALS, INVALID_DATA, INVALID_ROLE, TRANSACTION_ERROR_PREFIX, USER_EXISTS, USER_NOT_FOUND, INVALID_ID } from "../constants/internalErrorMessages.js";
import { userFieldSelector } from "../constants/queryConstants.js";
import { UserRole } from "../../shared/constants/userRoles.js";

const currentConfig: IEnvironmentConfig = config[process.env.NODE_ENV || "development"];

async function register({ email, username, password }: Credentials) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            throw new DuplicateEntryError(USER_EXISTS);
        }

        const newUser = new User({ email, username, password });

        await newUser.save({ session });

        await session.commitTransaction()
    } catch (error) {
        logger.error(TRANSACTION_ERROR_PREFIX + error);

        await session.abortTransaction();

        throw error;
    } finally {
        await session.endSession();
    }
}

async function login({ email, username, password }: Credentials): Promise<LoginServiceResponse> {
    if ((!email && !username) || !password) {
        throw new ModelValidationError(INVALID_DATA);
    }
    
    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (!user) {
        throw new UnauthorizedError(INVALID_CREDENTIALS);
    }

    const match = await user.comparePassword(password);

    if (!match) {
        throw new UnauthorizedError(INVALID_CREDENTIALS);
    }

    const accessToken = jwt.sign({ userId: user._id, role: user.role, username: user.username }, currentConfig.secret, { expiresIn: currentConfig.accessTokenExpireTime });

    return {
        accessToken
    };
}

async function updateUserRole(userId: string, role: string): Promise<IUserDocument> {
    if (!userId || !mongoose.isValidObjectId(userId)) {
        throw new BadRequestError(INVALID_ID);
    }

    if (!Object.values(UserRole).includes(role as UserRole) || role === UserRole.ADMIN) {
        throw new BadRequestError(INVALID_ROLE);
    }

    const userDoc = await User.findByIdAndUpdate(userId, { role }, { new: true, select: userFieldSelector });

    if (!userDoc) {
        throw new NotFoundError(USER_NOT_FOUND);
    }

    return userDoc;
}

async function getAllUsers(userId: string) {
    if (!userId) {
        throw new BadRequestError(INVALID_ID);
    }

    let users: IUserDocument[] = [];

    users = await User.find({}).sort({username: 1}).select(userFieldSelector);

    const filteredUsers = users.filter(user => user._id?.toString() !== userId);
    
    return filteredUsers;
}

async function getUserById(userId: string) {
    if (!userId || !mongoose.isValidObjectId(userId)) {
        throw new BadRequestError(INVALID_ID);
    }

    const user = await User.findById(userId).select(userFieldSelector);

    if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
    }

    return user;
}

async function deleteUser(userId: string) {
    if (!userId || !mongoose.isValidObjectId(userId)) {
        throw new BadRequestError(INVALID_ID);
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const query = await User.findByIdAndDelete(userId, { session });

        if (!query) {
            throw new NotFoundError(USER_NOT_FOUND);
        }

        await session.commitTransaction()
    } catch (error) {
        logger.error(TRANSACTION_ERROR_PREFIX + error);

        await session.abortTransaction();

        throw error;
    } finally {
        await session.endSession();
    }
}

export default { register, login, updateUserRole, getAllUsers, deleteUser, getUserById };

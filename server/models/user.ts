import mongoose, { Schema } from "mongoose";
import type { IEnvironmentConfig, IUserDocument } from "../types.js";
import { emailRegex, passwordRegex, usernameRegex } from "../../shared/utils/regexPatterns.js";
import { EMAIL_VALIDATION_ERROR, PASSWORD_MISMATCH_ERROR, PASSWORD_VALIDATION_ERROR, ROLE_NOT_IN_VALID_VALUES, USERNAME_MIN_LENGTH_ERROR, USERNAME_VALIDATION_ERROR } from "../constants/validationErrorMessages.js";
import config from "../config/config.js";
import { hash, compare } from "bcryptjs";
import { UserRole } from "../../shared/constants/userRoles.js";
import { EVENT_MODEL_NAME, USER_MODEL_NAME } from "../constants/modelConstants.js";

const currentConfig: IEnvironmentConfig = config[process.env.NODE_ENV || "development"];

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v: string) => emailRegex.test(v),
            message: EMAIL_VALIDATION_ERROR
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, USERNAME_MIN_LENGTH_ERROR],
        validate: {
            validator: (v: string) => usernameRegex.test(v),
            message: USERNAME_VALIDATION_ERROR
        },
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: [UserRole.USER, UserRole.MODERATOR, UserRole.ADMIN],
            message: ROLE_NOT_IN_VALID_VALUES
        },
        default: UserRole.USER
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (v: string) => passwordRegex.test(v),
            message: PASSWORD_VALIDATION_ERROR
        }
    },
    events: [{ type: Schema.Types.ObjectId, ref: EVENT_MODEL_NAME }]
}, { timestamps: { createdAt: 'created_at' } });

UserSchema.pre<IUserDocument>('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await hash(this.password, currentConfig.saltRounds);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error as Error);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    try {
        return await compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(PASSWORD_MISMATCH_ERROR);
    }
};

export default mongoose.model<IUserDocument>(USER_MODEL_NAME, UserSchema);
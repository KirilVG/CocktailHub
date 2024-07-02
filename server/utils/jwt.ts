import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError,  } from "../../server/errors/customErrors.js";
import { MISSING_TOKEN, TOKEN_DECODING_ERROR } from '../../server/constants/internalErrorMessages.js';
import { JWTTokenData } from '../types.js';

export function getTokenData(accessToken: string): JWTTokenData {
    const decoded = getDecodedToken(accessToken);

    if (!decoded || typeof decoded !== 'object') {
        throw new UnauthorizedError(TOKEN_DECODING_ERROR);
    }

    return {
        userId: decoded.userId,
        username: decoded.username,
        role: decoded.role
    };
}

export function getDecodedToken(accessToken: string): JwtPayload {
    if (!accessToken) {
        throw new UnauthorizedError(MISSING_TOKEN);
    }

    const decoded = jwt.decode(accessToken) as JwtPayload;
    return decoded;
}
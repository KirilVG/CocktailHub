import type { IEnvironmentConfig, LoginServiceResponse } from "../types.js";
import type { Response } from "express";
import config from "../../server/config/config.js";

const currentConfig: IEnvironmentConfig = config[process.env.NODE_ENV || "development"];

const ACCESS_TOKEN_NAME = "accessToken";

export function setResponseCookiesForLogin(res: Response, loginServiceResponse: LoginServiceResponse) {
    setResponseTokenCookie(res, ACCESS_TOKEN_NAME, loginServiceResponse.accessToken);
}

function setResponseTokenCookie(res: Response, cookieName: string, token: string) {
    res.cookie(cookieName, token, {
        maxAge: currentConfig.cookieExpireTime, // Expiry time (30 min in milliseconds)
        sameSite: "strict"
    });
}

export function clearAuthCookie(res: Response) {
    res.clearCookie(ACCESS_TOKEN_NAME);
}
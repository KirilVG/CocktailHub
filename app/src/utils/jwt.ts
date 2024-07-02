import { jwtDecode } from "jwt-decode";
import { getCookieByName } from "@/utils/cookie";

declare module "jwt-decode" {
    export interface JwtPayload {
        userId: string;
        username: string;
        role: string;
    }
}

export function checkJWTToken() {
    const cookies = document.cookie;
    return cookies.includes('accessToken');
}

export function decodeAccessToken() {
    const jwtToken = getCookieByName('accessToken');

    if (!jwtToken) {
        return null;
    }

    const decodedToken = jwtDecode(jwtToken);
    return decodedToken;
}
import { UserRole } from "../../../shared/constants/userRoles";
import { decodeAccessToken } from "./jwt";

export function isAuthorized(roles: string[]) {
    const decodedToken = decodeAccessToken();

    const currentUserRole = decodedToken?.role;

    return currentUserRole ? roles.includes(currentUserRole) : false;
}

export function hasAdminRights() {
    return isAuthorized( [UserRole.ADMIN] );
}
import { useEffect, useState } from "react";
import { UserRole } from "../../../shared/constants/userRoles"
import { decodeAccessToken } from "@/utils/jwt";

const useIsAuthorized = (roles: string[] | string) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const decodedToken = decodeAccessToken();
            const currentUserRole = decodedToken?.role;
            const isRoleValid = currentUserRole === roles || roles.includes(currentUserRole as string);
            setIsAuthorized(isRoleValid);
        };

        fetchData();
    }, [roles]);

    return isAuthorized;
};

const useIsAuthorizedToManage = () => {
    return useIsAuthorized([UserRole.ADMIN, UserRole.MODERATOR]);
};

const useIsAdmin = () => {
    return useIsAuthorized(UserRole.ADMIN);
};

const useIsModerator = () => {
    return useIsAuthorized(UserRole.MODERATOR);
};

const useIsAuthorizedToEditCocktail = (id?: string) => {
    const decodedToken = decodeAccessToken();
    const isAdmin = useIsAdmin();
    const isModerator = useIsModerator();

    return isAdmin || isModerator || decodedToken?.userId === id;
};

const useIsAuthorizedToEditBar = (id?: string) => {
    const decodedToken = decodeAccessToken();
    const isAdmin = useIsAdmin();
    const isModerator = useIsModerator();

    return isAdmin || isModerator || decodedToken?.userId === id;
};

export { useIsAuthorizedToManage, useIsAuthorizedToEditCocktail, useIsAuthorizedToEditBar, useIsAdmin, useIsModerator };
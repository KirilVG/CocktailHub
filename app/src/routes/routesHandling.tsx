import { COCKTAILS_PAGE } from "@/constants/routesConsts";
import { checkJWTToken } from "@/utils/jwt";
import { hasAdminRights } from "@/utils/roleUtils";
import { Navigate } from "react-router-dom";

export const withAuthRoute = (WrappedComponent: React.ComponentType<unknown>) => {
    return () => {
        const isAuthenticated = checkJWTToken();
        return isAuthenticated ? <Navigate to={COCKTAILS_PAGE} /> : <WrappedComponent />;
    };
};

export const withPrivateRoute = (WrappedComponent: React.ComponentType<unknown>) => {
    return () => {
        const isAuthenticated = checkJWTToken();
        return isAuthenticated ? <WrappedComponent /> : <Navigate to="/" />;
    };
};

export const withAdminRights = (WrappedComponent: React.ComponentType<unknown>) => {
    return () => {
        const isAdmin = hasAdminRights();
        return isAdmin ? <WrappedComponent /> : <Navigate to="/events" />;
    };
};
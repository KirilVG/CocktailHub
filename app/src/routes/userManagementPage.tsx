import UserManagement from "@/components/userManagement/userManagement";
import withNavigation from "@/components/withNavigation";
import { withAdminRights, withPrivateRoute } from "./routesHandling";

const UserManagementWithNav = withNavigation(UserManagement);

const UserManagementPage = () => {
    return (
        <UserManagementWithNav/>
    );
}

const PrivateUserManagementPage = withPrivateRoute(withAdminRights(UserManagementPage));

export default PrivateUserManagementPage;
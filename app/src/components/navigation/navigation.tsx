import { ShoppingBasket, User, LogOut, Martini, Beer } from "lucide-react";
import {
  INGREDIENTS_ROUTE,
  COCKTAILS_PAGE,
  MANAGEMENT_ROUTE,
  BARS_ROUTE,
} from "@/constants/routesConsts";
import { Button } from "../ui/button";
import getTranslation from "@/utils/transtationUtil";
import NavigationLink from "./navigationLink";
import { logout } from "@/api/userCalls";
import { toast } from "../ui/use-toast";
import { AppError, handleError } from "@/lib/errorHandler";
import { useNavigate } from "react-router-dom";
import { useIsAdmin } from "@/hooks/useIsAuthorized";

const Navigation = () => {
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const responseLogout = await logout();

    if (responseLogout instanceof AppError) {
      const errorMessage = handleError(responseLogout);
      toast({ description: errorMessage });
    } else {
      navigate("/");
      toast({ description: getTranslation("userManagement.logoutSuccess") });
    }
  };

  return (
    <>
      <nav
        id="navigation"
        className="flex flex-row md:flex-col justify-evenly bg-[#202738] p-5 w-full md:w-auto h-auto md:h-screen"
      >
        <NavigationLink
          dataTestId="navigation-cocktailIcon"
          to={COCKTAILS_PAGE}
          iconComponent={Martini}
        />
        <NavigationLink
          dataTestId="navigation-ingredients"
          to={INGREDIENTS_ROUTE}
          iconComponent={ShoppingBasket}
        />
        <NavigationLink
          dataTestId="navigation-BarIcon"
          to={BARS_ROUTE}
          iconComponent={Beer}
        />
        {isAdmin && <NavigationLink
          dataTestId="navigation-userManagement"
          to={MANAGEMENT_ROUTE}
          iconComponent={User}
        />}
        <Button onClick={handleLogout} className="bg-[#202738] hover:bg-[#202738] p-0">
          <LogOut className="text-white hover:text-[#E27532] size-10" />
        </Button>
      </nav>
    </>
  );
};

export default Navigation;

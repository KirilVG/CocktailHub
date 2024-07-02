import { useParams } from "react-router-dom";
import { withPrivateRoute } from "@/routes/routesHandling";
import withNavigation from "@/components/withNavigation";
import { CoctailInfo } from "@/components/cocktailComponents/cocktailInfo";

const CocktailDetails = withNavigation(CoctailInfo);

const CocktailDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <CocktailDetails id={id} />
    );
}
const PrivateCocktailPage = withPrivateRoute(CocktailDetailsPage);

export default PrivateCocktailPage;
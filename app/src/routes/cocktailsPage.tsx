import withNavigation from "@/components/withNavigation";
import { withPrivateRoute } from "./routesHandling";
import CocktailsList from "@/components/cocktailsList";

const CocktailsPage = () => {
	const CocktailsListPage = withPrivateRoute(withNavigation((CocktailsList)));

	return <CocktailsListPage />;
};

export default CocktailsPage;
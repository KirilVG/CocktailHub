import withNavigation from "@/components/withNavigation";
import { withPrivateRoute } from "./routesHandling";
import { IngredientsList } from "@/components/ingedientsList";

const IngredientsPage = () => {
	const IngredientsListPage = withPrivateRoute(withNavigation((IngredientsList)));

	return <IngredientsListPage />;
};

export default IngredientsPage;
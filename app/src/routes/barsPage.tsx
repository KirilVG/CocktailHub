import withNavigation from "@/components/withNavigation";
import { withPrivateRoute } from "./routesHandling";
import { BarsList } from "@/components/barsList";

const BarsPage = () => {
	const BarsListPage = withPrivateRoute(withNavigation((BarsList)));

	return <BarsListPage />;
};

export default BarsPage;
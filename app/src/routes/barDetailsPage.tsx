import { BarInfo } from "@/components/barComponents/barInfo";
import withNavigation from "@/components/withNavigation";
import { useParams } from "react-router-dom";
import { withPrivateRoute } from "./routesHandling";

const BarDetails = withNavigation(BarInfo);

const BarDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <BarDetails id={id} />
    );
}
const PrivateBarPage = withPrivateRoute(BarDetailsPage);

export default PrivateBarPage;
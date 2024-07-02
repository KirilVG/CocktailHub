import Register from '../components/register.tsx';
import HeroPage from './heroPage.tsx';
import Login from '../components/login.tsx';
import { INGREDIENTS_ROUTE, COCKTAILS_PAGE, MANAGEMENT_ROUTE, BARS_ROUTE } from '@/constants/routesConsts.tsx';
import UserManagementPage from './userManagementPage.tsx';
import ErrorPage from './errorPage.tsx';
import CocktailsPage from './cocktailsPage.tsx';
import CocktailDetailsPage from './cocktailDetailsPage.tsx';
import IngredientsPage from './ingredientsPage.tsx';
import BarsPage from './barsPage.tsx';
import BarDetailsPage from './barDetailsPage.tsx';

const routesConfig = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HeroPage />,
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: COCKTAILS_PAGE,
        element: <CocktailsPage />,
      },
      {
        path: `${COCKTAILS_PAGE}/:id`,
        element: <CocktailDetailsPage />,
      },
      {
        path: BARS_ROUTE,
        element: <BarsPage />,
      },
      {
        path: `${BARS_ROUTE}/:id`,
        element: <BarDetailsPage />,
      },
      {
        path: INGREDIENTS_ROUTE,
        element: <IngredientsPage/>,
      },
      {
        path: MANAGEMENT_ROUTE,
        element: <UserManagementPage />,
      },
    ]
  },
];

export default routesConfig;

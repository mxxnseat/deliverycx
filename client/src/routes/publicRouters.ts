import ChooseAdress from "../pages/welcome";
import NotFound from "../pages/notFound";
import SelectAdress from "../pages/welcome/SelectAdress";
import { IRoute, ROUTES } from "./types";


const routes: IRoute[] = [
    {
        exact: true,
        path: ROUTES.WELCOME,
        component: ChooseAdress
    },
    {
        exact: true,
        path: ROUTES.ADDRESS,
        component: SelectAdress
    }
]

export default routes;
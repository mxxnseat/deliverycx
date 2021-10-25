import {ComponentType, FC} from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

interface IProps extends RouteProps{
    isAuth: boolean;
}

const ProtectedRouter: FC<IProps> = ({ isAuth, ...rest})=>{
    const location = useLocation();
    
    return (
        isAuth ? <Route {...rest} /> : <Redirect to={{pathname: "/", state: {from: location.pathname}}} />
    );
}

export default ProtectedRouter;
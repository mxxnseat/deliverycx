import { FC, memo, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory, Router } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import ProtectedRouter from "./components/ProtectedRouter";
import notFound from './pages/notFound';
import protectedRoutes from "./routes/protectedRouters";
import publicRoutes from "./routes/publicRouters";
import { RootState } from './store';

import { loadData } from './store/actions/profile';

interface ILocationState {
  from: string;
}

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<ILocationState>();
  const history = useHistory();
  const isAuth = useSelector((state: RootState) => state.profile.isAuth);
  const { from } = location.state || { from: "/" };

  useEffect(() => {
    dispatch(loadData());
  }, []);

  useEffect(() => {
    if (isAuth) {
      from === "/" ? history.replace("/shop") : history.replace(from);
    }
  }, [isAuth]);

  return (
    <Switch>
      {protectedRoutes.map((route, index) => <ProtectedRouter key={index} {...route} isAuth={isAuth} />)}
      {publicRoutes.map((route, index) => <Route key={index} {...route} />)}
      <Route path="*" component={notFound} />
    </Switch>
  )
}

export default App;

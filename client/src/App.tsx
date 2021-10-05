import { FC, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory, Router } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import ProtectedRouter from "./components/ProtectedRouter";
import protectedRoutes from "./routes/protectedRouters";
import publicRoutes from "./routes/publicRouters";
import { RootState } from './store';

import { loadData } from './store/actions/profile';

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isAuth = useSelector((state: RootState) => state.profile.isAuth);


  const transitions = useTransition(location, {
    key: location.pathname,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  useEffect(() => {
    dispatch(loadData());
  }, []);

  return (
    <Switch>
      { protectedRoutes.map((route, index)=><ProtectedRouter key={index} {...route} isAuth={isAuth} />)}
      { publicRoutes.map((route, index) => <Route key={index} {...route} />)}
    </Switch>
  )
}

export default App;

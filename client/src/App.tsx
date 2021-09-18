import { FC, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import ChooseAdress from './pages/welcome';

import routes from "./routes";
import { RootState } from './store';

import { loadData } from './store/actions/profile';

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
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

  if (!isAuth) {
    return <ChooseAdress />
  }

  return transitions((style, item, t, key) => (
    <animated.div key={key} style={{ ...style, }}>
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Switch location={item}>
          {routes.map((route, index) => <Route key={index} {...route} />)}
        </Switch>
      </div>
    </animated.div>
  ));
}

export default App;

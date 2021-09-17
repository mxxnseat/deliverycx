import { FC, } from 'react';
import { Switch, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import routes from "./routes";

const App: FC = () => {
  const location = useLocation();
  const transitions = useTransition(location, {
    key: location.pathname,
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0}
  });

 

  return transitions((style, item, t, key) => (
    <animated.div key={key} style={{...style, }}>
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Switch location={item}>
          { routes.map((route, index)=><Route key={index} {...route} />) }
        </Switch>
      </div>
    </animated.div>
  ));
}

export default App;

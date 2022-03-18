import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = (props) => {
  return (
    <Router>
      {props.isLoggedIn && <Navigation />}
      <Switch>
        {props.isLoggedIn ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
          </>
        ) : (
          <>
            <Route exact path="/" component={Auth} />
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;

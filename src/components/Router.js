import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = (props) => {
  return (
    <Router>
      {props.isLoggedIn && <Navigation userObj={props.userObj} />}
      <Switch>
        {props.isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={props.userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile
                userObj={props.userObj}
                refreshUser={props.refreshUser}
              />
            </Route>
          </div>
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

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Profile from "./views/profile/Profile";
import Entry from "./views/entry/Entry";
import NotFound from "./views/notFound/NotFound";
import Support from "./views/support/Support";

import "./App.css"

import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  return (
    <div className="App">
        <Router history={history}>
            <Switch>
              <Route exact path={["/", "/home"]} component={Entry}/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/support" component={Support} />
              <Route exact path="/**" component={NotFound} />
            </Switch>
        </Router>
    </div>
  );
};

export default App;

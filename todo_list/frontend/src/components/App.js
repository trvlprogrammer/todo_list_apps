import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header";
import Dashboard from "./todo/Dashboard";
import { Provider } from "react-redux";
import store from "../store";
import Alerts from "./layout/Alerts";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Login from "./accounts/Login";
import PrivateRoute from "./common/PrivateRoute";
import Register from "./accounts/Register";
import Profile from "./accounts/Profile";
import TodoHistory from "../components/todo/TodoHistory";
import ProfileForm from "./accounts/ProfileForm";
import { loadUser } from "../actions/auth";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const alertOptions = {
  position: "top center",
  timeout: 3000,
  offset: "30px",
  transition: transitions.SCALE
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/historys"
                    component={TodoHistory}
                  />
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <PrivateRoute
                    exact
                    path="/profile/edit"
                    component={ProfileForm}
                  />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

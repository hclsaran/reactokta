import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Staff from "./components/pages/Staff";
import Login from "./components/auth/Login";

import "./App.css";

function onAuthRequired({ history }) {
  history.push("/login");
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer="https://dev-95881651.okta.com/oauth2/default"
          client_id="0oa7rx9ssuq0a7w565d7"
          // redirect_uri={window.location.origin + "/implicit/callback"}
          redirect_uri="http://localhost:3000/implicit/callback"
          onAuthRequired={onAuthRequired}
        >
          <div className="App">
            <Navbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <SecureRoute path="/staff" exact={true} component={Staff} />
              <Route
                path="/login"
                render={() => <Login baseUrl="https://dev-95881651.okta.com" />}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;

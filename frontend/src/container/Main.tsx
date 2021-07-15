import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import Landing from "./Landing";

interface MainState {
  landing: boolean;
  login: boolean;
  signup: boolean;
}

class Main extends React.Component<{}, MainState> {
  constructor(props: any) {
    super(props);
    this.state = {
      landing: true,
      login: false,
      signup: false,
    };
  }

  loginHandler = () => {};

  signUpHandler = () => {};

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/login">
          <Auth type="login" />
        </Route>
        <Route path="/signup">
          <Auth type="signup" />
        </Route>
      </Switch>
    );
  }
}

export default Main;

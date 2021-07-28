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
        <Route path="/password-setup">
          <Auth type="password" />
        </Route>
        <Route exact path="/signup/error">
          <div>there's an error happened!</div>
        </Route>
        <Route path="/main">
          <div>main</div>
        </Route>
      </Switch>
    );
  }
}

export default Main;

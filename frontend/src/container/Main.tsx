import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import Board from "./Board";
import Landing from "./Landing";
import { useAuth, PrivateRoute } from "../hooks/use-auth";

function Main() {
  const auth = useAuth();

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
      <PrivateRoute path="/main">
        <Board />
      </PrivateRoute>
      <Route path="/logout">
        {auth.loggedIn ? auth.logout : <Redirect to="/" />}
      </Route>
    </Switch>
  );
}

export default Main;

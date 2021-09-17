import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import Workspace from "./Workspace";
import Landing from "./Landing";
import PageNotFound from "../components/PageNotFound";
import { useAuth } from "../hooks/use-auth";
import Board from "./Board";

function Main() {
  const auth = useAuth();

  return (
    <Switch>
      <Route exact path="/">
        {auth.loggedIn ? <Redirect to="/main" /> : <Landing />}
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
      <Route path="/main">
        {sessionStorage.getItem("user") ? <Workspace /> : <Redirect to="/login" />}
      </Route>
      <Route path="/logout">{() => auth.basicLogout()}</Route>
      <Route path="/forgot">
        <Auth type="forgot" />
      </Route>
      <Route path="/reset-password">
        <Auth type="password" />
      </Route>
      <Route path="/board/:boardId">
        <Board />
      </Route>
      <Route path="/page-not-found">
        <PageNotFound />
      </Route>
      <Redirect to="/page-not-found" />
    </Switch>
  );
}

export default Main;

import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import Board from "./Board";
import Landing from "./Landing";
import PageNotFound from "../components/PageNotFound";
import { useAuth } from "../hooks/use-auth";

function Main(props: any) {
  const auth = useAuth();
  console.dir(props.history);

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
        {auth.loggedIn ? <Board /> : <Redirect to="/login" />}
      </Route>
      <Route path="/logout">{() => auth.basicLogout()}</Route>
      <Route path="/page-not-found">
        <PageNotFound />
      </Route>
      <Redirect to="/page-not-found" />
    </Switch>
  );
}

export default Main;

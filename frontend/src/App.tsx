import Main from "./container/Main";
import { useAuth, AuthProvider } from "./hooks/use-auth";

function App() {
  const auth = useAuth();
  console.log(process.env.REACT_APP_MS_CLIENT_ID);

  return (
    <AuthProvider value={auth}>
      <Main />
    </AuthProvider>
  );
}

export default App;

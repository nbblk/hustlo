import Main from "./container/Main";
import { useAuth, AuthProvider } from "./hooks/use-auth";

function App() {
  const auth = useAuth();
  return (
    <AuthProvider value={auth}>
      <Main />
    </AuthProvider>
  );
}

export default App;

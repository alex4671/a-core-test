import { useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  if (token) {
    return <Dashboard setToken={setToken} />;
  }

  return <Login setToken={setToken} />;
}

export default App;

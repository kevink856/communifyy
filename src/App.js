import './App.css';

import { useEffect, useState } from 'react';

// Import components
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if(!token && hash) {
      token = hash.substring(1).split("&").find(e => e.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          communifyy
        </p>
        {
          !token
          ? <div>
              <LoginButton />
            </div>
          : <div>
              <LogoutButton setToken={setToken} />
            </div>
        }
      </header>
    </div>
  );
}

export default App;

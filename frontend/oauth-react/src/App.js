import "./App.css";
import Home from "./Home";
import Login from "./Login";
import useLocalStorage from 'react-use-localstorage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SigninCallback from './Signin-callback'
function App() {
  const [accessToken, setAccessToken] = useLocalStorage("access_token", "");
  const [idToken, setIdToken] = useLocalStorage("id_token", "");

  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/">
          {accessToken ? <Home props={{
            "accessToken": accessToken,
            "idToken": idToken
          }}/> : <Login />}
        </Route>
        <Route exact path="/signin-callback">
          <SigninCallback />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}



export default App;

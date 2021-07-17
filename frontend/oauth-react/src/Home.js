import { Jumbotron, Button } from "react-bootstrap";
import JSONTree from "react-json-tree";
import jwt from "jwt-decode";
import axios from "axios";
import { useState } from "react";
import useLocalStorage from 'react-use-localstorage';

const Home = ({ props }) => { //try to pass down the token using props
  const [accessToken, setAccessToken] = useLocalStorage("access_token", "");
  const [idToken, setIdToken] = useLocalStorage("id_token", "");

  const [fooList, setFooList] = useState("");
  const [foo, setFoo] = useState("");

  const headers = {
    "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
    Authorization: "Bearer " + props.accessToken,
  };

  const returnToHome = () => {
    setAccessToken('');
    setIdToken('');
    alert('Token expired');
    window.location.href = 'http://localhost:3000';
  }

  const getFoos = async () => {
    await axios
      .get("http://localhost:8081/foos", { headers: headers })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          setFooList("");
          const list = res.data.map((each) => <li key={each}>{each}</li>);
          setFooList(list);
        }
      })
      .catch((res) => {
        setFooList('');
        console.log(res);
        returnToHome();
      });
  };

  const getFoo = async () => {
    await axios
      .get("http://localhost:8081/foos/random", { headers: headers })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          setFoo("");
          const foo = <p> {res.data} </p>;
          setFoo(foo);
        }
      })
      .catch((res) => {
        setFoo('');
        console.log(res);
        returnToHome();
      });
  };
  const logout = () => {
    setAccessToken('');
    setIdToken('');
    window.location.href = 'http://localhost:3000';
  }

  return (
    <div className="home">
      <Jumbotron>
        <Button onClick={() => logout()}>Logout</Button>
        <h1 className="header">Welcome To React-Oauth2</h1>
        You are authenticated!
        <div>
          <p>accessToken</p>
          <JSONTree
            data={jwt(props.accessToken)}
            theme="bright"
            shouldExpandNode={() => {
              return false;
            }}
          />
        </div>
        <div>
          <p>idToken</p>
          <JSONTree
            data={jwt(props.idToken)}
            theme="bright"
            shouldExpandNode={() => {
              return false;
            }}
          />
        </div>
        <div>
          <p>Protected Resource</p>

          <div>
            <Button onClick={() => getFoo()}>Get Random Foo</Button>
            {foo}
          </div>
          <div>
            <Button onClick={() => getFoos()}>Get Random Foo List</Button>
            {fooList}
          </div>
          <br />
        </div>
      </Jumbotron>
    </div>
  );
};

export default Home;

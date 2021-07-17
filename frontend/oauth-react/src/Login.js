import { Button, Jumbotron } from 'react-bootstrap';
const Login = () => {

    const login = () => {

      let clientId = 'foo-client'
      let scope = 'openid foos.read'
      let responseType = 'code'
      let redirectUri = 'http://localhost:3000/signin-callback'

      window.location.href = 
      'http://localhost:8082/oauth2/authorize?response_type='+responseType+
      '&scope='+scope+'&client_id='+clientId + '&redirect_uri='+ redirectUri;
    }

    return (
      <div className="login">
           <Jumbotron>
                <h1 className="header">Welcome To React-Oauth2</h1>
                <Button variant="primary" onClick={ () => login()}>Login</Button>
            </Jumbotron>
      </div>
    );
  }
   
  export default Login;
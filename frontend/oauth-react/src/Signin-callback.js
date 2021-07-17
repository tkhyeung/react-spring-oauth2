import {useEffect} from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';

const SigninCallback = () => {

    const code = getQueryVariable('code');
    const [accessToken, setAccessToken] = useLocalStorage("access_token", "");
    const [idToken, setIdToken] = useLocalStorage("id_token", "");

    useEffect(() => {
        // code to run on component mount
        if(code.length > 0 ){
            const request = retrieveToken(code);
            request.then(
              res => {
                console.log("res is " + JSON.stringify(res));
                const data = res.data;
                console.log(data.access_token)
                console.log(data.id_token)
                setAccessToken(data.access_token);
                setIdToken(data.id_token);
                window.location.href = 'http://localhost:3000'
              },
              err => alert('Invalid Credentials')
            ); 
            

        }
      }, [])

    return (
        <div>
            <p>code: {code}</p>
            Authorizing...
        </div>
    );
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    //console.log(query)//"app=article&act=news_content&aid=160990"
    var vars = query.split("&");
    //console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      //console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }

  function retrieveToken(code){
    let clientId = "foo-client";
    let client_secret = "password"; //for demo only
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', 'http://localhost:3000/signin-callback');
    params.append('code',code);

    let headers = {
        'Access-Control-Allow-Origin': '*', 
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId+":" + client_secret)
      };
    const data = axios.post('http://localhost:8082/oauth2/token', 
    params.toString(), { headers }); 
    return data;
  }
  
   
  export default SigninCallback;
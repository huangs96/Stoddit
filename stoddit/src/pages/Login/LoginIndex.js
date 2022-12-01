import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
// import axios from 'axios';

//setting User Token and storing in local storage
function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function LoginPage() {

  const [token, setToken] = useState();
  const [user, setUser] = useState({username: "", password:""});
  const [error, setError] = useState("");


  // const Login = details => {
  //   console.log('login1', user);
  //   console.log('details', details.username);
  //   setUser({username: details.username, password: details.password});
    // if (details.username === adminUser.username && details.password === adminUser.password) {
    //   setUser({
    //     username: details.username,
    //     password: details.password
    //   })
    // } else {
    //   console.log('Username or password is incorrect.')
    // }
  // };

  // const Logout = details => {
  //   console.log('loggedout');
  //   setUser({username: "", password:""});
  // }

  if(!token) {
    return <LoginPage setToken={setToken} />
  };
  
  return (
    <div className="loginPage">
      {(user.username != "") ? (
        <div className="welcomeMessage">
          <h2>Welcome, <span>{user.username}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  )
}

export default LoginPage
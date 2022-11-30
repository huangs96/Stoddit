import React, { useState } from 'react';
import LoginForm from './LoginForm';

function LoginPage() {

  const adminUser = {
    username: "steve@email.com",
    password: "steve"
  }

  const [user, setUser] = useState({username: "", password:""});
  const [error, setError] = useState("");

  const Login = details => {
    if (details.username === adminUser.username && details.password === adminUser.password) {
      setUser({
        username: details.username,
        password: details.password
      })
    } else {
      console.log('Username or password is incorrect.')
    }
  };

  const Logout = details => {
    console.log('loggedout');
    setUser({username: "", password:""});
  }
  
  return (
    <div className="loginPage">
      {(user.username != "") ? (
        <div className="welcomeMessage">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  )
}

export default LoginPage
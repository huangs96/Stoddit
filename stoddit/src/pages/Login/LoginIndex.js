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
    console.log(details);
  };

  const Logout = details => {
    console.log(details);
  }
  
  return (
    <div className="loginPage">
      {(user.username != "") ? (
        <div className="welcomeMessage">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  )
}

export default LoginPage
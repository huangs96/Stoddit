import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { getHome } from '../../services/login.service';
import { useParams } from 'react-router-dom';
import HomePage from '../Home/Home';
// import axios from 'axios';

function LoginPage() {

  const [token, setToken] = useState();
  const [user, setUser] = useState({username: "", password:""});
  const [error, setError] = useState("");
  const [page, setPage] = useState("login")

  useEffect(() => {
    let mounted = true;
    getHome()
    .then(homepage => {
      console.log(homepage);
      if (mounted) {
        setPage(homepage);
      }
    })
    return () => mounted = false;
  })


  const Login = details => {
    console.log('details----', details);
  };

  const Logout = details => {
    console.log('loggedout');
    setUser({username: "", password:""});
    setError('true');
  }
  
  return (
    <div className="loginPage">
      <LoginForm setToken={Login} error={error}/>
      <h1>{page}</h1>
    </div>
  )
}

export default LoginPage
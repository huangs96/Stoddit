import React, { useState, useEffect, useRef } from 'react';
import { authUser } from '../../services/login.service';
import { useNavigate } from "react-router-dom";
import CheckButton from 'react-validation/build/button';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useParams } from 'react-router-dom';
import HomePage from '../Home/Home';
import { getUser } from '../../services/home.service';
// import axios from 'axios';

const required = (value) => {
  if (!value) {
    return (
      <div>
        This field is required!
      </div>
    );
  }
};

function LoginPage() {

  const form = useRef();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const userName = e.target.value;
    setUserName(userName);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    let token = await authUser({
      username,
      password
    });

    if (token) {
      navigate('/home');
    }

  }

  //go to register if no account
  const navToRegister = () => {
    navigate('/register');
  }

  return (
    
    <form onSubmit={handleSubmit} ref={form}>
      <div className="form-inner">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor='username'>Username:</label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            onChange={onChangeUsername} 
            value={username}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor='password'>Password:</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            onChange={onChangePassword} 
            value={password}
            validations={[required]}
          />
        </div>
        <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        <button onClick={navToRegister} className="forgotPassword" >Forgot Password?</button>
        <button onClick={navToRegister}> No account? Register now!</button>
      </div>
    </form>
    

  )
}


export default LoginPage
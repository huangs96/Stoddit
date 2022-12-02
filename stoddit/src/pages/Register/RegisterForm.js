import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { authUser } from '../../services/login.service';

function RegisterForm({setToken, error}) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
  }

  return (
    
    <form onSubmit={handleSubmit}>
      <div className="form-inner">
        <h2>Registration</h2>
        <div className="form-group">
          <label htmlFor='username'>Username:</label>
          <input type="text" name="username" id="username" value={username}/>
        </div>
        <div className="form-group">
          <label htmlFor='password'>Password:</label>
          <input type="password" name="password" id="password" value={password}/>
        </div>
        <input type="submit" value="Register" />
        <a href="/home" className="accountExists">Already have an account? Sign in!</a>
      </div>
    </form>
    

  )
}

export default RegisterForm
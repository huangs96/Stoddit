import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  return fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

function LoginForm({Login, setToken, error}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }


  return (
    
    <form onSubmit={handleSubmit}>
      <div className="form-inner">
        <h2>Login</h2>
        {/* ERROR */}
        <div className="form-group">
          <label htmlFor='username'>Username:</label>
          <input type="text" name="username" id="username" onChange={e => setUserName(e.target.value)} value={username}/>
        </div>
        <div className="form-group">
          <label htmlFor='password'>Password:</label>
          <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} value={password}/>
        </div>
        <input type="submit" value="Login" />
        <a href="" className="forgotPassword">Forgot Password?</a>
      </div>
    </form>
    

  )
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginForm
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function RegisterPage() {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
 
  const handleSubmit = async e => {
    e.preventDefault();
  }

  const navigate = useNavigate();

  const navToLogin = () => {
    navigate('/login');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-inner">
        <h2>Registration</h2>
        <div className="form-group">
          <label htmlFor='username'>Username:</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="form-group">
          <label htmlFor='password'>Password:</label>
          <input type="password" name="password" id="password" />
        </div>
        <input type="submit" value="Register" onClick={setUserName}/>
        <button onClick={navToLogin} className="accountExists">Already have an account? Sign in!</button>
      </div>
    </form>
  )
}

export default RegisterPage
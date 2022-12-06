import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";

function RegisterPage() {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [registered, setRegistered] = useState(false);
 
  const required = (value) => {
    if (!value) {
      return (
        <div>
          This field is required!
        </div>
      );
    }
  };

  const onChangeUsername = (e) => {
    const userName = e.target.value;
    setUserName(userName);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
  
  const handleSubmit = async e => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (!password || !username ||!phone) {
      console.log("invalid");
      setLoading(false);
      return alert("fields unfilled");
    }

    await registerUser({
      username,
      password,
      phone
    });

    setRegistered(true);

    console.log(username, password, phone);
    console.log(registered);
    // console.log("registered----", registeredUser);
  }

  const navigate = useNavigate();

  const navToLogin = () => {
    navigate("/login");
  }
  
  return (
    <>
    {registered && 
    <div>
      <h3>registered!</h3>
      <button onClick={navToLogin}>
        Login Now
      </button>
    </div>
    }
    {!registered &&
    <form onSubmit={handleSubmit}>
      <div className="form-inner">
        <h2>Registration</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
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
          <label htmlFor="password">Password:</label>
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
          <label htmlFor="password">Confirm Password:</label>
          <input 
            type="password" 
            name="confirmPassword" 
            id="confirmPassword"
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input 
            type="text" 
            name="phone" 
            id="phone"
            onChange={onChangePhone} 
            value={phone}
            maxLength="10"
            validations={[required]}
          />
        </div>
        <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Register</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        <button onClick={navToLogin} className="accountExists">Already have an account? Sign in!</button>
      </div>
    </form>
    }
    </>
  )
}

export default RegisterPage
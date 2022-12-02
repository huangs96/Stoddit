// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import LoginPage from './pages/Login/LoginIndex';
import RegisterPage from './pages/Register/RegisterIndex';


function App() {
  const [currentForm, setCurrentForm] = useState('login'); 
  const switchForm = (form) => {
    setCurrentForm(form);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <LoginPage switchForm={switchForm} /> : <RegisterPage switchForm={switchForm} />
      }
    </div>
  );
}

export default App;

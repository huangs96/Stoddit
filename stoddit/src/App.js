// import logo from './logo.svg';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/LoginIndex';
import RegisterPage from './pages/Register/RegisterIndex';


function App() {
  const [currentForm, setCurrentForm] = useState('login'); 
  const switchForm = (form) => {
    setCurrentForm(form);
  }

  return (
      <Routes>
        <Route
          path="login"
          element={<LoginPage />}
        />
        <Route
          path="register"
          element={<RegisterPage />}
        />
        <Route
          path="home"
          element={<HomePage />}
        />
      </Routes>
  );
}

export default App;

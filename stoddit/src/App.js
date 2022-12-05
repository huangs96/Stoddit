// import logo from './logo.svg';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/LoginIndex';
import RegisterPage from './pages/Register/RegisterIndex';
import Header from './components/Header';


function App() {

  return (
    <>
    <Header />
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
    </>
  );
}

export default App;

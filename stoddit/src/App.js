// import logo from './logo.svg';
import React, { useState, useEffect, createContext } from 'react';
import { getAuthedUser } from './services/user.service';
import './App.css';
import Header from './components/Header';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;

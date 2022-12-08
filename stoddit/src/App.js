// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './components/Header';
import AppRoutes from './routes/Routes';
import authContext from './contexts/authContext';
import HomePage from './pages/Home/Home';
import ChatIndex from './pages/Chat/ChatIndex';




function App() {

  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;

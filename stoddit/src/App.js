// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
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
import ChatIndex from './pages/Chat/ChatIndex';
import TradeIndex from './pages/Trade/TradeIndex';
import ProfileIndex from './pages/Profile/ProfileIndex';
import PortfolioIndex from './pages/Portfolio/PortfolioIndex';
import { getUser } from './services/home.service';



function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUser(data);
    };
    fetchData()
    .catch(console.error);
    console.log('appppp----', user);
  }, []);

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
      <Route
        path="chat"
        element={<ChatIndex />}
      />
      <Route
        path="portfolio"
        element={<PortfolioIndex />}
      />
      <Route
        path="trade"
        element={<TradeIndex />}
      />
      <Route
        path="profile"
        element={<ProfileIndex />}
      />
    </Routes>
    </>
  );
}

export default App;

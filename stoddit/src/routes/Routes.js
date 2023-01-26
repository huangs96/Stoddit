import { Route, Routes } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { getAuthedUser } from '../services/user.service';
import { useNavigate } from "react-router-dom";
import HomePage from '../pages/Home/Home';
import LoginPage from '../pages/Login/LoginIndex';
import RegisterPage from '../pages/Register/RegisterIndex';
import ChatIndex from '../pages/Chat/ChatIndex';
import PortfolioIndex from '../pages/Portfolio/PortfolioIndex';
import TradeIndex from '../pages/Trade/TradeIndex';
import ProfileIndex from '../pages/Profile/ProfileIndex';

function AppRoutes() {
  const [user, setUser] = useState('');
  const navigate = useNavigate;
  
  useEffect(()=> {
    const fetchData = async () => {
      const data = await getAuthedUser();
      setUser(data);
      console.log(data);
      localStorage.setItem('UserID', JSON.stringify(data.user.id));
      localStorage.setItem('Username', JSON.stringify(data.user.username));
    }
    
    fetchData()
    .catch(console.error);
  }, []);
  
  if (localStorage.length < 0) {
    navigate('/login');
  };

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
  );
}

export default AppRoutes;
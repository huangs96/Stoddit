import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/Home';
import LoginPage from '../pages/Login/LoginIndex';
import RegisterPage from '../pages/Register/RegisterIndex';
import ChatIndex from '../pages/Chat/ChatIndex';
import PortfolioIndex from '../pages/Portfolio/PortfolioIndex';
import TradeIndex from '../pages/Trade/TradeIndex';
import ProfileIndex from '../pages/Profile/ProfileIndex';
import PrivateRoutes from './privateRoutes';

function AppRoutes() {
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
      <Route element={<PrivateRoutes />}>
      <Route
        path="/"
        element={<HomePage />}
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
      </Route>
    </Routes>
  );
}

export default AppRoutes;
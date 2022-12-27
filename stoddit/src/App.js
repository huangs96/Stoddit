// import logo from './logo.svg';
import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Header from './components/Header';
import AppRoutes from './routes/Routes';
import { getAuthedUser } from './services/user.service';
import UserContext from './contexts/userContext';


function App() {
  const [user, setUser] = useState('');
  
  useEffect(()=> {
    const fetchData = async () => {
      const data = await getAuthedUser();
      setUser(data);
    }
    fetchData()
    .catch(console.error);
  }, []);

  console.log('app user', user);
  
  return (
    <>
    <UserContext.Provider value={user}>
      <Header />
      <AppRoutes />
    </UserContext.Provider>
    </>
  );
}

export default App;

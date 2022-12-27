// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AppRoutes from './routes/Routes';
import { getUser } from './services/home.service';
import userContext from './contexts/userContext';


function App() {
  const [user, setUser] = useState('');
  
  useEffect(()=> {
    const fetchData = async () => {
      const data = await getUser();
      setUser(data);
    }
    fetchData()
    .catch(console.error);
  }, []);

  console.log('app user', user);
  
  return (
    <>
    <userContext.Provider value={user}>
      <Header />
      <AppRoutes />
    </userContext.Provider>
    </>
  );
}

export default App;

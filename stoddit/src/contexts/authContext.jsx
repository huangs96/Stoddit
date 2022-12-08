import React, { createContext, useState, useEffect } from 'react';
import { getUser } from '../services/home.service';


//use context to pass login globally
function AuthContext({ children }) {
  const [user, setUser] = useState('');
  const userContext = createContext(null);

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
    <userContext.Provider value={user}>
      {user && {children}}
    </userContext.Provider>
  )
}

export default AuthContext;
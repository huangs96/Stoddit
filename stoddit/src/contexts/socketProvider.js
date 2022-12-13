import React, { useContext, useEffect, useState } from 'react';

const socketContext = React.createContext();

const useSocket = () => {
  return useContext(socketContext);
};

const socketProvider = ({id, children}) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io('http://localhost:3000/chat');
  })
  return (
    <socketContext.Provider value={socket}>

    </socketContext.Provider>
  )
}




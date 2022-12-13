import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socketContext = React.createContext();

const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({id, children}) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  )
};




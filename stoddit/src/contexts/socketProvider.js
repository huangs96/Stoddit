import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socketContext = React.createContext();

export const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({chatroom_id, children}) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      query: { chatroom_id }
    });
    console.log('socketProvider--', chatroom_id);
    setSocket(newSocket);
    //close socket everytime session closes
    return () => newSocket.close();
  }, [chatroom_id]);

  // socket.on('connection', () => {
  //   console.log('working');
  // });
  // socket.on('message', message => {
  //   console.log("ChatIndex: socket", message);
  // });
  // socket.emit('chatMessage', message);
  // socket.on('chatMessage', chatMessage => {
  //   console.log('chatMessage', chatMessage);
  // });

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  )
};




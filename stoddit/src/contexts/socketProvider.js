import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socketContext = React.createContext();

export const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({chatroom_id, children}) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
    });
    console.log('socketID', chatroom_id);
    console.log('newSocket', newSocket.connected);
    setSocket(newSocket);
    //close socket everytime session closes
    // return () => newSocket.close();
  }, [chatroom_id]);

  console.log('socketProvider', socket);
  // on socket connection
  // socket.on('connection', () => {
  //   console.log('working');
  // });
  // console message from socket
  // socket.on('message', message => {
  //   console.log("ChatIndex: socket", message);
  // });

  // socket.on('chatMessage', chatMessage => {
  //   console.log('chatMessage', chatMessage);
  // });

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  )
};




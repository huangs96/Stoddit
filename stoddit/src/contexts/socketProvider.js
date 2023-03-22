import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = React.createContext();
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  withCredentials: true
});

const useSocket = () => {
  return useContext(SocketContext);
};

export {
  SocketContext,
  socket,
  useSocket,
  // SocketProvider,
}


import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = React.createContext();
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  withCredentials: true
});

const useSocket = () => {
  return useContext(SocketContext);
};

// const SocketProvider = ({children}) => {
//   const [socket, setSocket] = useState();

//   useEffect(() => {
//     const newSocket = io(process.env.REACT_APP_SOCKET_URL, {
//       withCredentials: true,
//     });
//     console.log('newSocket', newSocket);
//     setSocket(newSocket);
//     //close socket everytime session closes
//     // return () => newSocket.close();
//   }, []);

//   console.log('socketProvider', socket);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   )
// };

export {
  SocketContext,
  socket,
  useSocket,
  // SocketProvider,
}


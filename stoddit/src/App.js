import './App.css';
import Header from './components/Header';
import AppRoutes from './routes/Routes';
import { SocketContext, socket } from './contexts/socketProvider';

function App() {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <Header />
        <AppRoutes />
      </SocketContext.Provider>
    </>
  );
}

export default App;

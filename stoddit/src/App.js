import './App.css';
import Header from './components/Header';
import AppRoutes from './routes/Routes';
import { SocketContext, socket } from './contexts/socketProvider';

function App() {
  return (
    <>
      <div style={{
        background: '#F2F0FB',
        minHeight: '100vh'
      }}>
        <SocketContext.Provider value={socket}>
          <Header />
          <AppRoutes />
        </SocketContext.Provider>
      </div>
    </>
  );
}

export default App;

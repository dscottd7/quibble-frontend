import './App.css';
import '@mantine/core/styles.css';
import { Header } from './pages/Header';
import MainContainer from './pages/MainContainer';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider theme={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
        {/* Main Content Area */}
        <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />
          <MainContainer />
        </div>
      </div>
    </MantineProvider>
  );
}
export default App;

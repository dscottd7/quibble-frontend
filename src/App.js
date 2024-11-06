import './App.css';
import '@mantine/core/styles.css';
import { Header } from './pages/Header';
import HomePage from './pages/HomePage';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Roboto, sans-serif'
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <HomePage />
    </MantineProvider>
  );
}

export default App;

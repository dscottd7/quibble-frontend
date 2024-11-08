import './App.css';
import '@mantine/core/styles.css';
import { Header } from './pages/Header';
import HomePage from './pages/HomePage';
import { createTheme, MantineProvider, Container } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Roboto, sans-serif'
});

const pageProps = {
  h: 50,
  mt: 'xxl',
};

function App() {
  return (
    <MantineProvider theme={theme}>
      <Container fluid h={50}>
        <Header />
        <HomePage />
      </Container>
    </MantineProvider>
  );
}

export default App;

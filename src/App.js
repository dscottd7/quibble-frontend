import './App.css';
import '@mantine/core/styles.css';
import { Header } from './pages/Header';
// import MainContainer from './pages/MainContainer';
import ComparisonHistoryManager from './hooks/ComparisonHistoryManager';
import { createTheme, MantineProvider, rem, Container } from '@mantine/core';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import classes from './App.css';
import cx from 'clsx';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const theme = createTheme({
  components: {
    Container: Container.extend({
      styles: {
        root: {
          overflowY: 'auto',
          overflowX: 'hidden', 
          maxHeight: '100vh',
        },
      },
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' ? 'responsive-container' : ''}),
      }),
    }),
  },
  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
      h2: { fontSize: rem(30) },
    },
  },
});

function App() {
  const {
    history,
    saveComparison,
    deleteComparison,
    clearAllComparisons,
    selectedComparison,
    setSelectedComparison
  } = ComparisonHistoryManager();

  return (
    <MantineProvider theme={theme}>
      <Router>
        <Header />
        <Container
          size="lg"
          styles={{
            maxWidth: '1200px',
          }}
        >
          <Routes>
            {/* Default route for HomePage */}
            <Route
              path="/"
              element={
                <HomePage
                  saveComparison={saveComparison}
                  setSelectedComparison={setSelectedComparison}
                  selectedComparison={selectedComparison}
                  history={history}
                  deleteComparison={deleteComparison}
                  clearAllComparisons={clearAllComparisons}
                />
              }
            />
            
            {/* Route for AboutPage */}
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Container>
      </Router>
    </MantineProvider>
  );
}

export default App;

import './App.css';
import '@mantine/core/styles.css';
import { Header } from './pages/Header';
import ComparisonHistoryManager from './hooks/ComparisonHistoryManager';
import { createTheme, MantineProvider, rem, Container } from '@mantine/core';
import HomePage from './pages/HomePage';
import classes from './App.css';
import cx from 'clsx';


const theme = createTheme({
  components: {
    Container: Container.extend({
      styles: {
        root: {
          overflowY: 'auto',
          overflowX: 'hidden', 
          maxHeight: '100vh',
          maxWidth: '90vw',
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
      <Container fluid >
          <Header />
          <HomePage 
            saveComparison={saveComparison}
            setSelectedComparison={setSelectedComparison}
            selectedComparison={selectedComparison}
            history={history}
            deleteComparison={deleteComparison}
            clearAllComparisons={clearAllComparisons}
          />
      </Container>
    </MantineProvider>
  );
}
export default App;

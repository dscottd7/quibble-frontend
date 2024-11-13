import './App.css';
import '@mantine/core/styles.css';
import { Header } from './pages/Header';
import HomePage from './pages/HomePage';
import ComparisonHistorySidebar from './components/ComparisonHistorySidebar';
import { MantineProvider } from '@mantine/core';
import { useState, useEffect } from 'react';

function App() {
  // State for managing comparison history
  const [history, setHistory] = useState([]);
  const [selectedComparison, setSelectedComparison] = useState('');

  useEffect(() => {
    // Load history from localStorage on mount
    const savedComparisons = JSON.parse(localStorage.getItem('comparisonHistory')) || [];
    setHistory(savedComparisons);
  }, []);

  // Function to save a comparison to history
  const saveComparison = (comparisonData) => {
    const updatedHistory = [...history, comparisonData];
    setHistory(updatedHistory);
    localStorage.setItem('comparisonHistory', JSON.stringify(updatedHistory));
  };

  // Function to delete a comparison from history
  const deleteComparison = (index) => {
    const updatedHistory = history.filter((_, idx) => idx !== index);
    setHistory(updatedHistory);
    localStorage.setItem('comparisonHistory', JSON.stringify(updatedHistory));
  };

   // Function to clear all comparisons from history
   const clearAllComparisons = () => {
    setHistory([]); 
    localStorage.removeItem('comparisonHistory'); 
  };

  return (
    <MantineProvider theme={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
        {/* Main Content Area */}
        <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />
          <HomePage 
            saveComparison={saveComparison} 
            setSelectedComparison={setSelectedComparison}
            selectedComparison={selectedComparison}
          />
        </div>

        {/* Sidebar for Comparison History */}
        <ComparisonHistorySidebar 
          history={history} 
          onDelete={deleteComparison} 
          onSelect={setSelectedComparison}
          onClearAll={clearAllComparisons}
        />
      </div>
    </MantineProvider>
  );
}

export default App;

import React from 'react';
import HomePage from './HomePage';
import ComparisonHistorySidebar from '../components/ComparisonHistorySidebar';
import ComparisonHistoryManager from '../hooks/ComparisonHistoryManager';
import { Box } from '@mantine/core';

const MainContainer = () => {
  const {
    history,
    saveComparison,
    deleteComparison,
    clearAllComparisons,
    selectedComparison,
    setSelectedComparison
  } = ComparisonHistoryManager();

  return (
    <Box className="main-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Main Content Area for Comparisons */}
      <Box className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HomePage
          saveComparison={saveComparison}
          setSelectedComparison={setSelectedComparison}
          selectedComparison={selectedComparison}
        />
      </Box>

      {/* Sidebar for Comparison History */}
      <ComparisonHistorySidebar
        history={history}
        onDelete={deleteComparison}
        onSelect={setSelectedComparison}
        onClearAll={clearAllComparisons} 
      />
    </Box>
  );
};

export default MainContainer;

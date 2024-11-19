// hooks/useComparisonHistory.js
import { useState, useEffect } from 'react';

const ComparisonHistoryManager = () => {
  // State for managing comparison history
  const [history, setHistory] = useState([]);
  const [selectedComparison, setSelectedComparison] = useState(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedComparisons = JSON.parse(localStorage.getItem('comparisonHistory')) || [];
    setHistory(savedComparisons);
  }, []);

  // Function to save a comparison to history
  const saveComparison = (comparisonData) => {
    // Add URLs to the comparisonData object before saving it to history
    const updatedComparisonData = {
      title: comparisonData.title,
      data: comparisonData.data,
      urls: { ...comparisonData.urls }, // Add the URLs to be saved
    };
    const updatedHistory = [...history, updatedComparisonData];
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

  return {
    history,
    selectedComparison,
    setSelectedComparison,
    clearAllComparisons,
    saveComparison,
    deleteComparison,
  };
};

export default ComparisonHistoryManager;

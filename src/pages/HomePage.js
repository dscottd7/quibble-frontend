import React, { useState, useEffect, useRef } from 'react';
import { UrlForm } from '../components/UrlForm';
import { Button } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { Progress } from '@mantine/core';
import ActionButton from '../components/ActionButton';

const HomePage = ({ saveComparison, setSelectedComparison, selectedComparison }) => {
  const WEBSOCKET_URL = 'ws://localhost:8000/ws/compare';
  const wsRef = useRef(null);
  
  const initialUrlsState = { url1: '', url2: '' };
  const initialPreferencesState = { selected_categories: [], user_preference: '' };
  const [urls, setUrls] = useState(initialUrlsState);
  const [preferences, setPreferences] = useState(initialPreferencesState);
  
  const [status, setStatus] = useState({
    isProcessing: false,
    currentStep: '',  // For showing current progress
    error: '',
    comparison: ''
  });
  
  const [comparison, setComparison] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRendered, setIsRendered] = useState(false); // Track if markdown is rendered

  const handleWebSocketMessage = (event) => {
    const data = JSON.parse(event.data);
    setLoading(false);
    setProgress(100);
    
    switch (data.status) {
      case 'progress':
        // Update progress message
        setStatus(prev => ({
          ...prev,
          currentStep: data.message || 'Processing...'
        }));
        break;
      
      case 'comparison':
        // Final comparison received
        setStatus(prev => ({
          isProcessing: false,
          currentStep: '',
          error: '',
          comparison: data.data
        }));
        closeWebSocket();
        break;
      
      case 'error':
        setStatus(prev => ({
          isProcessing: false,
          currentStep: '',
          error: data.message || 'Failed to compare products. Please try again.',
          comparison: ''
        }));
        setLoading(false);
        closeWebSocket();
        break;
      
      default:
        console.log('Unknown message type:', data);
    }
  };

  const closeWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      // Send close frame with code 1000 (normal closure)
      wsRef.current.close(1000, 'User cancelled operation');
    }
  };

  // Load selected comparison when a previous one is selected from the hamburger menu
  useEffect(() => {
    if (selectedComparison) {
      setComparison(selectedComparison);
      setIsRendered(false); // Reset isRendered when a new comparison is loaded
    }
  }, [selectedComparison]);

  // Monitor comparison state and set isRendered to true once the comparison is set
  useEffect(() => {
    if (comparison && !loading) {
      const timer = setTimeout(() => {
        setIsRendered(true);
      }, 100); // 100ms delay to ensure the markdown content is rendered
      return () => clearTimeout(timer);
    }
  }, [comparison, loading]);

   // Update progress while loading is true
  useEffect(() => {
    if (loading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 2;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Handle change events for input fields and preference selection
  const handleChange = (e) => {
    if (Array.isArray(e)) {
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        selected_categories: e,
      }));
    } else {
      const { name, value } = e.target || {};
      if (name === 'url1' || name === 'url2') {
        setUrls((prevUrls) => ({
          ...prevUrls,
          [name]: value,
        }));
      } else if (name === 'user_preference') {
        setPreferences((prevPreferences) => ({
          ...prevPreferences,
          user_preference: value,
        }));
      }
    }
  };

  // Handle the form submission to trigger the comparison
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset state
    setStatus({
      isProcessing: true,
      currentStep: 'Starting comparison...',
      error: '',
      comparison: ''
    });
    
    setComparison('Comparing...');
    setError('');
    setLoading(true);
    setIsRendered(false); // Reset isRendered state before loading
    
    // Close existing WebSocket if any
    closeWebSocket();

    // Create new WebSocket connection
    const ws = new WebSocket(WEBSOCKET_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        urls: {
          url1: urls.url1,
          url2: urls.url2
        },
        user_input: {
          selected_categories: preferences.selected_categories,
          user_preference: preferences.user_preference,
        },
      }));
    };

    ws.onmessage = handleWebSocketMessage;
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus(prev => ({
        isProcessing: false,
        currentStep: '',
        error: 'Connection error occurred',
        comparison: ''
      }));
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  // Handle user cancelling request
  const handleCancel = () => {
    closeWebSocket();
    setStatus({
      isProcessing: false,
      currentStep: '',
      error: 'Comparison cancelled',
      comparison: ''
    });
  };

  // Clean up WebSocket on unmount
  useEffect(() => {
    return () => {
      closeWebSocket();
    };
  }, []);

  // Handle saving the current comparison
  const handleSaveComparison = () => {
    const comparisonData = {
      title: preferences.user_preference || `Comparison on ${new Date().toLocaleString()}`,
      comparison,
    };
    saveComparison(comparisonData);
  };

  // Handle starting a new comparison by resetting the form
  const handleNewComparison = () => {
    resetForm();
  };

  // Reset the form and state to their initial values
  const resetForm = () => {
    setUrls(initialUrlsState);
    setPreferences(initialPreferencesState);
    setComparison('');
    setError('');
    setProgress(0);
    setLoading(false);
    setIsRendered(false); 
  };

  return (
    <div className="main-content">
      {/* Description Section */}
      <div className="description">
        <h2>Compare any two products!</h2>
        <p>
          Paste the URL of any two products in the fields below, and click COMPARE for a comparison
        </p>
      </div>

      {/* URL Form to Input Product URLs and Preferences */}
      <UrlForm
        urls={urls}
        preferences={preferences}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isDisabled={status.isProcessing}
      />


      {/* Loading Progress Bar */}
      {loading && (
        <div style={{ width: '300px', margin: '0 auto' }}>
          <Progress value={progress} />
        </div>
      )}
      
      {/* Websocket status */}
      {status.isProcessing && (
        <div className="websocket-status">
          <div className="websocket-status-message">
            <p>{status.currentStep}</p>
          </div>
          <Progress value={progress} />
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel Request
          </Button>
        </div>
      )}

      {/* Error message */}
      {status.error && (
        <div className="error-message" role="alert">
          {status.error}
        </div>
      )}

      {/* Comparison Result Section */}
      {status.comparison && !error && (
        <div className="comparison-result-box">
          <ReactMarkdown>
            {status.comparison}
          </ReactMarkdown>
          {isRendered && (
            <div className="actions">
              <ActionButton label="Save Comparison" onClick={handleSaveComparison} />
              <ActionButton label="New Comparison" onClick={handleNewComparison} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;

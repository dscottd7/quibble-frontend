import React, { useState, useEffect, useRef } from 'react';
import { UrlForm } from '../components/UrlForm';
import { Button } from '@mantine/core';
import ReactMarkdown from 'react-markdown';

const HomePage = () => {
  const WEBSOCKET_URL = 'ws://localhost:8000/ws/compare';
  const wsRef = useRef(null);
  
  const [urls, setUrls] = useState({
    url1: '',
    url2: ''
  });
  
  const [preferences, setPreferences] = useState({
    selected_categories: [],
    user_preference: ''
  });
  
  const [status, setStatus] = useState({
    isProcessing: false,
    currentStep: '',  // For showing current progress
    error: '',
    comparison: ''
  });

  const handleWebSocketMessage = (event) => {
    const data = JSON.parse(event.data);
    
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
          error: data.message || 'An error occurred',
          comparison: ''
        }));
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

  const handleChange = (e) => {
    if (Array.isArray(e)) {
      // Handle category changes
      setPreferences(prev => ({
        ...prev,
        selected_categories: e,
      }));
    } else {
      const { name, value } = e.target || {};
      if (name === 'url1' || name === 'url2') {
        setUrls(prev => ({
          ...prev,
          [name]: value,
        }));
      } else if (name === 'user_preference') {
        setPreferences(prev => ({
          ...prev,
          user_preference: value,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset state
    setStatus({
      isProcessing: true,
      currentStep: 'Starting comparison...',
      error: '',
      comparison: ''
    });
    
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

  return (
    <div className="homepage">
      <div className="description">
        <h2>Compare any two products!</h2>
        <p>
          Paste the URL of any two products in the fields below, and click COMPARE for a comparison
        </p>
      </div>

      <UrlForm
        urls={urls}
        preferences={preferences}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isDisabled={status.isProcessing}
      />

      {status.isProcessing && (
        <div className="websocket-status">
          <div className="websocket-status-message">
            <p>{status.currentStep}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel Request
          </Button>
        </div>
      )}
      
      {status.error && (
        <div className="error-message" role="alert">
          {status.error}
        </div>
      )}
      
      {status.comparison && (
        <div className="comparison-result">
          <ReactMarkdown>
            {status.comparison}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default HomePage;

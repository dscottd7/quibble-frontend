import React, { useState, useEffect, useRef } from 'react';
import { UrlForm } from '../components/UrlForm';
import ReactMarkdown from 'react-markdown';
import { Loader2 } from "lucide-react";

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
    <div className="homepage max-w-4xl mx-auto p-6">
      <div className="description mb-8">
        <h2 className="text-2xl font-bold mb-2">Compare any two products!</h2>
        <p className="text-gray-600">
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
        <div className="flex items-center justify-between p-4 my-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{status.currentStep}</span>
          </div>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      )}
      
      {status.error && (
        <div className="error-message p-4 my-4 bg-red-50 text-red-700 rounded-lg" role="alert">
          {status.error}
        </div>
      )}
      
      {status.comparison && (
        <div className="comparison-result my-6 p-6 bg-white rounded-lg shadow">
          <ReactMarkdown className="prose max-w-none">
            {status.comparison}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default HomePage;

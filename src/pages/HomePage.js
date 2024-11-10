import React, { useState, useEffect, useRef } from 'react';
import { UrlForm } from '../components/UrlForm';
import ReactMarkdown from 'react-markdown';
import { Loader2 } from "lucide-react"; // For loading spinner

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
  
  const [processingState, setProcessingState] = useState({
    url1: false, // true when processing URL 1
    url2: false, // true when processing URL 2
    comparing: false // true when generating final comparison
  });
  
  const [results, setResults] = useState({
    summary1: '',
    summary2: '',
    comparison: ''
  });
  
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleChange = (e) => {
    if (Array.isArray(e)) {
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

  const resetState = () => {
    setProcessingState({
      url1: false,
      url2: false,
      comparing: false
    });
    setResults({
      summary1: '',
      summary2: '',
      comparison: ''
    });
    setError('');
  };

  const handleWebSocketMessage = (event) => {
    const data = JSON.parse(event.data);
    
    switch (data.status) {
      case 'progress':
        // Update processing state based on progress message
        if (data.message?.includes('URL 1')) {
          setProcessingState(prev => ({ ...prev, url1: true }));
        } else if (data.message?.includes('URL 2')) {
          setProcessingState(prev => ({ ...prev, url2: true }));
        } else if (data.message?.includes('comparison')) {
          setProcessingState(prev => ({ ...prev, comparing: true }));
        }
        break;
      
      case 'summary1':
        setResults(prev => ({ ...prev, summary1: data.data }));
        setProcessingState(prev => ({ ...prev, url1: false }));
        break;
      
      case 'summary2':
        setResults(prev => ({ ...prev, summary2: data.data }));
        setProcessingState(prev => ({ ...prev, url2: false }));
        break;
      
      case 'comparison':
        setResults(prev => ({ ...prev, comparison: data.data }));
        setProcessingState(prev => ({ ...prev, comparing: false }));
        closeWebSocket();
        break;
      
      case 'error':
        setError(data.message || 'An error occurred');
        resetState();
        closeWebSocket();
        break;
      
      default:
        console.log('Unknown message type:', data);
    }
  };

  const closeWebSocket = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close();
      setIsConnected(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debug log the data being sent
    console.log('Submitting data:');
    console.log('URL1:', urls.url1);
    console.log('URL2:', urls.url2);
    console.log('Categories:', preferences.selected_categories);
    console.log('User Preference:', preferences.user_preference);
    
    resetState();
    closeWebSocket();

    const ws = new WebSocket(WEBSOCKET_URL);
    wsRef.current = ws;

    ws.onopen = () => {
        setIsConnected(true);
        const payload = {
            urls: {
                url1: urls.url1,
                url2: urls.url2
            },
            user_input: {
                selected_categories: preferences.selected_categories,
                user_preference: preferences.user_preference,
            },
        };
        
        // Debug log the actual payload being sent
        console.log('Sending WebSocket payload:', payload);
        
        ws.send(JSON.stringify(payload));
    };

    ws.onmessage = (event) => {
        // Debug log received messages
        console.log('Received WebSocket message:', event.data);
        handleWebSocketMessage(event);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Connection error occurred');
      resetState();
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket connection closed');
    };
  };

  const handleCancel = () => {
    closeWebSocket();
    resetState();
    setError('Comparison cancelled');
  };

  // Clean up WebSocket on unmount
  useEffect(() => {
    return () => {
      closeWebSocket();
    };
  }, []);

  const isProcessing = processingState.url1 || processingState.url2 || processingState.comparing;

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
        isDisabled={isProcessing}
      />

      {isProcessing && (
        <div className="flex items-center justify-between p-4 my-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>
              {processingState.url1 && "Processing URL 1..."}
              {processingState.url2 && "Processing URL 2..."}
              {processingState.comparing && "Generating comparison..."}
            </span>
          </div>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      )}
      
      {error && (
        <div className="error-message p-4 my-4 bg-red-50 text-red-700 rounded-lg" role="alert">
          {error}
        </div>
      )}

      {results.summary1 && (
        <div className="summary-result my-6 p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3">Summary of Product 1:</h3>
          <ReactMarkdown className="prose max-w-none">{results.summary1}</ReactMarkdown>
        </div>
      )}
      
      {results.summary2 && (
        <div className="summary-result my-6 p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3">Summary of Product 2:</h3>
          <ReactMarkdown className="prose max-w-none">{results.summary2}</ReactMarkdown>
        </div>
      )}
      
      {results.comparison && (
        <div className="comparison-result my-6 p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3">Comparison:</h3>
          <ReactMarkdown className="prose max-w-none">{results.comparison}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default HomePage;

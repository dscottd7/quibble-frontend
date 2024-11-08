import React, { useState, useEffect } from 'react';
import { UrlForm } from '../components/UrlForm';
import ReactMarkdown from 'react-markdown';
import { Header } from '../components/Header';
import { SimpleGrid } from '@mantine/core';

const HomePage = () => {
  const FETCH_URL = 'http://localhost:8000';
  const [urls, setUrls] = useState({
    url1: '',
    url2: ''
  });
  const [preferences, setPreferences] = useState({
    selected_categories: [],
    user_preference: ''
  });
  const [summary1, setSummary1] = useState('');
  const [summary2, setSummary2] = useState('');
  const [comparison, setComparison] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (Array.isArray(e)) {
      // Handle category change (from Switch.Group)
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        selected_categories: e,
      }));
    } else {
      const { name, value } = e.target || {};
  
      if (name === 'url1' || name === 'url2') {
        // Handle URL fields
        setUrls((prevUrls) => ({
          ...prevUrls,
          [name]: value,
        }));
      } else if (name === 'user_preference') {
        // Handle additional instructions (textarea)
        setPreferences((prevPreferences) => ({
          ...prevPreferences,
          user_preference: value,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('urls:', urls);
    console.log('preferences:', preferences);
    
    // Reset state for new comparison
    setSummary1('');
    setSummary2('');
    setComparison('');
    setError('');
    setIsLoading(true);

    // Build the URL with parameters
    const params = new URLSearchParams({
      url1: urls.url1,
      url2: urls.url2,
      selected_categories: preferences.selected_categories.join(','),
      user_preference: preferences.user_preference
    });
    
    const eventSource = new EventSource(
      `${FETCH_URL}/sse-compare?${params.toString()}`,
      { withCredentials: false }
    );

    // Set up event listeners
    eventSource.onopen = () => {
      console.log('SSE connection opened');
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      setError('Connection error. Please try again.');
      setIsLoading(false);
      eventSource.close();
    };

    eventSource.addEventListener('summary1', (event) => {
      try {
        const data = JSON.parse(event.data);
        setSummary1(data.summary);
      } catch (err) {
        console.error('Error parsing summary1:', err);
      }
    });

    eventSource.addEventListener('summary2', (event) => {
      try {
        const data = JSON.parse(event.data);
        setSummary2(data.summary);
      } catch (err) {
        console.error('Error parsing summary2:', err);
      }
    });

    eventSource.addEventListener('comparison', (event) => {
      try {
        const data = JSON.parse(event.data);
        setComparison(data.comparison);
        setIsLoading(false);
        eventSource.close();
      } catch (err) {
        console.error('Error parsing comparison:', err);
      }
    });

    eventSource.addEventListener('error', (event) => {
      try {
        const data = JSON.parse(event.data);
        setError(data.error || 'An error occurred');
        setIsLoading(false);
        eventSource.close();
      } catch (err) {
        console.error('Error parsing error event:', err);
        setError('An unexpected error occurred');
      }
    });

    // Clean up event source
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  };

  

  return (
    <div className="homepage">  
      <div className="description">
        <h2>Compare any two products!</h2>
        <p>Paste the URL of any two products in the fields below, and click COMPARE for a comparison</p>
      </div>

      <UrlForm
        urls={urls}
        preferences={preferences}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {isLoading && (
        <div className="loading-indicator">
          Processing your request...
        </div>
      )}
      
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 10, sm: 30 , lg: 90 }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        {summary1 && (
          <div>
            <ReactMarkdown>{summary1}</ReactMarkdown>
          </div>
        )}
        {summary2 && (
          <div>
            <ReactMarkdown>{summary2}</ReactMarkdown>
          </div>
        )}
        {comparison && !error && (
          <div>
            <ReactMarkdown>{comparison}</ReactMarkdown>
          </div>
        )}
      </SimpleGrid>
    </div>
  );
};

export default HomePage;
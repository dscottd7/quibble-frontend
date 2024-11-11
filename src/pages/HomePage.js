import React, { useState } from 'react';
import { UrlForm } from '../components/UrlForm';
import ReactMarkdown from 'react-markdown';
import { Header } from '../components/Header';

const HomePage = () => {
  // reads URL from .env (set REACT_APP_BACKEND_URL there) or defaults to localhost for local testing if nothing found there
  const FETCH_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  const [urls, setUrls] = useState({
    url1: '',
    url2: ''
  });
  
  const [preferences, setPreferences] = useState({
    selected_categories: [],
    user_preference: ''
  });
  
  const [comparison, setComparison] = useState('');
  const [error, setError] = useState('');

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
    setComparison('Comparing...');
    setError('');
    
    try {
      const res = await fetch(`${FETCH_URL}/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: {
            url1: urls.url1,
            url2: urls.url2
          },
          user_input: {
            selected_categories: preferences.selected_categories,
            user_preference: preferences.user_preference,
          },
        }),
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch /compare: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Extract the comparison text from the response
      if (data && data.comparison) {
        setComparison(data.comparison);
      } else {
        throw new Error('Response did not contain comparison data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error); 
      setComparison('');
    }
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
      />
      
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      
      {comparison && !error && (
        <div className="comparison-result">
          <ReactMarkdown>{comparison}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default HomePage;
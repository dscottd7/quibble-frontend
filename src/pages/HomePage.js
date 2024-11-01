import React, { useState } from 'react';
import { UrlForm } from '../components/UrlForm';
import ReactMarkdown from 'react-markdown';

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
  
  const [comparison, setComparison] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name } = e.target;
    
    if (name === 'url1' || name === 'url2') {
      setUrls(prevUrls => ({
        ...prevUrls,
        [name]: e.target.value,
      }));
    } else if (name === 'selected_categories') {
      const selectedOptions = Array.from(e.target.selectedOptions);
      const selectedValues = selectedOptions.map(option => option.value);
      setPreferences(prevPreferences => ({
        ...prevPreferences,
        selected_categories: selectedValues,
      }));
    } else {
      setPreferences(prevPreferences => ({
        ...prevPreferences,
        [name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setError('Failed to compare products. Please try again.');
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
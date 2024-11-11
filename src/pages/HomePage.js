import React, { useState, useEffect } from 'react';
import { UrlForm } from '../components/UrlForm';
import ReactMarkdown from 'react-markdown';
import ProgressBarr from '../components/Progress';
import ActionButton from '../components/ActionButton';


const HomePage = ({ saveComparison, setSelectedComparison, selectedComparison }) => {
  const FETCH_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  const initialUrlsState = { url1: '', url2: '' };
  const initialPreferencesState = { selected_categories: [], user_preference: '' };

  const [urls, setUrls] = useState(initialUrlsState);
  const [preferences, setPreferences] = useState(initialPreferencesState);
  const [comparison, setComparison] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRendered, setIsRendered] = useState(false); // Track if markdown is rendered

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
    setComparison('Comparing...');
    setError('');
    setLoading(true);
    setIsRendered(false); // Reset isRendered state before loading

    try {
      const res = await fetch(`${FETCH_URL}/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: {
            url1: urls.url1,
            url2: urls.url2,
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
      setLoading(false);
      setProgress(100);

      if (data && data.comparison) {
        setComparison(data.comparison);
      } else {
        throw new Error('Response did not contain comparison data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error); 
      setComparison('');
      setLoading(false);
    }
  };

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
        <p>Paste the URL of any two products in the fields below, and click COMPARE for a comparison</p>
      </div>

      {/* URL Form to Input Product URLs and Preferences */}
      <UrlForm
        urls={urls}
        preferences={preferences}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {/* Loading Progress Bar */}
      {loading && (
        <div style={{ width: '300px', margin: '0 auto' }}>
          <ProgressBarr value={progress} />
        </div>
      )}

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {/* Error Message Section */}
      {/* Comparison Result Section */}
      {comparison && !error && (
        <div className="comparison-result-box">
          <ReactMarkdown>{comparison}</ReactMarkdown>
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

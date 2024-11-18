/* import React from 'react';
import PropTypes from 'prop-types';

const ComparisonHistorySidebar = ({ history, onDelete, onSelect }) => {
  return (
    <div className="comparison-history-sidebar" style={{ width: '300px', background: '#f4f4f4', padding: '10px', overflowY: 'auto' }}>
      <h3>Previous Comparisons</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {history.map((item, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                onClick={() => onSelect(item.data)} 
                style={{ flex: 1, marginRight: '5px', textAlign: 'left' }}>
                {item.title || `Comparison ${index + 1}`}
              </button>
              <button 
                onClick={() => onDelete(index)} 
                style={{ background: 'red', color: 'white', border: 'none', padding: '5px' }}>
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ComparisonHistorySidebar.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ComparisonHistorySidebar;
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from '@mantine/core';
import '../styles/ComparisonHistorySidebar.css';

const ComparisonHistorySidebar = ({ history, onDelete, onSelect }) => {
  return (
    <div className="comparison-history-sidebar">
      <Text weight={500} size="lg" mb="md" className="comparison-header">
        Previous Comparisons
      </Text>
      <div className="comparison-list">
        {history.map((item, index) => (
          <Box key={index} className="comparison-item-box">
             
            {/* Display the comparison title */}
            <Text
              className="comparison-title"
              onClick={() => onSelect(item.data)}
            >
              {item.title || `Comparison ${index + 1}`}
            </Text>

            {/* Display the URLs used for the comparison */}
            {item.urls && (
              <div className="comparison-urls">
                {item.urls.url1 && (
                  <div className="product-link">
                    <a href={item.urls.url1} target="_blank" rel="noopener noreferrer">
                      Product 1
                    </a>
                  </div>
                )}
                {item.urls.url2 && (
                  <div className="product-link">
                    <a href={item.urls.url2} target="_blank" rel="noopener noreferrer">
                      Product 2
                    </a>
                  </div>
                )}
              </div>
            )}
            
             {/* Delete button */}
            <Button
              color="red"
              variant="filled"
              onClick={() => onDelete(index)}
              size="xs"
              className="delete-button"
            >
              ✕
            </Button>
           
          </Box>
        ))}
      </div>
    </div>
  );
};

ComparisonHistorySidebar.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
      uurls: PropTypes.shape({
        url1: PropTypes.string.isRequired,
        url2: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};


export default ComparisonHistorySidebar;



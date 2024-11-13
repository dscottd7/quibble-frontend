import React from 'react';
import PropTypes from 'prop-types';

const ComparisonHistorySidebar = ({ history, onDelete, onSelect, onClearAll }) => {
  return (
    <div className="comparison-history-sidebar" style={{ width: '300px', background: '#f4f4f4', padding: '10px', overflowY: 'auto' }}>
      <div className="history-header">
        <h3>Previous Comparisons</h3>
        {/* "Clear All" button */}
        {history.length > 0 && (
          <span className="clear-all-text" onClick={onClearAll}>
          CLEAR ALL
          </span>
        )}
      </div>
      <ul className="comparison-list" style={{ listStyle: 'none', padding: 0 }}>
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


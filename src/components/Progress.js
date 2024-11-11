import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '@ramonak/react-progress-bar';

const ProgressBarr = ({ value }) => {
  return (
    <div style={{ width: '100%', margin: '20px auto' }}>
      <ProgressBar
        completed={value}
        bgColor="#007bff"
        height="20px"
        baseBgColor="#e0e0e0"
        width="100%" 
        isLabelVisible={true}
        animateOnRender={true}
      />
    </div>
  );
};

ProgressBarr.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgressBarr;

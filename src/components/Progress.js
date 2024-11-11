import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from '@mantine/core';

const ProgressBarr = ({ value }) => {
  return (
    <div style={{ width: '100%', margin: '20px auto' }}>
      <Progress
        value={value}
        color="cyan"
      />
    </div>
  );
};

ProgressBarr.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgressBarr;
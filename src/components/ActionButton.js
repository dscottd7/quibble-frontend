import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = ({ label, onClick }) => {
  return (
    <button  className="submit_button" onClick={onClick}>
      {label}
    </button>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ActionButton;

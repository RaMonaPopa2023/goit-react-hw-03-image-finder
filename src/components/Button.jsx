import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, isHidden = false }) => {
  return (
    <button
      className={`${styles.button} ${isHidden ? styles.hidden : ''}`}
      onClick={onClick}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
};

export default Button;

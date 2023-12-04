import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedImage: PropTypes.string.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.handleClose();
    }
  };

  handleClickOutside = event => {
    if (event.target === event.currentTarget) {
      this.props.handleClose();
    }
  };

  render() {
    const { isOpen, handleClose, selectedImage } = this.props;

    return (
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={this.handleClickOutside}
      >
        <div className={styles.modal}>
          <img src={selectedImage} alt="" />{' '}
          <button className={styles.closeButton} onClick={handleClose}>
            &times;
          </button>
        </div>
      </div>
    );
  }
}

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './ErrorAlert.module.css';

export default class ErrorAlert extends Component {
  static propTypes = { errors: PropTypes.string.isRequired };

  state = {
    isClosed: false,
  };

  render() {
    const { errors } = this.props;
    const { isClosed } = this.state;

    if (errors.length === 0 || isClosed) {
      return;
    }

    return (
      <section className={styles.alert}>
        <div className={styles.content}>
          <p>{errors}</p>
          <span
            className={styles.close}
            onClick={() => this.setState({ isClosed: true })}
          ></span>
        </div>
      </section>
    );
  }
}

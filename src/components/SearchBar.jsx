import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.module.css';

export default class SearchBar extends Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    retrieveArticles: PropTypes.func.isRequired,
  };

  handleChange = evt => {
    const searchTerm = evt.target.value;

    this.props.handleChange(searchTerm);
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.retrieveArticles(this.props.searchTerm);
  };

  render() {
    const { searchTerm } = this.props;

    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={searchTerm}
          />
        </form>
      </header>
    );
  }
}

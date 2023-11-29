import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import ImageService from './ImageService';
import ErrorAlert from './ErrorAlert';
import SearchBar from './SearchBar';
import Loading from './Loading';
import Button from './Button';

export default class App extends Component {
  state = {
    articles: [],
    searchTerm: '',
    isLoading: false,
    error: '',
    visibleImages: 12,
    perPage: 20,
    totalHits: 0,
  };

  retrieveArticles = async (page = 1) => {
    let uniqueArticles = [];
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await ImageService.retrieveArticles(
        this.state.searchTerm,
        page,
        this.state.perPage
      );

      if (hits.length === 0) {
        this.setState({
          error: 'Nu a fost gasit rezultatul.',
        });
      } else {
        uniqueArticles = hits.filter(article =>
          this.state.articles.every(
            existingArticle => existingArticle.id !== article.id
          )
        );
      }

      this.setState(prevState => ({
        articles:
          page === 1
            ? uniqueArticles
            : [...prevState.articles, ...uniqueArticles],
        totalHits,
      }));
    } catch (error) {
      switch (error.code) {
        case 'ERR_BAD_REQUEST':
          this.setState({ error: 'Nu a fost gasit rezultatul' });
          break;
        default:
          this.setState({ error: 'A aparut o eroare.' });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.state;

    if (searchTerm !== prevState.searchTerm) {
      this.setState({
        articles: [],
        error: '',
        isLoading: true,
        totalHits: 0,
      });
      await this.retrieveArticles();
      this.setState({ isLoading: false });
    }
  }

  loadMore = async () => {
    const { visibleImages, perPage, totalHits } = this.state;
    const nextPage = Math.ceil((visibleImages + perPage) / perPage);

    if (visibleImages < totalHits) {
      this.setState({ visibleImages: visibleImages + perPage });
      await this.retrieveArticles(nextPage);
    }
  };
  render() {
    const { articles, error, isLoading, searchTerm, totalHits, perPage } =
      this.state;
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div>
        <SearchBar
          handleChange={searchTerm => {
            this.setState({ searchTerm });
          }}
          retrieveArticles={this.retrieveArticles}
          searchTerm={searchTerm}
        />
        {error?.length > 0 && <ErrorAlert errors={error} />}
        {articles.length > 0 && (
          <ImageGallery articles={articles} loadMore={this.loadMore} />
        )}
        {isLoading && <Loading />}
      </div>
    );
  }
}

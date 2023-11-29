import React, { Component } from 'react';
import styles from './styles.module.css';
import Modal from './Modal';
import Button from './Button';

class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      selectedImage: '',
      visibleImages: 12,
    };
  }

  openModal = imageUrl => {
    this.setState({ selectedImage: imageUrl, modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  handleLoadMore = () => {
    this.props.loadMore();
    this.setState(prevState => ({
      visibleImages: prevState.visibleImages + 12,
    }));
  };

  render() {
    const { articles } = this.props;
    const { modalOpen, selectedImage, visibleImages } = this.state;

    return (
      <div className={styles.ImageGallery}>
        {articles
          .slice(0, visibleImages)
          .map(({ id, webformatURL, largeImageURL }, index) => {
            const uniqueKey = `${id}_${index}`;
            return (
              <div
                key={uniqueKey}
                onClick={() => this.openModal(largeImageURL)}
                className={styles.ImageGalleryItem}
              >
                <img
                  className={styles.ImageGalleryItemImg}
                  src={webformatURL}
                  alt={`Image ${id}`}
                />
              </div>
            );
          })}
        <Modal
          isOpen={modalOpen}
          handleClose={this.closeModal}
          selectedImage={selectedImage}
        >
          {selectedImage && <img src={selectedImage} alt="Large version" />}
        </Modal>
        {articles.length > visibleImages && (
          <Button
            onClick={this.handleLoadMore}
            label="Load More"
            isHidden={false}
          />
        )}
      </div>
    );
  }
}

export default ImageGallery;

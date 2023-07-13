import './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, largeImageURL, openModal }) => {
  return (
    <li onClick={() => openModal(largeImageURL)}>
      <img src={src} alt={alt}/>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
};
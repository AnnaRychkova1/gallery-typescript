import { forwardRef } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = forwardRef(({ pictures, onImageClick }, ref) => {
  return (
    <ul ref={ref} className={css.gallery}>
      {pictures !== null &&
        Array.isArray(pictures) &&
        pictures.map(picture => {
          return (
            <li className={css.itemsGallery} key={picture.id}>
              <ImageCard
                ref={ref}
                picture={picture}
                onImageClick={onImageClick}
              />
            </li>
          );
        })}
    </ul>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;

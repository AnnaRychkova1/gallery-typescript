import { forwardRef } from 'react';
import css from './ImageCard.module.css';

const ImageCard = forwardRef(({ picture, onImageClick }, ref) => {
  const imgData = {
    imgSrc: picture.urls.regular,
    imgDescription: picture.description,
    imgAlt: picture.alt_description,
  };
  return (
    <div ref={ref}>
      <div className={css.imgCardContainer}>
        <img
          onClick={() => onImageClick(imgData)}
          className={css.imgItem}
          width={300}
          src={picture.urls.small}
          alt={picture.alt_description}
        />
      </div>
      <div className={css.description}>
        <span>
          <span className={css.descrItem}>Likes:</span> {picture.likes}
        </span>
        <span>
          <span className={css.descrItem}>Author:</span> {picture.user.name}
        </span>
      </div>
    </div>
  );
});

ImageCard.displayName = 'ImageCard';

export default ImageCard;

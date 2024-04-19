import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({
  closeModal,
  isModalOpen,
  imgSrc,
  imgDescription,
  imgAlt,
  // тут не працюють короткі властивості, бо якщо немає деяких параметрів в запиті, то нам з бекенда приходить null і саме null рендериться тут. Тому в розмітці робимо перевірку. Фбо перевірку треба було зробити в компоненті ImageCard
  // imgSrc = 'https://pixabay.com/vectors/default-emblem-icon-icons-matt-1294448/',
  // imgDescription = 'Image according to your request',
  // imgAlt = 'Image according to your request',
}) => {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <button className={css.btnCloseModal} onClick={closeModal}>
          <MdClose size={36} />
        </button>
        <div className={css.imageContainer}>
          <img
            className={css.image}
            src={
              imgSrc ||
              'https://pixabay.com/vectors/default-emblem-icon-icons-matt-1294448/'
            }
            alt={imgAlt || 'Image according to your request'}
          />
          <p className={css.imageInfo}>
            {imgDescription || 'Image according to your request'}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;

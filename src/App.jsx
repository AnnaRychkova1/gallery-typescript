import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { noquery, errorMes } from './components/services/toaster';
import requestPictures from './components/services/requestPictures';
// import css from './App.module.css';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemRef = useRef(null);
  const heightRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState({
    imgSrc: '',
    imgDescription: '',
    imgAlt: '',
  });

  useEffect(() => {
    if (!searchQuery || searchQuery === null) {
      setLoadMore(false);
      setIsModalOpen(false);
      setIsError(false);
      return;
    }

    async function fetchPicturesByQuery() {
      try {
        setLoadMore(false);
        setIsError(false);
        setIsModalOpen(false);
        setIsLoading(true);

        const data = await requestPictures(searchQuery, page);

        if (data.total === 0) {
          noquery();
          return;
        }

        if (data.total_pages > page) {
          setLoadMore(true);
        }

        setPictures(prevState => prevState.concat(data.results));
      } catch (err) {
        setIsError(true);
        errorMes();
      } finally {
        setIsLoading(false);
      }
    }

    fetchPicturesByQuery();
  }, [searchQuery, page]);

  useEffect(() => {
    if (page <= 1) {
      return;
    }

    if (itemRef.current) {
      const height = itemRef.current.getBoundingClientRect().height;
      heightRef.current = height;
      window.scrollBy({
        top: heightRef.current,
        behavior: 'smooth',
      });
    }
  }, [pictures, page]);

  const handleSearchQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchQuery} />
      {isError && <ErrorMessage />}
      <ImageGallery
        ref={itemRef}
        pictures={pictures}
        onImageClick={handleImageClick}
      />
      {isLoading && <Loader />}
      {loadMore && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      {isModalOpen && (
        <ImageModal
          {...selectedImage}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
        />
      )}
      <Toaster
        toastOptions={{
          style: {
            background: '#4e75ff',
            color: '#fff',
          },
        }}
      />
    </>
  );
};

export default App;

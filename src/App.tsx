import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { noquery, errorMes } from './components/services/toaster';
import requestPictures from './components/services/requestPictures';
// import css from './App.module.css';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import SearchBar from './components/SearchBar/SearchBar';
import { IData, IModal, IPicture } from './App.types';

Modal.setAppElement('#root');

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pictures, setPictures] = useState<IPicture[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<IModal | null>(null);

  useEffect(() => {
    if (!searchQuery) {
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

        const data: IData = await requestPictures(searchQuery, page);
        console.log(data);

        if (data.total === 0) {
          noquery();
          return;
        }

        if (data.total_pages > page) {
          setLoadMore(true);
        }

        setPictures(prevState => prevState.concat(data.results));
        // setPictures(prevState => [...prevState, ...data.results]);
      } catch (err) {
        setIsError(true);
        errorMes();
      } finally {
        setIsLoading(false);
      }
    }

    fetchPicturesByQuery();
  }, [searchQuery, page]);

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (image: IModal) => {
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
      <ImageGallery pictures={pictures} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {loadMore && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      {isModalOpen && selectedImage && (
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

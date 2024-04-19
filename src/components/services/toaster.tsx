import toast from 'react-hot-toast';

const notify = () =>
  toast('Please, input query!', {
    duration: 3000,
    icon: '🥺',
  });

const noquery = () =>
  toast(
    'Sorry, there are no images matching your search query. Please try again!',
    {
      duration: 3000,
      icon: '🥺',
    }
  );

const errorMes = () => {
  toast('An error occurred while fetching images. Please try again later.', {
    duration: 3000,
    icon: '🥺',
  });
};

export { notify, noquery, errorMes };

import { MagnifyingGlass } from 'react-loader-spinner';

// import css from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#d5ebf7"
      color="#4bb5f2"
    />
  );
};

export default Loader;

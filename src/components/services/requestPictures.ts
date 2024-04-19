import axios, { AxiosResponse } from 'axios';
import { IData } from '../../App.types';

const ACCESS_KEY: string = 'ND8oz0aY_3XkRT-fyTvYL4F-lbiSjPoBeEjnx7f7xh4';

// https://api.unsplash.com/search/photos/?client_id=ND8oz0aY_3XkRT-fyTvYL4F-lbiSjPoBeEjnx7f7xh4?query=car&page=1

const requestPictures = async (query: string, page: number): Promise<IData> => {
  const { data }: AxiosResponse<IData> = await axios.get(
    `https://api.unsplash.com/search/photos?page=${page}&query=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );
  return data;
};

export default requestPictures;

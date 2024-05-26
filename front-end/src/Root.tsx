import { retrieveLaunchParams } from '@tma.js/sdk-react';
import axios from 'axios';
import { type FC } from 'react';

const Root: FC = () => {
  const tg = window?.Telegram?.WebApp;
  console.log('tg', tg);

  const getNewData = () => {
    const baseURL = `http://localhost:3015/api/refresh`;

    const { initDataRaw } = retrieveLaunchParams();
    const body = {};
    const headers = {
      headers: {
        Authorization: `tma ${initDataRaw}`,
      },
    };
    return axios.post(baseURL, body, headers);
  };

  const handleClickBtn = async () => {
    console.log('button clicked...')
    const response = await getNewData();
    console.log('server responded with: ', response);
  };

  return (
    <>
      <button onClick={handleClickBtn}>
        POST request sender
      </button>
    </>
  )
};

export default Root;

import { retrieveLaunchParams } from '@tma.js/sdk-react';
import axios from 'axios';
import { type FC, useState } from 'react';

const Root: FC = () => {
  const [serverResponse, setServerResponse] = useState<string | null>(null);

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
    console.log('button clicked...');
    try {
      const response = await getNewData();
      console.log('server responded with: ', response.data);
      setServerResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error fetching data:', error);
      setServerResponse('Error fetching data');
    }
  };

  return (
    <>
      <button onClick={handleClickBtn}>
        POST request sender
      </button>
      {serverResponse && (
        <pre>{serverResponse}</pre>
      )}
    </>
  );
};

export default Root;

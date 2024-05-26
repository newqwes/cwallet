import { retrieveLaunchParams } from '@tma.js/sdk-react';
import axios from 'axios';
import { type FC, useState } from 'react';

// @ts-ignore
axios.interceptors.request.use((config) => ({
  ...config,
  baseURL: `api/`,
  withCredentials: true,
  headers: { Authorization: `tma ${retrieveLaunchParams().initDataRaw}`}
}));


const getNewData = async () => {
  try {
    return await axios.post('refresh');
  } catch (err) {
    console.error('Error retrieving launch parameters:', err);
    throw err;
  }
};

const Root: FC = () => {
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tg = window?.Telegram?.WebApp;
  console.log('tg', tg);

  const handleClickBtn = async () => {
    console.log('button clicked...');
    try {
      const response = await getNewData();
      console.log('server responded with: ', response.data);
      setServerResponse(JSON.stringify(response.data, null, 2));
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setServerResponse(null);
      setError('Error fetching data');
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
      {error && (
        <pre>{error}</pre>
      )}
    </>
  );
};

export default Root;

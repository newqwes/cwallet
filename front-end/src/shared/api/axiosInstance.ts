import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk-react';

const baseURL = `${import.meta.env.VITE_REACT_APP_API_URL || ''}/api/`;

export let token: string;

export const getAxiosInstance = () => {
  try {
    token = retrieveLaunchParams().initDataRaw || '';
    return axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    return axios.create({ baseURL });
  }
}

export const axiosInstance = getAxiosInstance();

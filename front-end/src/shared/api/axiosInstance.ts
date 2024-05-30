import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk-react';

const baseURL = `${import.meta.env.VITE_REACT_APP_API_URL || ''}/api/`;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${retrieveLaunchParams().initDataRaw}`,
  },
});

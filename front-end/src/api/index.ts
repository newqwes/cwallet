import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk-react';

const baseURL = `${import.meta.env.VITE_REACT_APP_API_URL || ''}api/`;

// @ts-ignore
axios.interceptors.request.use((config) => ({
  ...config,
  baseURL,
  withCredentials: true,
  headers: { Authorization: `Bearer ${retrieveLaunchParams().initDataRaw}`}
}));

export const refreshAPI = {
  refresh: async (): Promise<string> => {
      const { data } = await axios.post('refresh');
      return data;
  },
};

export const userAPI = {
  getUserData: async (): Promise<{ user: any, created: boolean }> => {
    const { data } = await axios.get('user');
    return data;
  },
};

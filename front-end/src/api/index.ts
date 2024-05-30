import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk-react';

const baseURL = `${import.meta.env.VITE_REACT_APP_API_URL || ''}api/`;

// @ts-ignore
axios.interceptors.request.use((config) => ({
  ...config,
  baseURL,
  withCredentials: true,
  headers: { Authorization: `Bearer ${retrieveLaunchParams().initDataRaw}` }
}));

export const claimAPI = {
  claimCoins: async (): Promise<{ claimedCoins: number, nextDate: string }> => {
    const { data } = await axios.post('claim');
    return data;
  },
};

export const userAPI = {
  getUser: async (): Promise<{ user: any, created: boolean }> => {
    const { data } = await axios.get('user');
    return data;
  },
};

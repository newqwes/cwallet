import { axiosInstance } from '../../../shared/api';

/**
 * @returns {user}
 * @see {@link ./back-end/src/dto/userDto.ts} Types for user
 */
export const userAPI = {
  getUser: async (): Promise<{ user: any, created: boolean }> => {
    const { data } = await axiosInstance.get('user');
    return data;
  },

  claimCoins: async (): Promise<{ coins: number, nextClaimDate: string }> => {
    const { data } = await axiosInstance.post('claim');
    return data;
  },

  levels: async (): Promise<any> => {
    const { data } = await axiosInstance.get('user/levels');
    return data;
  },

  upgradeLevel: async ({ level_name }: { level_name: string }): Promise<any> => {
    const { data } = await axiosInstance.put('user/upgrade', { level_name });
    return data;
  }
};

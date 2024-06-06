import { axiosInstance } from "../../../shared/api";

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
};

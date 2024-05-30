import { axiosInstance } from "../../../shared/api";

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

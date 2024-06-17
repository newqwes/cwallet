import { axiosInstance } from "../../../shared/api";

/**
 * @returns {user}
 * @see {@link ./back-end/src/dto/userDto.ts} Types for user
 */
export const referralsAPI = {
  getReferrals: async (): Promise<any[]> => {
    const { data } = await axiosInstance.get('referral');
    return data;
  },
};

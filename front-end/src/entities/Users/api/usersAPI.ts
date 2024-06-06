import { axiosInstance } from "../../../shared/api";

/**
 * @returns {user}
 * @see {@link ./back-end/src/dto/userDto.ts} Types for user
 */
export const usersAPI = {
  getUsers: async (): Promise<any[]> => {
    const { data } = await axiosInstance.get('users');
    console.log(data);
    return data;
  },
};

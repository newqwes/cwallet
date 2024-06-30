import { axiosInstance } from '../../../shared/api';

const cacheDuration = 5 * 60 * 1000;

/**
 * @returns {user}
 * @see {@link ./back-end/src/dto/userDto.ts} Types for user
 */
export const usersAPI = {
  getUsers: async (): Promise<any[]> => {
    const cachedData = localStorage.getItem('usersCache');
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (timestamp + cacheDuration > Date.now()) {
        return data;
      }
    }

    const response = await axiosInstance.get('users');
    localStorage.setItem('usersCache', JSON.stringify({ data: response.data, timestamp: Date.now() }));
    return response.data;
  },
};

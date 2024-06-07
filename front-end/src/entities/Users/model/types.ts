import { IUser } from '../../../shared/types';

export interface IUsersState {
  /**
   * @see {@link ./back-end/src/dto/userDto.ts} Types for user
   */
  data: IUser[];
  error: string;
  loading: boolean;
};

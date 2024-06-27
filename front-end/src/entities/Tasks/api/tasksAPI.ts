import { axiosInstance } from '../../../shared/api';
import { ITask } from '../type/response.type.ts';
import { IUser } from '../../../shared/types';

export const tasksAPI = {
  getTasks: async (): Promise<ITask[]> => {
    const { data } = await axiosInstance.get('tasks');
    return data;
  },
  setTask: async ({ task_name }: { task_name: string }): Promise<IUser> => {
    const { data } = await axiosInstance.post('tasks/set_task', { task_name });
    return data;
  },
};

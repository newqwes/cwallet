import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../type/response.type.ts';

interface ITasksState {
  tasks: ITask[];
  error: string;
  loading: boolean;
}

const initialState: ITasksState = {
  tasks: [],
  error: '',
  loading: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasks: (state) => {
      state.loading = true;
    },
    // @ts-ignore
    selectTask: (state, { payload }: PayloadAction<string>) => {
      state.loading = true;
    },
    fetchTasksSuccess: (state, action: PayloadAction<ITask[]>) => {
      state.loading = false;
      state.error = '';
      state.tasks = action.payload;
    },
    selectTaskSuccess: (state) => {
      state.loading = false;
      state.error = '';
    },
    fetchTasksError: (state, action: PayloadAction<any>) => {
      state = initialState;
      state.error = action.payload;
    },
    selectTaskError: (state, action: PayloadAction<any>) => {
      state = initialState;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTasks,
  fetchTasksError,
  fetchTasksSuccess,
  selectTask,
  selectTaskSuccess,
  selectTaskError,
} = tasksSlice.actions;

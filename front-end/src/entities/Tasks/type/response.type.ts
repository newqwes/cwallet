export type ITaskNames =
  'subscribe_to_channel'
  | 'subscribe_to_chat'
  | 'subscribe_to_x'
  | 'invite_friend'
  | 'invite_three_friends'
  | 'accumulate_30000_coins';

export interface ITask {
  id: number;
  task_name: ITaskNames;
  reward: number;
  link: string;
  text: string;
  is_claimed: boolean | null; // null - not do the task at all, false - do task but not claimed
}

export const TASK_NAMES = {
  'invite_friend': 'invite_friend',
  'subscribe_to_channel': 'subscribe_to_channel',
  'subscribe_to_chat': 'subscribe_to_chat',
  'subscribe_to_x': 'subscribe_to_x',
  'invite_three_friends': 'invite_three_friends',
  'accumulate_30000_coins': 'accumulate_30000_coins',
};

export const NOT_VERIFY_TASK_NAMES: ITaskNames[] = ['invite_friend', 'invite_three_friends', 'accumulate_30000_coins'];

import dotenv from 'dotenv';

dotenv.config();

export const START_SHORT_GAME_PERIOD = process.env.START_SHORT_GAME_PERIOD || '0,8,16';
export const PROGRESS_SHORT_GAME_PERIOD = process.env.PROGRESS_SHORT_GAME_PERIOD || '4,12,20';

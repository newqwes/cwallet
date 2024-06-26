import TelegramAPI from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

export const MyBot = new TelegramAPI(process.env.BOT_CHAT_TOKEN || '', { polling: true });

import TelegramAPI from 'node-telegram-bot-api';
import { MESSAGE_OPTIONS } from '../constants/telegram';

const MyBot = new TelegramAPI(process.env.BOT_CHAT_TOKEN, { polling: true });

const runTelegramBotService = async () => {
  MyBot.on(
    'message',
    async ({
      text,
      chat: { id, first_name: firstName },
      from: { id: telegramUserId },
    }) => {
      try {
        if (text === '/start') {
          return MyBot.sendMessage(
            id,
            `${firstName}, Welcome to start Cwallet!`,
            MESSAGE_OPTIONS
          );
        }
      } catch (error) {
        return MyBot.sendMessage(
          id,
          'Try again',
          MESSAGE_OPTIONS
        );
      }
    }
  );
};

export default runTelegramBotService;

import TelegramAPI from 'node-telegram-bot-api';
import { getMessageOptions } from '../constants/telegram';

const MyBot = new TelegramAPI(process.env.BOT_CHAT_TOKEN || '', {polling: true});

const runTelegramBotService = async () => {
  MyBot.on('message', async (msg) => {
    const {text, chat: {id, first_name: firstName}} = msg;
    try {
      if (text && text.startsWith('/start')) {
        const startParam = text.split(' ')[1];
        if (startParam && startParam.startsWith('ref_')) {
          const refCode = startParam.split('_')[1];
          return MyBot.sendMessage(id, `${firstName}, welcome to Cwallet app 👛. You were invited by referral code: ${refCode}`, getMessageOptions(refCode) as any);
        } else {
          return MyBot.sendMessage(id, `${firstName}, welcome to Cwallet app 👛`, getMessageOptions() as any);
        }
      }
    } catch (error) {
      return MyBot.sendMessage(id, 'Try again', getMessageOptions() as any);
    }
  });
};

export default runTelegramBotService;

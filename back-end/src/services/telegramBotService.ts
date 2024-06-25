import TelegramAPI from 'node-telegram-bot-api';
import { getMessageOptions, RUN_APP } from '../constants/telegram';
import UserService from './userService';
import { isValidReferralCode } from '../utils/referral';
import TelegramSetting from '../database/models/telegramSetting';

const MyBot = new TelegramAPI(process.env.BOT_CHAT_TOKEN || '', { polling: true });
const reply_markup = getMessageOptions().reply_markup;

export const runTelegramBotService = async () => {
  MyBot.on('message', async (msg) => {
    const { from, text, chat: { id, first_name: firstName, last_name: lastName } } = msg;
    try {
      const data = await TelegramSetting.findOne({ where: { id: 1 } });
      if (!data.is_started) {
        await runTelegramNotificationBotService(data, id);
        data.is_started = true;
        await data.save();
      }
      const photo = data.img;
      let caption = `${firstName}, ${data.text}`;

      if (from.is_bot) {
        return;
      }

      if (text === RUN_APP) {
        return MyBot.sendPhoto(id, photo, { reply_markup, caption });
      }

      if (text && text.startsWith('/start')) {
        const startParam = text.split(' ')[1];
        if (startParam && startParam.startsWith('ref_')) {
          const referralCode = startParam.split('_')[1];

          if (!isValidReferralCode(referralCode)) {
            caption = `Not valid ref code, but ` + caption;
            return MyBot.sendPhoto(id, photo, { reply_markup, caption });
          }

          const parent = await UserService.findOne({ referralCode });
          if (!parent) {
            return MyBot.sendPhoto(id, photo, { reply_markup, caption });
          }

          const alreadyExistUser = await UserService.findByTelegramUserId(id);
          if (alreadyExistUser) {

            caption = caption + `It's good to see ${firstName} again!`;
            return MyBot.sendPhoto(id, photo, { reply_markup, caption });
          }

          await UserService.create({
            telegramId: id,
            refParent: parent.telegramId,
            firstName,
            lastName,
            refGrandParent: parent.refParent,
            languageCode: from.language_code
          });
          caption = caption + ` You were invited by referral code: ${referralCode}`;
          return MyBot.sendPhoto(id, photo, { reply_markup, caption });
        } else {

          return MyBot.sendPhoto(id, photo, { reply_markup, caption });
        }
      }
    } catch (error) {
      return MyBot.sendMessage(id, 'Try again', getMessageOptions() as any);
    }
  });
};

const runTelegramNotificationBotService = async (data: TelegramSetting, currentId: number) => {
  const users = await UserService.findAll();

  for (const user of users) {
    try {
      if (user.telegramId === currentId) {
        continue;
      }
      await MyBot.sendPhoto(user.telegramId, data.img, {
        reply_markup,
        caption: data.text
      });
    } catch (error) {
      console.log('User cannot send message to user: ', user.telegramId);
    }
  }
};


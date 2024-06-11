import TelegramAPI from 'node-telegram-bot-api';
import { getMessageOptions } from '../constants/telegram';
import userService from "./userService";
import UserService from "./userService";
import { isValidReferralCode } from "../utils/referral";

const MyBot = new TelegramAPI(process.env.BOT_CHAT_TOKEN || '', {polling: true});

const runTelegramBotService = async () => {
  MyBot.on('message', async (msg) => {
    const {from, text, chat: {id, first_name: firstName, last_name: lastName}} = msg;
    try {
      if (from.is_bot) {
        return;
      }

      if (text && text.startsWith('/start')) {
        const startParam = text.split(' ')[1];
        if (startParam && startParam.startsWith('ref_')) {
          const referralCode = startParam.split('_')[1];

          if (!isValidReferralCode(referralCode)) {
            return MyBot.sendMessage(id, `Not valid ref code, but welcome to Cwallet app 🪿`, getMessageOptions() as any);
          }

          const parent = await UserService.findOne({referralCode});
          if (!parent) {
            return MyBot.sendMessage(id, `${firstName}, welcome to Cwallet app 👛`, getMessageOptions() as any);
          }

          const alreadyExistUser = await userService.findByTelegramUserId(id);
          if (alreadyExistUser) {
            return MyBot.sendMessage(id, `It's good to see ${firstName} again! Cwallet app 🪿`, getMessageOptions() as any);
          }

          await userService.create({
            telegramId: id,
            refParent: parent.telegramId,
            firstName,
            lastName,
            refGrandParent: parent.refParent,
            languageCode: from.language_code
          });
          return MyBot.sendMessage(id, `${firstName}, welcome to Cwallet app 👛. You were invited by referral code: ${referralCode}`, getMessageOptions(referralCode) as any);
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

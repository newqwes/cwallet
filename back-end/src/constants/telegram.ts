import { WEB_APP_URL } from "./index";

export const RUN_APP = 'Run 🪿';

console.log('--QWES-- WEB_APP_URL: ', WEB_APP_URL);
export const getMessageOptions = (refCode?: string) => ({
  parse_mode: 'markdown',
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [{text: RUN_APP, web_app: {url: WEB_APP_URL + (refCode ? `?refCode=${refCode}` : '')}}]
    ]
  },
});

export const TELEGRAM_MESSAGE_MAX_LIMIT = 4096;

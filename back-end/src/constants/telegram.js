import { WEB_APP_URL } from "./index";

export const RUN_APP = 'Run 🪿💨';

export const MESSAGE_OPTIONS = {
  parse_mode: 'markdown',
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
        [{text: RUN_APP, web_app: { url: WEB_APP_URL }}]
    ]
  },
};

export const TELEGRAM_MESSAGE_MAX_LIMIT = 4096;

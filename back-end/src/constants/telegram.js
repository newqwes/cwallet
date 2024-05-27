export const RUN_APP = 'Run 🪿';

export const MESSAGE_OPTIONS = {
  parse_mode: 'markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [RUN_APP],
    ],
    inline_keyboard: [
        [{text: RUN_APP, web_app: { url: process.env.CLIENT_URL }}]
    ]
  },
};

export const TELEGRAM_MESSAGE_MAX_LIMIT = 4096;

export const RUN_APP = 'Run';

export const MESSAGE_OPTIONS = {
  parse_mode: 'markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [RUN_APP],
    ],
  },
};

export const TELEGRAM_MESSAGE_MAX_LIMIT = 4096;

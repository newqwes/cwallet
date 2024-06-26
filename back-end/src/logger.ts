import winston from 'winston';
import Transport from 'winston-transport';
import { MyBot } from './telegram_conf';
import dotenv from 'dotenv';

dotenv.config();
export const TELEGRAM_LOGGER_KEY = 'telegram_logger';

class TelegramTransport extends Transport {
  bot = MyBot;
  chatId = process.env.LOGGER_TELEGRAM_CHAT_ID;

  log(info: any, callback: any) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    if (this.chatId && (info.message.includes(TELEGRAM_LOGGER_KEY) || info.level === 'error')) {
      const cleanMessage = info.message.replace(TELEGRAM_LOGGER_KEY, '').trim();
      const message = `${info.level}: ${cleanMessage}`;
      this.bot.sendMessage(this.chatId, message)
        .then(() => callback(null, true))
        .catch(error => {
          console.error('Telegram Logger Error:', error);
          callback(error);
        });
    } else {
      callback(null, true);
    }
  }
}

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => {
      return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/combined.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.Console(),
    new TelegramTransport()
  ]
});

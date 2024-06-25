import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cron from 'node-cron';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { swaggerDocs } from './swagger';
import { app, connectNotificationToDatabase, server } from './config';
import { getHistoricalChart } from './get_coin_info';
import {
  startEndShortGame,
  progressShortGame,
  checkProgressShortGame
} from './short_game';
import sequelize from './database';
import { errorMiddleware, limiter, cors } from './middleware';
import { runTelegramBotService } from './services/telegramBotService';
import apiRoutes from './routes';
import {
  PROGRESS_SHORT_GAME_PERIOD,
  START_SHORT_GAME_PERIOD
} from './constants/periodTime';
import { logger } from './logger';

dotenv.config();

app.set('trust proxy', 1);
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
morgan.token('message', function (req, res) {
  // @ts-ignore
  return res.locals.errorMessage || '';
});

const morganFormat = '[:date[iso]] ":method :url" :status - :response-time ms - :message';

app.use(morgan(morganFormat, {
  stream: {
    write: (message) => {
      const [_, url, status, responseTime] = message.match(/\[.*\] "(.*)" (\d{3}) - (\d+.\d+) ms -/);
      const logMessage = `${url} ${status} ${responseTime}ms`;
      logger.debug(logMessage);
    }
  }
}));
app.use(helmet());
app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

app.use('/api', apiRoutes);

app.use(errorMiddleware);

swaggerDocs(app, process.env.SERVER_PORT);
const start = async () => {
  try {
    server.listen(process.env.SERVER_PORT, async () => {
      logger.info(`HOST_NAME ${process.env.HOST_NAME}`);
      logger.info(`CLIENT_URL ${process.env.CLIENT_URL}`);
      logger.info(`CLIENT_URL_VISUAL ${process.env.CLIENT_URL_VISUAL}`);
      logger.info(`Server is listening on port ${process.env.SERVER_PORT}...`);
      await sequelize.authenticate();
      await connectNotificationToDatabase();
      logger.info('Database Connected!');

      cron.schedule(`0 ${START_SHORT_GAME_PERIOD} * * *`, startEndShortGame);
      cron.schedule(`0 ${PROGRESS_SHORT_GAME_PERIOD} * * *`, progressShortGame);

      // check progress Short game, every hour
      cron.schedule('35 * * * *', checkProgressShortGame);

      //Обновляем информацию по графикам, раз в день
      cron.schedule('25 0 * * *', getHistoricalChart);
    });

    await runTelegramBotService();
  } catch (e) {
    logger.error(JSON.stringify(e));
  }
};

start();

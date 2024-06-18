import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cron from 'node-cron';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { swaggerDocs } from './swagger';
import { app, connectNotificationToDatabase, server } from './config';
import { getCoinsInfo, getHistoricalChart } from './get_coin_info';
import { shortGame } from './short_game';
import sequelize from './database';
import cors from './middleware/cors';
import limiter from './middleware/limiter';
import errorMiddleware from './middleware/errorMiddleware';
import runTelegramBotService from './services/telegramBotService';
import claimRoute from './routes/claimRoute';
import userRoute from './routes/userRoute';
import usersRoute from './routes/usersRoute';
import referralRoute from './routes/referralRoute';
import longGameRoute from './routes/longGameRoute';
import shortGameRoute from './routes/shortGameRoute';
import coinListRoute from './routes/coinListRoute';

dotenv.config();

app.set('trust proxy', 1);
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

app.use('/api/claim', claimRoute);
app.use('/api/user', userRoute);
app.use('/api/users', usersRoute);
app.use('/api/referral', referralRoute);
app.use('/api/long_game', longGameRoute);
app.use('/api/short_game', shortGameRoute);

// coinListRoute - получаем инфу по монете. Забивая в url, ее id.
// Может пригодиться позже, пока не удаляйте
app.use('/api/coin_list', coinListRoute);

app.use(errorMiddleware);

swaggerDocs(app, process.env.SERVER_PORT);
const start = async () => {
  try {
    server.listen(process.env.SERVER_PORT, async () => {
      console.log(`HOST_NAME ${process.env.HOST_NAME}`);
      console.log(`CLIENT_URL ${process.env.CLIENT_URL}`);
      console.log(`CLIENT_URL_VISUAL ${process.env.CLIENT_URL_VISUAL}`);
      console.log(`Server is listening on port ${process.env.SERVER_PORT}...`);
      await sequelize.authenticate();
      await connectNotificationToDatabase();
      console.log('Database Connected!');

      //Обновляем инфу по монетам, раз в час
      cron.schedule('23 * * * *', getCoinsInfo);
      getCoinsInfo();

      //Short game, раз в час
      cron.schedule('0 * * * *', shortGame);
      shortGame();
      //Обновляем инфу по графикам, раз в день
      cron.schedule('0 0 * * *', getHistoricalChart);
    });

    await runTelegramBotService();
  } catch (e) {
    console.log(e);
  }
};

start();

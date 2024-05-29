import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { app, connectNotificationToDatabase, server } from './config';
import sequelize from './database';
import cors from './middleware/cors';
import limiter from './middleware/limiter';
import errorMiddleware from './middleware/errorMiddleware';
import runTelegramBotService from './services/telegramBotService';
import claimRoute from './routes/claimRoute';
import userRoute from './routes/userRoute';
import { swaggerDocs } from './swagger';

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

app.use(errorMiddleware);

swaggerDocs(app, process.env.SERVER_PORT);
const start = async () => {
  try {
    server.listen(process.env.SERVER_PORT, async () => {
      console.log(`API_URL ${process.env.API_URL}`);
      console.log(`HOST_NAME ${process.env.HOST_NAME}`);
      console.log(`CLIENT_URL ${process.env.CLIENT_URL}`);
      console.log(`CLIENT_URL_VISUAL ${process.env.CLIENT_URL_VISUAL}`);
      console.log(`Server is listening on port ${process.env.SERVER_PORT}...`);
      await sequelize.authenticate();
      await connectNotificationToDatabase();
      console.log('Database Connected!');
    });

    await runTelegramBotService();
  } catch (e) {
    console.log(e);
  }
};

start();

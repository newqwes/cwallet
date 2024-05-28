import dotenv from 'dotenv';
dotenv.config();

const { APP_STATUS: appStatus, CLIENT_URL: clientUrl, CLIENT_URL_VISUAL: clientUrlVisual } = process.env;

export const TIME_FORMAT = 'DD.MM.YY HH:mm';
export const WEB_APP_URL = appStatus === 'development' ? clientUrlVisual : clientUrl;

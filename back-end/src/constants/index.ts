import dotenv from 'dotenv';
dotenv.config();

const { APP_STATUS: appStatus, CLIENT_URL: clientUrl, CLIENT_URL_VISUAL: clientUrlVisual } = process.env;

export const WEB_APP_URL = appStatus === 'development' ? clientUrlVisual : clientUrl;
export const REFERRAL_CODE_LENGTH = 6;

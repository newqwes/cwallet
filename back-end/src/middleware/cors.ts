import Cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const cors = Cors({
  credentials: true,
  origin: [process.env.CLIENT_URL, process.env.LOCAL_CLIENT_URL],
});

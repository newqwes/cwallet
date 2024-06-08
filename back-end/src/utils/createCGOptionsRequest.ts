import dotenv from 'dotenv';
dotenv.config();

export default (method: string, url: string): Object => ({
  method,
  url,
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': process.env.CG_API_KEY,
  },
});

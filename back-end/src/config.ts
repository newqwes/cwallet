import express from 'express';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { Client } from 'pg';
import Bank from './database/models/bank';
import { logger } from './logger';

export const app = express();
export const server = new Server(app);
export const io = new SocketServer(server, { cors: { origin: '*' } });

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT)
});

export const connectNotificationToDatabase = async () => {
  try {
    await client.connect();
    await client.query('LISTEN bank_update');

    client.on('notification', async (msg) => {
      if (msg.channel === 'bank_update') {
        const updatedValue = parseInt(msg.payload as string, 10);
        io.emit('bank', updatedValue);
      }
    });
    logger.info('Connected to database');
  } catch (error) {
    logger.error('Connected is failed! Error: ' + JSON.stringify(error));
  }
};

const handleClientConnection = async (socket: any) => {
  try {
    const bank = await Bank.findByPk(1);

    if (bank) {
      const { value } = bank;
      socket.emit('bank', value);
    }
  } catch (error) {
    logger.error('Error bank data: ' + JSON.stringify(error));
  }

  socket.on('disconnect', () => {
    logger.info('WebSocket disconnected: ' + JSON.stringify(socket.id));
  });
};

io.on('connection', handleClientConnection);

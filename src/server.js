import pino from 'pino-http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contact.js';
dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/', (req, res, next) => {
    res.json({
      message: 'Hello world',
    });
  });
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        data: contacts,
        message: 'Successfully found contacts!',
        status: 200,
      });
    } catch (error) {
      console.log(error.message);
      res.status(404).json({ message: 'Not found' });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    try {
      const contact = await getContactById(contactId);
      if (!contact) {
        res.status(404).json({
          message: 'Not found',
        });
      }
      res.status(200).json({
        data: contact,
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
      });
    } catch (error) {
      console.log(error.message);
      res.status(404).json({
        message: 'Not found',
      });
    }
  });
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
    next();
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

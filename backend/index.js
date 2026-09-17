import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(200).send('Welcome to the Book Store API');
});

app.use('/books', booksRoute);

export { app, mongoDBURL, mongoose };

let connectionPromise;

const connectToDatabase = () => {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongoDBURL);
  }
  return connectionPromise;
};

export default async function handler(request, response) {
  await connectToDatabase();
  return app(request, response);
}

if (!process.env.VERCEL) {
  connectToDatabase()
    .then(() => {
      console.log('App connected to database');
      app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

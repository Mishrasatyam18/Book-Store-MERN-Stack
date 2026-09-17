import { app, mongoDBURL, mongoose } from '../index.js';

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
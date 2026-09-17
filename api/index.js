import { app, mongoDBURL, mongoose } from '../backend/index.js';

let connectionPromise;

const connectToDatabase = () => {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongoDBURL);
  }
  return connectionPromise;
};

export default async function handler(request, response) {
  await connectToDatabase();
  request.url = request.url.replace(/^\/api/, '') || '/';
  return app(request, response);
}
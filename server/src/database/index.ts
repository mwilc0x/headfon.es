import mongoose from 'mongoose';

export const initDatabase = () => {
  const MONGO_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_DB_URI_PROD
    : process.env.MONGO_DB_URI_DEV;

  mongoose.connect(MONGO_URI);

  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => {
    console.log(`✅   MongoDB connection established!`);
  });
}

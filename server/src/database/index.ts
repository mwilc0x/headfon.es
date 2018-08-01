import mongoose from 'mongoose';

export const initDatabase = () => {
  mongoose.connect(process.env.MONGO_DB_URI);

  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => {
    console.log(`✅   MongoDB connection established! ${process.env.MONGO_DB_URI}`);
  });
}

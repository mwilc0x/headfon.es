import mongoose from 'mongoose';
import { userSchema } from '../schema';

const User = new mongoose.model('User', userSchema);

export default User;

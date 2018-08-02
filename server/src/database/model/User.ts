import mongoose from 'mongoose';
import { userSchema } from '../schema';

const User = mongoose.model('User', userSchema);

export default User;

import mongoose from 'mongoose';
import { userSchema } from '../schema';

const User: any = mongoose.model('User', userSchema);

export default User;

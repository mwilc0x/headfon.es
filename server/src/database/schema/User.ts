import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: String,
  accessToken: String,
  refreshToken: String,
  timeExpires: Date
});

userSchema.methods.me = function() {
  console.log(`User ${this.id}`);
}

userSchema.methods.getUser = async function() {
  try {
    const user = await this.model('User').findOne({ id: this.id });
    return user;
  } catch (e) {
    console.error(e.message);
  }
}

userSchema.methods.handleLogin = async function() {
  try {
    const query = { id: this.id };
    const { accessToken, refreshToken, timeExpires } = this;
    const user = await this.model('User').findOneAndUpdate(
      query, 
      { $set: { 
        accessToken, 
        refreshToken, 
        timeExpires
      }}, 
      { new: true, upsert: true }
    );
    return user;
  } catch (e) {
    console.error(e.message);
  }
}

userSchema.methods.updateAccessToken = async function() {
  try {
    const query = { id: this.id };
    const { accessToken, timeExpires } = this;
    const user = await this.model('User').findOneAndUpdate(
      query, 
      { $set: { accessToken, timeExpires }}, 
      { new: true, upsert: true }
    );
    return user;
  } catch (e) {
    console.error(e.message);
  }
}

export default userSchema;

import generateJwt from '../services/jwt/generateToken';
import { getUserDetailsForToken } from '../services/spotify/api';
import { User } from '../database/model';

export default async (req, res) => {
  try {
    const userDetails = getUserDetailsForToken(req.user);
    const token = generateJwt({ id: userDetails.id });
  
    const userForSave = new User(userDetails);
    await userForSave.handleLogin();

    res.cookie('jwt', `${token}`);

    const redirectTo = process.env.NODE_ENV === 'production'
      ? '/'
      : 'http://localhost:3000/';

    res.redirect(redirectTo);
  } catch (e) {
    console.error(e.message);
  }
};

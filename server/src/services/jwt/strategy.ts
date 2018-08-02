import { Strategy } from 'passport-jwt';
import { User } from '../../database/model';

const cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
  issuer: 'spotify-app-dev',
  audience: 'spotify-app-user'
};

export default new Strategy(options,
async (user, next) => {
  const userLookup = new User(user);
  const savedUser = await userLookup.getUser();

  if (!!savedUser) {
    next(null, savedUser);
  } else {
    next(null, false);
  }
});

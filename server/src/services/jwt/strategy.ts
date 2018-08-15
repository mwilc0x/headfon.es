import { Strategy } from 'passport-jwt';
import refresh from 'passport-oauth2-refresh';
import { User } from '../../database/model';
import { getTimeExpires, getMinutesUntilExpiration } from '../time';

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
  try {
    const userLookup = new User(user);
    const savedUser = await userLookup.getUser();

    const minutesUntilExpiration = getMinutesUntilExpiration(savedUser.timeExpires);

    if (minutesUntilExpiration < 0) {
      refresh.requestNewAccessToken('spotify', savedUser.refreshToken, async (err, accessToken, refreshToken) => {
        if (err) {
          console.error(err);
        }
    
        try {
          const timeExpires = getTimeExpires();
          const { id } = savedUser;
          const userForSave = new User({ id, accessToken, timeExpires });
          const updatedUser = await userForSave.updateAccessToken();
          
          next(null, updatedUser);
        } catch (e) {
          console.error(e);
        }
      });
    } else {
      next(null, savedUser);
    }
  } catch (e) {
    console.error(e.message);
  }
});

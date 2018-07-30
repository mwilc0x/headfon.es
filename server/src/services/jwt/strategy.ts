import { Strategy } from 'passport-jwt';

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
(user, next) => {
  // TODO: think about a database access
  if (!!user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

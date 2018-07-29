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
(jwt_payload, next) => {
  console.log('JWT Payload Received:', jwt_payload);
  // usually this would be a database call:
  // var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (true) {
    next(null, {});
  } else {
    next(null, false);
  }
});

const SpotifyStrategy: any = require('passport-spotify').Strategy;

export default new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `${process.env.SPOTIFY_REDIRECT}`,
    passReqToCallback: true,
    proxy: true
  },
  (request, accessToken, refreshToken, expires_in,  profile, done) => {
    process.nextTick(() => {
      done(null, Object.assign({}, profile, { accessToken, refreshToken, expires_in }));
    });
  }
);

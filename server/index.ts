require('dotenv').config();

import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import scope from './scope.json';

const SpotifyStrategy: any = require('passport-spotify').Strategy;

const PORT = process.env.PORT;

let spotifyStrategy = new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_REDIRECT,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      done(null, Object.assign({}, profile, { accessToken }));
    });
  }
 );

passport.use(spotifyStrategy);

function userSerializer(user, done) {
  done(null, user);
}
passport.serializeUser(userSerializer);
passport.deserializeUser(userSerializer);

const app = express();
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

const { SCOPE_LABELS, SCOPE_VALUES } = scope;

// AUTH
app.get('/auth/',
  (req: express.Request, res: express.Response) => {
    res.send('<div>auth</div>');
  }
);

app.get('/auth/connect',
  (req: express.Request, res: express.Response, next) => {
    req.session.spotifyScopes = req.query.scopes ? Object.keys(req.query.scopes) : SCOPE_VALUES;
    return passport.authenticate('spotify', {
      scope: req.session.spotifyScopes
    })(req, res, next);
  },
  (req: express.Request, res: express.Response) => {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

app.get('/auth/callback',
  passport.authenticate('spotify'),
  (req: express.Request, res: express.Response) => {
    res.redirect('/app');
  }
);

app.get('/auth/logout', (req: express.Request, res: express.Response) => {
  req.logout();
  res.redirect('/');
});

app.get('/',
  (req: express.Request, res: express.Response) => {
    res.send('<a href="/auth/connect">connect to spotify</a>');
  }
);

app.get('/app',
  (req: express.Request, res: express.Response, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  },
  (req: express.Request, res: express.Response) => {
    res.send(`<div>${JSON.stringify(req.user)}</div>`);
  }
);

console.log(`Server listening on port ${PORT}`);
app.listen(PORT);

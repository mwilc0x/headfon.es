require('dotenv').config({ path: require('find-config')('.env') });

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import memorystore from 'memorystore';
import passport from 'passport';
import routes from './routes';
import middleware from './middleware';
import debug from './services/debug';
import { PORT } from './config';
import spotifyStrategy from './services/spotify/strategy';

passport.use(spotifyStrategy);

function userSerializer(user, done) {
  done(null, user);
}
passport.serializeUser(userSerializer);
passport.deserializeUser(userSerializer);

const app = express();
app.use(cookieParser());
app.use(bodyParser());

const MemoryStore = memorystore(session);
app.use(session({
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: process.env.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

// debugging
debug(app);

app.get('/auth/connect', middleware.spotify.redirect, () => {});
app.get('/auth/callback', middleware.spotify.base, routes.spotify.callback);
app.get('/logout', routes.logout);
app.get('/app', middleware.auth, routes.app);
app.get('/user', middleware.auth, routes.user);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../', 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../../', 'client/build') });
  });
}

console.log(`Server listening on port ${PORT}`);
app.listen(PORT);

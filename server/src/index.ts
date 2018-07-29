import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import memorystore from 'memorystore';
import passport from 'passport';
import refresh from 'passport-oauth2-refresh';
import { formatError } from 'apollo-errors';

import routes from './routes';
import middleware from './middleware';

import jwtStrategy from './services/jwt/strategy';
import spotifyStrategy from './services/spotify/strategy';
import generateJwt from './services/jwt/generateToken';

import debug from './services/debug';

import { PORT } from './config';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (req) => {
    const { user } = req.request;
    return { user };
  },
});

// Generate the Token for the user authenticated in the request
// export default function generateUserToken(req, res) {
//   const accessToken = token.generateAccessToken(req.user.id);
//   res.render('authenticated.html', {
//       token: accessToken
//   });
// }

passport.use(spotifyStrategy);
refresh.use(spotifyStrategy);
passport.use('jwt', jwtStrategy);

// function userSerializer(user, done) {
//   done(null, user);
// }
// passport.serializeUser(userSerializer);
// passport.deserializeUser(userSerializer);

server.use(cookieParser());
server.use(bodyParser());

// const MemoryStore = memorystore(session);
// server.use(session({
//   store: new MemoryStore({
//     checkPeriod: 86400000 // prune expired entries every 24h
//   }),
//   secret: process.env.SESSION_SECRET
// }));

server.use(passport.initialize());
// server.use(passport.session());

debug(server);

server.use('/auth/connect', middleware.spotify.redirect, () => {});
server.use('/auth/callback', middleware.spotify.base, routes.login);
server.use('/logout', routes.logout);
server.use('/app', middleware.auth, routes.app);
server.use('/user', passport.authenticate(['jwt'], { session: false }), routes.user);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  server.use(express.static(path.join(__dirname, '../../', 'client/build')));
  // Handle React routing, return all requests to React app
  server.get(/^\/(?!playground).*/, (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../', 'client/build') });
  });
}

const options = {
  endpoint: '/graphql',
  port: PORT,
  playground: '/playground',
  formatError
};

server.start(options, () => console.log(`Server is running on http://localhost:${PORT}`));

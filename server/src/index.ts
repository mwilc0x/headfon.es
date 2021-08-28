require('dotenv').config();

import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import refresh from 'passport-oauth2-refresh';
import { formatError } from 'apollo-errors';

import { initDatabase } from './database';

import routes from './routes';
import middleware from './middleware';

import jwtStrategy from './services/jwt/strategy';
import spotifyStrategy from './services/spotify/strategy';

import debug from './services/debug';

import { PORT } from './config';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (req, res) => {
    const { response } = req;
    const { user } = req.request;
    return { response, user };
  }
});

initDatabase();

passport.use(spotifyStrategy);
refresh.use(spotifyStrategy);
passport.use('jwt', jwtStrategy);

server.use(cookieParser());
server.use(bodyParser());
server.use(passport.initialize());

debug(server);

server.use('/auth/connect', middleware.spotify.redirect, () => {});
server.use('/auth/callback', middleware.spotify.base, routes.login);
server.use('/loginfailure', routes.loginFailure);
server.use('/logout', routes.logout);
server.use('/app', middleware.auth, routes.app);
server.use('/user', passport.authenticate(['jwt'], { session: false }), routes.user);
server.use('/token', passport.authenticate(['jwt'], { session: false }), routes.token);

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

server.express.use(cookieParser());
server.express.use(passport.initialize());
server.express.post('/graphql', passport.authenticate(['jwt'], { session: false }));

server.start(options, () => console.log(`Server is running on http://localhost:${PORT}`));

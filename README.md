<p align="center">
<a href="https://headfon.es" target="_blank">
<img alt="headfon.es" title="headfon.es" src="logo.png" width="200">
</a>
</p>

Hello! 👋 This is an example of a client-server JavaScript application.

The case study for this is using the Spotify API as a base service.

Here is a high level view of how this is structured across the client and server:

### client

- [create-react-app](https://github.com/facebook/create-react-app) base template for the setup. Currently it is non-ejected.
- [react 16.5](https://github.com/facebook/react/releases/tag/v16.5.0)
- [@reach/router](https://github.com/reach/router) routing
- [react-copy-write](https://github.com/aweary/react-copy-write) state management
- [typescript](https://github.com/Microsoft/TypeScript) type system
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)

### server

- [Node.js](https://github.com/nodejs/node) server platform
- [GraphQL](https://github.com/graphql/graphql-js) data transport
- [Spotify API](https://developer.spotify.com/documentation/web-api/) Spotify Web API
- [typescript](https://github.com/Microsoft/TypeScript) type system
- [MongoDB](https://www.mongodb.com/) database local
- [mLab](https://mlab.com/) database cloud

#### local database

- [mongoDB](https://www.mongodb.com/)

address environment variable: `MONGO_DB_URI_DEV`

#### production database

- [mLab](https://mlab.com/) or another hosted mongo cloud solution

address environment variable: `MONGO_DB_URI_PROD`

### environment variables

```bash
DEBUG=false

PROD_HOST=http://localhost
DEV_HOST=http://localhost
PROD_PORT=3000
DEV_PORT=3004
SESSION_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXX
SPOTIFY_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXX
SPOTIFY_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SPOTIFY_REDIRECT=/auth/callback
JWT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
MONGO_DB_URI_DEV="mongodb://localhost:27017/<database-name>"
MONGO_DB_URI_PROD="mongodb://<username>:<password>@<instance>.mlab.com:13402/<database-name>"
JWT_ISSUER=spotify-app-dev
JWT_AUDIENCE=spotify-app-user
```

# deployment

This can be deployed using a service such as [now](https://zeit.co/now):

```bash
git clone https://github.com/mjw56/spotify
cd spotify
now -e SESSION_SECRET=XXXXXXXXXXX -e SPOTIFY_CLIENT_ID=XXXXXXXXXXX -e SPOTIFY_CLIENT_SECRET=XXXXXXXXXXX -e SPOTIFY_REDIRECT=/auth/callback -e JWT_SECRET=XXXXXXXXXXX -e MONGO_DB_URI_PROD=XXXXXXXXXXX -e JWT_ISSUER=XXXXXXXXXXX -e JWT_AUDIENCE=XXXXXXXXXXX
```

# writing

- [GraphQL Authentication with Passport](https://medium.com/@mjw56/graphql-authentication-with-passport-d75c08d5fbdc)

- [GraphQL Authentication using OAuth & JSON Web Tokens](https://itnext.io/graphql-authentication-using-oauth-json-web-tokens-bdb829602a5c)

- [Multi-Environment MongoDB](https://medium.com/@mjw56/mongodb-local-and-hosted-aad302eb3147)

- [Dynamic App Themes with CSS Variables and JavaScript 🎨](https://itnext.io/css-variables-dynamic-app-themes-86c0db61cbbb)

# issues

If you run into any issues, if something is not working or doesn't make sense, please don't hesitate to file an issue.

# license

MIT

```
Happy Hacking!
```

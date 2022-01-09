<p align="center">
<a href="https://headfon.es" target="_blank">
<img alt="headfon.es" title="headfon.es" src="logo.png" width="200">
</a>
</p>

# What is this?

This is an app that leverages the Spotify API for listening to music.
It has basic search functionality for albums, songs, playlists.
It's built on React, TypeScript, GraphQL and NodeJS.

# Setup

## Requirements

- [Node <= 14.17.5](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

**NOTE**

Currently this only supports up to Node v14.
I need to move away from [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar)
as it is now deprecated. This project is still using `node-sass` ~v4 and this does not support node > v14.

### Steps

0. [add environment variables](#environment-variables)
1. `mongod`
2. `yarn run install-deps`
3. `yarn run start-dev`

This will install everything and open the app in browser.
If something is broken, [please file an issue](https://github.com/michaelwilcox/headfon.es/issues/new?assignees=&labels=&template=bug_report.md) so I can fix!
Want to make this setup as painless as possible.

# Environment Variables

these can live in an `.env` file under `/server`

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
MONGO_DB_URI_PROD=""
JWT_ISSUER=spotify-app-dev
JWT_AUDIENCE=spotify-app-user
```

# Writing

- [GraphQL Authentication with Passport](https://medium.com/@mjw56/graphql-authentication-with-passport-d75c08d5fbdc)

- [GraphQL Authentication using OAuth & JSON Web Tokens](https://itnext.io/graphql-authentication-using-oauth-json-web-tokens-bdb829602a5c)

- [Multi-Environment MongoDB](https://medium.com/@mjw56/mongodb-local-and-hosted-aad302eb3147)

- [Dynamic App Themes with CSS Variables and JavaScript 🎨](https://itnext.io/css-variables-dynamic-app-themes-86c0db61cbbb)

# Issues

If you run into any issues, if something is not working or doesn't make sense, please don't hesitate to file an issue.

# License

MIT

```
Happy Hacking!
```

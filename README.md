javascript-architecture
=======================

Hello! 👋 This repo serves as an organization of some thoughts I've been having over the past
few months regarding how I would like to structure certain types of client-side JavaScript applications.

The case study for this is using the Spotify API as a base service.

Here is a high level view of how this is structured across the client and server:

### client

- [create-react-app](https://github.com/facebook/create-react-app) base template for the setup. Currently it is non-ejected.
- [@reach/router](https://github.com/reach/router) routing
- [react-copy-write](https://github.com/aweary/react-copy-write) state management
- [typescript](https://github.com/Microsoft/TypeScript) type system

### server

- [Node.js](https://github.com/nodejs/node) server platform
- [GraphQL](https://github.com/graphql/graphql-js) data transport
- [Spotify API](https://developer.spotify.com/documentation/web-api/) Spotify Web API
- [typescript](https://github.com/Microsoft/TypeScript) type system


Happy Hacking!
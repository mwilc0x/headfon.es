import api from '../api/spotify';
import { Context } from '../utils'
import refresh from 'passport-oauth2-refresh';

function handleErrors(fn) {
  return async function(...args) {
    try {
      const result = await fn(...args);
      return result;
    } catch (e) {
      if (e.status === 401) {
        console.log('caught 401 error', e);
        const { user = {} } = args[2];

        return refresh.requestNewAccessToken('spotify', user.refreshToken, (err, accessToken, refreshToken) => {
          // You have a new access token, store it in the user object,
          // or use it to make a new request.
          // `refreshToken` may or may not exist, depending on the strategy you are using.
          // You probably don't need it anyway, as according to the OAuth 2.0 spec,
          // it should be the same as the initial refresh token.
          console.log('new access token', accessToken, refreshToken);
          user.accessToken = accessToken;
          args[2] = user;
          return fn(...args);
        });
      }
    }
  }
}

async function artist(parent, { id }, ctx: Context, info) {
  const result = await api.getArtist(ctx.user.accessToken, id);
  return result;
};

async function artists(parent, { ids }, ctx: Context, info) {
  const result = await api.getArtists(ctx.user.accessToken, ids);
  return result;
};

async function album(parent, { id }, ctx: Context, info) {
  const result = await api.getAlbum(ctx.user.accessToken, id);
  return result;
};

async function albums(parent, { ids }, ctx: Context, info) {
  const result = await api.getAlbums(ctx.user.accessToken, ids);
  return result;
};

async function track(parent, { id }, ctx: Context, info) {
  const track = await api.getTrack(ctx.user.accessToken, id);
  return track;
};

function tracks(parent, { ids }, ctx: Context, info) {
  return api.getTracks(ctx.user.accessToken, ids);
};

async function recentlyPlayed(parent, {}, ctx: Context, info) {
  const { items } = await api.getRecentlyPlayed(ctx.user.accessToken);

  const recent = items.map(i => i.track);

  return recent;
};

async function search(parent, { query }, ctx: Context, info) {
  return api.search(ctx.user.accessToken, query);
}
export const Query = { 
  search: handleErrors(search)
};

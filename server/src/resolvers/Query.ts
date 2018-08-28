import api from '../api/spotify';
import { Context } from '../utils'
import refresh from 'passport-oauth2-refresh';
import generateJwt from '../services/jwt/generateToken';
import { getUserDetailsForToken } from '../services/spotify/api';
import { User } from '../database/model';

function handleErrors(fn) {
  return async function(...args) {
    try {
      const result = await fn(...args);
      return result;
    } catch (e) {
      console.error(e.message);
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

async function playlist(parent, { userId, playlistId }, ctx: Context, info) {
  const playlist = await api.getPlaylist(ctx.user.accessToken, userId, playlistId);
  return playlist;
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
  album: handleErrors(album),
  playlist: handleErrors(playlist),
  search: handleErrors(search)
};

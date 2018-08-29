import fetch from 'node-fetch';
import Dataloader from 'dataloader'

function makeHeaders(token) {
    return {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': "application/json"
    }
}

function cacheKeyFnForQueryKeys(key) {
    return serializeToURLParameters(key)
}

function serializeToURLParameters(obj) {
    return Object.entries(obj).map(([key, val]) => val && `${key}=${val}`)
        .filter((i)=> i)
        .join('&')
}

function checkResponseStatus(fn) {
  return async function(...args) {
    const result = await fn(...args);

    if (result.status === 401) {
      throw { status: 401, message: 'access token expired' };
    } else {
      return result.json();
    }
  }
}


export async function saveTracksToLib(token, trackIds) {
    const url = `https://api.spotify.com/v1/me/tracks?ids=${trackIds.toString()}`
    return await fetch(url, {
        method: 'PUT',
        headers: makeHeaders(token)
    })
}

export async function removeTracksFromLib(token, trackIds) {
    const url = `https://api.spotify.com/v1/me/tracks?ids=${trackIds.toString()}`
    return await fetch(url, {
        method: 'DELETE',
        headers: makeHeaders(token)
    })
}

export async function followPlaylist(token, { ownerId, playlistId, isPublic = true }) {
    const url = `https://api.spotify.com/v1/users/${ownerId}/playlists/${playlistId}/followers`
    return await fetch(url, {
        method: 'PUT',
        headers: makeHeaders(token),
        body: JSON.stringify({ public: isPublic })
    })
}

export async function unfollowPlaylist(token, { ownerId, playlistId }) {
    const url = `https://api.spotify.com/v1/users/${ownerId}/playlists/${playlistId}/followers`
    return await fetch(url, {
        method: 'DELETE',
        headers: makeHeaders(token)
    })
}

export async function getSavedContains(token, trackIds) {
    const url = `https://api.spotify.com/v1/me/tracks/contains?ids=${trackIds.toString()}`
    let res = await fetch(url, {
        method: 'GET',
        headers: makeHeaders(token)
    })
    res = await res.json()
    return res
}

export async function getFeaturedPlaylists(token, queryParams = {})
{
    let res = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?${serializeToURLParameters(queryParams)}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getCategoryPlaylists(token, id, queryParams = {})
{
    let res = await fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists?${serializeToURLParameters(queryParams)}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getRecommendations(token, queryParams)
{
    let res = await fetch(`https://api.spotify.com/v1/recommendations?${serializeToURLParameters(queryParams)}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getCategories(token, queryParams = {})
{
    let res = await fetch(`https://api.spotify.com/v1/browse/categories?${serializeToURLParameters(queryParams)}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getCategory(token, id)
{
    let res = await fetch(`https://api.spotify.com/v1/browse/categories/${id}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getRecentlyPlayed(token) {
    const url = "https://api.spotify.com/v1/me/player/recently-played?limit=50"
    let res = await fetch(url, {
        method: 'GET',
        headers: makeHeaders(token)
    })
    res = await res.json()
    return res
}

export async function getTopType(token, params) {
    const { type, limit, offset, time_range } = params
    let res = await fetch(`https://api.spotify.com/v1/me/top/${type}?${serializeToURLParameters({ limit, offset, time_range })}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getPlaylist(token, userId, playlistId)
{
    let res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getUser(token, userId)
{
    let res = await fetch(`https://api.spotify.com/v1/users/${userId}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getMe(token)
{
    let res = await fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getPlaylistTracks(token, { userId, playlistId, limit = 100, offset = 0 })
{
    let res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks?${serializeToURLParameters({limit, offset})}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getPlaylistFollowersContains(token, { playlistUserId, playlistId, userIds })
{
    let res = await fetch(`https://api.spotify.com/v1/users/${playlistUserId}/playlists/${playlistId}/followers/contains?ids=${userIds.toString()}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getAlbum(token, id) {
  let res = await fetch (`https://api.spotify.com/v1/albums/${id.toString()}`, {
      method: 'GET',
      headers: makeHeaders(token)
  })
  res = await res.json();
  return res;
}

export async function getAlbums(token, ids) {
    let res = await fetch (`https://api.spotify.com/v1/albums?ids=${ids.toString()}`, {
        method: 'GET',
        headers: makeHeaders(token)
    })
    res = await res.json();
    return res;
}

export async function getTrack(token, id) {
  let res = await fetch (`https://api.spotify.com/v1/tracks/${id.toString()}`, {
      method: 'GET',
      headers: makeHeaders(token)
  })
  res = await res.json();
  return res;
}

export async function getTracks(token, ids) {
    let res = await fetch (`https://api.spotify.com/v1/tracks?ids=${ids.toString()}`, {
        method: 'GET',
        headers: makeHeaders(token)
    })
    res = await res.json();
    return res;
}

export async function getArtist(token, id) {
  let res = await fetch (`https://api.spotify.com/v1/artists/${id.toString()}`, {
      method: 'GET',
      headers: makeHeaders(token)
  })
  res = await res.json();
  return res;
}

export async function getArtists(token, ids) {
    let res = await fetch (`https://api.spotify.com/v1/artists?ids=${ids.toString()}`, {
        method: 'GET',
        headers: makeHeaders(token)
    })
    res = await res.json();
    return res;
}

export async function getAudioFeatures(token, ids) {
    let res = await fetch (`https://api.spotify.com/v1/audio-features/?ids=${ids.toString()}`, {
        method: 'GET',
        headers: makeHeaders(token)
    })
    res = await res.json();
    return res;
}

export async function search(token, query = '') {
    return fetch (`https://api.spotify.com/v1/search/?q=${encodeURIComponent(query)}*&type=album,artist,playlist,track`, {
      method: 'GET',
      headers: makeHeaders(token)
    });
}

export function makeUserLoader(token) {
    const batchLoadFn = async ([key]) => {
        const userId = key
        const user = await getUser(token, userId)
        return [user]
    }
    return new Dataloader(batchLoadFn, { batch: false })
}

export function makePlaylistLoader(token) {
    const batchLoadFn = async ([key]) => {
        const { userId, playlistId } = key
        const playlist = await getPlaylist(token, userId, playlistId)
        return [playlist]
    }
    return new Dataloader(batchLoadFn, { batch: false })
}

export function makePlaylistTracksLoader(token) {
    const batchLoadFn = async ([key]) => {
        const tracks = await getPlaylistTracks(token, key)
        return [tracks]
    }
    return new Dataloader(batchLoadFn, { batch: false })
}

export function makeAlbumsLoader(token) {
    const batchLoadFn = async (keys) => {
        const { albums } = await getAlbums(token, keys)
        return albums
    }
    return new Dataloader(batchLoadFn, { maxBatchSize: 20 })
}

export function makeArtistsLoader(token) {
    const batchLoadFn = async (keys) => {
        const { artists } = await getArtists(token, keys)
        return artists
    }
    return new Dataloader(batchLoadFn, { maxBatchSize: 50 })
}

export function makeTracksLoader(token) {
    const batchLoadFn = async (keys) => {
        const { tracks } = await getTracks(token, keys)
        return tracks
    }
    return new Dataloader(batchLoadFn, { maxBatchSize: 50 })
}

export function makeSavedContainsLoader(token) {
    const batchLoadFn = async (keys) => {
        return await getSavedContains(token, keys)
    }
    return new Dataloader(batchLoadFn, { maxBatchSize: 50 })
}

export function makeAudioFeaturesLoader(token) {
    const batchLoadFn = async (keys) => {
        const { audio_features } = await getAudioFeatures(token, keys)
        return audio_features
    }
    return new Dataloader(batchLoadFn, { maxBatchSize: 50 })
}

export function makeCategoriesLoader(token) {
    const batchLoadFn = async ([key]) => {
        return [await getCategories(token, key)]
    }
    return new Dataloader(batchLoadFn, { batch: false, cacheKeyFn: cacheKeyFnForQueryKeys })
}

export function makeCategoryLoader(token) {
    const batchLoadFn = async ([key]) => {
        const category = await getCategory(token, key)
        return [category]
    }
    return new Dataloader(batchLoadFn, { batch: false })
}

export function makeCategoriesPlaylistsLoader(token) {
    const batchLoadFn = async ([{ id, queryParams }]) => {
        return [await getCategoryPlaylists(token, id, queryParams)]
    }
    return new Dataloader(batchLoadFn, { batch: false, cacheKeyFn: cacheKeyFnForQueryKeys })
}

export function makeRecommendationsLoader(token) {
    const batchLoadFn = async ([key]) => {
        return [await getRecommendations(token, key)]
    }
    return new Dataloader(batchLoadFn, { batch: false, cacheKeyFn: cacheKeyFnForQueryKeys })
}

export function makeGetTopTypeLoader(token) {
    const batchLoadFn = async ([key]) => {
        return [await getTopType(token, key)]
    }
    return new Dataloader(batchLoadFn, { batch: false, cacheKeyFn: cacheKeyFnForQueryKeys })
}

export function makePlaylistFollowersContainsLoader(token) {
    const batchLoadFn = async ([key]) => {
        return [await getPlaylistFollowersContains(token, key)]
    }
    return new Dataloader(batchLoadFn, { batch: false, cacheKeyFn: cacheKeyFnForQueryKeys })
}

// Skipping the dataloader just here since the loader is meant to called with only .load()
// Use it the same way as you would with a dataloader, i.e only on per request basis
export function makeMeLoader(token) {
    let cacheMe = null;
    return {
        load : async () => {
            if (!cacheMe) {
                cacheMe = await getMe(token)
            }
            return cacheMe
        }
    }
}

export function makeLoaders(token) {
    return {
        UserLoader : makeUserLoader(token),
        PlaylistLoader : makePlaylistLoader(token),
        PlaylistTracksLoader: makePlaylistTracksLoader(token),
        AlbumsLoader: makeAlbumsLoader(token),
        ArtistsLoader: makeArtistsLoader(token),
        TracksLoader: makeTracksLoader(token),
        SavedContainsLoader: makeSavedContainsLoader(token),
        AudioFeaturesLoader: makeAudioFeaturesLoader(token),
        CategoriesLoader : makeCategoriesLoader(token),
        RecommendationsLoader: makeRecommendationsLoader(token),
        CategoryPlaylistLoader: makeCategoriesPlaylistsLoader(token),
        CategoryLoader: makeCategoryLoader(token),
        TopTypeLoader: makeGetTopTypeLoader(token),
        PlaylistFollowersContainsLoader: makePlaylistFollowersContainsLoader(token),
        MeLoader: makeMeLoader(token)
    }
}

export default {
  getAlbum,
  getAlbums,
  getArtist,
  getArtists,
  getPlaylist,
  getTrack,
  getTracks,
  getRecentlyPlayed,
  search: checkResponseStatus(search)
};

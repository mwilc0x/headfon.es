interface Album {
  album_type?: string
  artists: Artist[]
  available_markets?: string[]
  genres?: string[]
  href?: string
  id?: string
  images: Image[]
  label?: string
  name: string
  popularity?: number
  release_date: string
  release_date_precision?: string
  tracks: TrackPaging
  totalTracks?: number
  uri: string
}

interface Artist {
  followerCount?: number
  uri?: string
  href?: string
  id?: string
  images?: Image[]
  name: string
  popularity?: number
  genres?: string[]
  external_urls?: ExternalUrls
  type?: string
}

interface AudioFeatures {
  acousticness: number
  danceability: number
  duration_ms: number
  energy: number
  instrumentalness: number
  key: number
  liveness: number
  loudness: number
  mode: number
  speechiness: number
  tempo: number
  time_signature: number
  valence: number
  id: string
  uri: string
}

interface ExternalUrls {
  spotify: string
}

interface Image {
  height?: number
  url: string
  width?: number
}

interface Playlist {
  collaborative: boolean
  description: string
  followerCount: number
  href: string
  id: string
  images: Image[]
  name: string
  owner: User
  public: boolean
  snapshot_id: string
  tracks(limit: number, offset: number): Paging
  totalTracks: number
  external_urls: ExternalUrls
  uri: string
  followersContains: (userIds: string[]) => boolean[]
  following: boolean
}

interface Paging {
  href: string
  limit: number
  next: string
  previous: string
  offset: number
  total: number
}

interface AlbumPaging extends Paging {
  items: Album[]
  href?: string
  limit?: number
  next?: string
  previous?: string
  offset?: number
  total?: number
}

interface PlaylistPaging extends Paging {
  items: Playlist[]
  href?: string
  limit?: number
  next?: string
  previous?: string
  offset?: number
  total?: number
}

interface TrackPaging extends Paging {
  items: Track[]
  href?: string
  limit?: number
  next?: string
  previous?: string
  offset?: number
  total?: number
}

interface Track {
  album: Album
  artists: Artist[]
  audio_features: AudioFeatures
  available_markets: string[]
  duration_ms: number
  explicit: Boolean
  href: string
  id: string
  is_playable: Boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  uri: string 
  external_urls: ExternalUrls
  saved: Boolean
  type: string
}

interface User {
  display_name: string
  followerCount: number
  href: string
  id: string
  images: Image[]
  uri: string
}

const ArtistTopTracksQuery = `
  query($id: String) {
    artistTopTracks(id: $id) {
      tracks {
        album {
          images {
            url
          }
        }
        duration_ms
        name
        uri
      }
    }
  }
`;

export default ArtistTopTracksQuery;

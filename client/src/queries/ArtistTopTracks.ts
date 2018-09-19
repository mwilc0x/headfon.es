export default `
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

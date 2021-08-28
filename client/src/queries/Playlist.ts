const PlaylistQuery = `
  query($userId: String, $playlistId: String) {
    playlist(userId: $userId, playlistId: $playlistId) {
      uri
      images {
        url
      }
      name
      tracks {
        items {
          track {
            duration_ms
            name
            uri
          }
        }
      }
    }
  }
`;

export default PlaylistQuery;

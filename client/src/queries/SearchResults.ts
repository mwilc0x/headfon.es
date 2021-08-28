const SearchResults = `
  query($query: String) {
    search(query: $query) {
      albums {
        items {
          uri
          artists {
            name
          }
          id
          name
          images {
            url
          }
        }
      }
      artists {
        items {
          id
          name
          images {
            url
          }
        }
      }
      playlists {
        items {
          id
          name
          images {
            url
          }
          owner {
            id
          }
          uri
        }
      }
      tracks {
        items {
          album {
            name
          }
          artists {
            name
          }
          duration_ms
          name
          uri
        }
      }
    }
  }
`;

export default SearchResults;

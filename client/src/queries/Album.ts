export default `
  query($id: String) {
    album(id: $id) {
      uri
      artists {
        id
        name
      }
      images {
        url
      }
      name
      release_date
      tracks {
        items {
          duration_ms
          name
          uri
        }
      }
    }
  }
`;

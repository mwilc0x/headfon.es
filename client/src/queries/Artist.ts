const AlbumQuery = `
  query($id: String) {
    artist(id: $id) {
      images {
        url
      }
      name
    }
  }
`;

export default AlbumQuery;
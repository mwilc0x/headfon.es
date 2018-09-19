export default `
  query($id: String) {
    artist(id: $id) {
      images {
        url
      }
      name
    }
  }
`;

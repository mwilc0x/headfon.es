export default `
  query($query: String) {
    search(query: $query) {
      artists {
        items {
          name
        }
      }
    }
  }
`;

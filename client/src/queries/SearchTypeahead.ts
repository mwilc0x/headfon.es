const SearchTypeaheadQuery = `
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

export default SearchTypeaheadQuery;

export default `
  query($id: String) {
    artistBio(id: $id) {
      headerImages {
        url
      }
    }
`;

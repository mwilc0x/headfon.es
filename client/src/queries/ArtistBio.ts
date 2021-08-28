const AlbumBioQuery = `
  query($id: String) {
    artistBio(id: $id) {
      headerImages {
        url
      }
    }
`;

export default AlbumBioQuery;
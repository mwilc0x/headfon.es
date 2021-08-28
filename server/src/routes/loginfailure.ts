export default (req, res) => {
    const redirectTo = process.env.NODE_ENV === 'production'
    ? '/'
    : 'http://localhost:3000/';
    res.redirect(redirectTo);
  };
  
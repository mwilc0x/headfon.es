export default (req, res) => {
  req.logout();
  res.clearCookie('jwt');
  res.json({ success: true });
};

export default (req, res) => {
  req.logout();
  res.json({ success: true });
};

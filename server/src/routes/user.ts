export default (req, res) => {
  // res.json(req.user);
  console.log('get user!', req.user);
  res.json({ success: true });
};

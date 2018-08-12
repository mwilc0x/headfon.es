export default (req, res) => {
  const user = req.user;
  res.json(user);
}

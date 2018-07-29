import generateJwt from '../services/jwt/generateToken';

const loginRedirect = () => `
  <div>
    <script>
      const targetWindow = window.opener;
      targetWindow.postMessage({ type: 'login', success: true }, '*'); 
    </script>
  </div>
`;

export default (req, res) => {
  // TODO: think about minimal data storage in JWT
  const token = generateJwt(req.user);

  res.cookie('jwt', `${token}`);
  res.send(loginRedirect());
};

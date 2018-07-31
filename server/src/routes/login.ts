import generateJwt from '../services/jwt/generateToken';
import { getUserDetailsForToken } from '../services/spotify/api';

const loginRedirect = () => `
  <div>
    <script>
      const targetWindow = window.opener;
      targetWindow.postMessage({ type: 'login', success: true }, '*'); 
    </script>
  </div>
`;

export default (req, res) => {
  const token = generateJwt(getUserDetailsForToken(req.user));

  res.cookie('jwt', `${token}`);
  res.send(loginRedirect());
};

import generateJwt from '../services/jwt/generateToken';
import { getUserDetailsForToken } from '../services/spotify/api';
import { User } from '../database/model';

const loginRedirect = () => `
  <div>
    <script>
      const targetWindow = window.opener;
      targetWindow.postMessage({ type: 'login', success: true }, '*'); 
    </script>
  </div>
`;

export default async (req, res) => {
  try {
    const userDetails = getUserDetailsForToken(req.user);
    const token = generateJwt({ id: userDetails.id });
  
    const userForSave = new User(userDetails);
    await userForSave.handleLogin();

    res.cookie('jwt', `${token}`);
    res.send(loginRedirect());
  } catch (e) {
    console.error(e.message);
  }
};

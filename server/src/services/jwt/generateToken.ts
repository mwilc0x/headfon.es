import jwt from 'jsonwebtoken';

export default function generateJwt(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: 86400 * 30,
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
      subject: user.id.toString()
  });

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    console.log('token verification:', err, data);
  });

  return token;
}

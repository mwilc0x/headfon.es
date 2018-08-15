import { getTimeExpires } from '../time';

export function getUserDetailsForToken(user) {
  const { id, accessToken, refreshToken, expires_in } = user;
  const timeExpires = getTimeExpires(expires_in);

  return {
    accessToken,
    refreshToken,
    id,
    timeExpires
  };
}
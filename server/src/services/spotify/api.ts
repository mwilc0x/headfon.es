export function getUserDetailsForToken(user) {
  const { id, accessToken, refreshToken, expires_in } = user;
  return {
    accessToken,
    refreshToken,
    id,
    expires_in
  };
}
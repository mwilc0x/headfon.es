const routes = {
  logout: '/logout',
  user: '/user'
}

const fetchOptions = (options?: any) => ({
  credentials: 'same-origin',
  ...options
});

export function logout() {
  return fetch(routes.logout, fetchOptions())
  .then(res => res.json());
}

export function fetchUser() {
  return fetch(routes.user, fetchOptions())
  .then(res => res.json());
}

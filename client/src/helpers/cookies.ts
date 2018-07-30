const parseCookies = () => {
  const cookieData = (typeof document.cookie === 'string' ? document.cookie : '').trim();

  return (cookieData ? cookieData.split(';') : []).reduce((cookies, cookieString) => {
    const cookiePair = cookieString.split('=');

    cookies[cookiePair[0].trim()] = cookiePair.length > 1 ? cookiePair[1].trim() : '';

    return cookies;
  }, {});
};

export const getCookie = (name: string) => {
  return parseCookies()[name] || '';
};

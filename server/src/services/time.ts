export const getTimeExpires = (expires_in = 3600) => {
  let timeExpires = new Date();
  // give ourselves a little breathing room before it actually expires
  timeExpires.setSeconds(timeExpires.getSeconds() + (expires_in * .9));

  return timeExpires;
}

export const getMinutesUntilExpiration = (timeExpires) => {
  const diff = <any>new Date(timeExpires) - <any>new Date();
  return Math.floor(( diff / 1000 ) / 60);
}

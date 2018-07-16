export function openWindow(url, name, width, height, options = '') {  
  let winTop;
  let winLeft
  let finalTop;
  let finalLeft;
  let winHeight;
  let winWidth;
  let finalOptions = [];
  
  // Make sure width is a number, else default to 400
  width = +width;
  if (isNaN(width)) {
      width = 400;
  }
  
  // Make sure height is a number, else default to 400
  height = +height;
  if (isNaN(height)) {
      height = 400;
  }
  
  if (options.indexOf("top=") < 0) {
      // If options doesn't contain "top" spec, define it
      winTop = +(window.screenY || window.screenTop || 50);
      winHeight = +(window.outerHeight || window.innerHeight || 500);
      finalTop = (winTop + ((winHeight / 2) - (height / 2)));
      finalOptions.push("top=" + finalTop);
  }
  
  if (options.indexOf("left=") < 0) {
      // If options doesn't contain "left" spec, define it
      winLeft = +(window.screenX || window.screenLeft || 50);
      winWidth = +(window.outerWidth || window.innerWidth || 500);
      finalLeft = (winLeft + ((winWidth / 2) - (width / 2)));
      finalOptions.push("left=" + finalLeft);
  }
  
  finalOptions.push("height=" + height);
  finalOptions.push("width=" + width);
  
  const opts = finalOptions.join(",") + (options ? "," + options : "");
  
  return window.open(url, name, opts);
}
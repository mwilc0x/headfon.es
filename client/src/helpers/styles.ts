import { themeOptions } from '../styling';

export function updateThemeForStyle(themeName) {
  const selectedTheme = themeOptions.find(t => t.name.toLowerCase() === themeName.toLowerCase()) || {};
  const html = document.getElementsByTagName('html')[0];
  Object.keys(selectedTheme).forEach((property, i) => {
    if (property === 'name') {
      return;
    }
    html.style.setProperty(property, selectedTheme[property]);
  });
}
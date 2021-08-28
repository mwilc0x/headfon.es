import * as React from 'react';
import { hideHiddenMenu, setTheme } from '../../store';
import { updateThemeForStyle } from '../../helpers';
import { themeOptions } from '../../styling';
import './style.css';

interface Props {
  selectedTheme: string
};

function ThemeMenu(props: Props) {
  const { selectedTheme } = props;

  function handleThemeSelection(e) {
    const selectedTheme = (themeOptions.find(o => o.name === e.target.value) || {}).name;
    setTheme(selectedTheme);
    updateThemeForStyle(selectedTheme);
  }
  
  return (
    <div className="theme-menu">
      <h2>🎨 Theme Selector 🎨</h2>
      <select onChange={handleThemeSelection} value={selectedTheme}>
        { themeOptions.map((option, i) => (
          <option
            key={option.name} 
            value={option.name} 
          >
            {option.name}
          </option>
        ))}
      </select>
      <button onClick={hideHiddenMenu}>Close</button>
    </div>
  );
}

export default ThemeMenu;

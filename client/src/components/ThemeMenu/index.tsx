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
    const selectedTheme = themeOptions[e.target.value];
    setTheme(selectedTheme.name);
    updateThemeForStyle(selectedTheme.name);
  }

  return (
    <div className="theme-menu">
      <h2>🎨 Theme Selector 🎨</h2>
      <select onChange={handleThemeSelection}>
        { themeOptions.map((option, i) => (
          <option 
            value={i} 
            selected={selectedTheme.toLowerCase() === option.name.toLowerCase()}
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

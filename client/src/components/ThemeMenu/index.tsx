import * as React from 'react';
import { hideHiddenMenu, setTheme } from '../../store';
import { updateThemeForStyle } from '../../helpers';
import { themeOptions } from '../../styling';
import './style.css';

interface Props {
  selectedTheme: string
};

export default class ThemeMenu extends React.Component<Props, {}> {
  private options = themeOptions;

  public render() {
    const { selectedTheme } = this.props;
    return (
      <div className="theme-menu">
        <h2>🎨 Theme Selector 🎨</h2>
        <select onChange={this.handleThemeSelection}>
          { this.options.map((option, i) => (
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

  private handleThemeSelection = (e) => {
    const selectedTheme = themeOptions[e.target.value];
    setTheme(selectedTheme.name);
    updateThemeForStyle(selectedTheme.name);
  }
}

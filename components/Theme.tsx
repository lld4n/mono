import React from 'react';
import { ThemeContext, themes } from '../utils/ThemeContext';
import Toggle from './Toggle/Toggle';

export default function Theme() {
  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <Toggle
          onChange={() => {
            if (theme === themes.light)
              if (setTheme) {
                setTheme(themes.dark);
              }
            if (theme === themes.dark)
              if (setTheme) {
                setTheme(themes.light);
              }
          }}
          value={theme === themes.dark}
        />
      )}
    </ThemeContext.Consumer>
  );
}

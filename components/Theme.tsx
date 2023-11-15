import React, { useContext } from 'react';
import { ThemeContext, themes } from '../utils/ThemeContext';
import Toggle from './Toggle/Toggle';

export default function Theme() {
  const themeContext = useContext(ThemeContext);
  return (
    <Toggle
      onChange={() => {
        if (themeContext.theme === themes.light)
          if (themeContext.setTheme) {
            themeContext.setTheme(themes.dark);
          }
        if (themeContext.theme === themes.dark)
          if (themeContext.setTheme) {
            themeContext.setTheme(themes.light);
          }
      }}
      value={themeContext.theme === themes.dark}
    />
  );
}

import React from 'react';

interface IThemeContext {
  theme?: string;
  setTheme?: (arg0: string) => void;
}

export const themes = {
  dark: 'dark',
  light: 'light',
};

export const ThemeContext = React.createContext<IThemeContext>({});

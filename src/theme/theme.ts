import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'sepia';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export const themes: Record<Theme, ThemeColors> = {
  light: {
    primary: '#365b6d',
    secondary: '#bcac88',
    background: '#ffffff',
    text: '#333333',
    accent: '#1a3c4d',
  },
  dark: {
    primary: '#1a3c4d',
    secondary: '#d4c39a',
    background: '#121212',
    text: '#e0e0e0',
    accent: '#365b6d',
  },
  sepia: {
    primary: '#704214',
    secondary: '#b38b4d',
    background: '#f1e7d0',
    text: '#5f4b32',
    accent: '#b38b4d',
  },
};

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'light',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

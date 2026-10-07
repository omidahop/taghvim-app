import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  colors: Record<string, string>;
}

const lightColors = {
  background: '#f8fafc',
  card: '#ffffff',
  text: '#0f172a',
  subText: '#64748b',
  primary: '#2563eb',
  border: '#e2e8f0',
};

const darkColors = {
  background: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc',
  subText: '#94a3b8',
  primary: '#3b82f6',
  border: '#334155',
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
  colors: lightColors,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemColorScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

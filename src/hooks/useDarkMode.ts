import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useDarkMode = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>('light');

  const setMode = (mode: Theme) => {
    window.localStorage.setItem('theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme | null;
    
    // Check if user has a theme preference
    const prefersDarkMode = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set theme based on local storage or system preference
    if (localTheme) {
      setMode(localTheme);
    } else if (prefersDarkMode) {
      setMode('dark');
    }
  }, []);

  return [theme, toggleTheme];
};

export default useDarkMode;

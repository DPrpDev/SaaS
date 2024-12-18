export type Theme = {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    surface: string;
    shadow: string;
  };
};

export type ThemeState = {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
};
import { useState } from 'react';
import { Palette } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { themes } from '../config/themes';

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme } = useThemeStore();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Palette className="h-5 w-5" />
        <span>Theme</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setTheme(theme);
                  setIsOpen(false);
                }}
                className={`${
                  currentTheme.id === theme.id ? 'bg-gray-100' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                role="menuitem"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${theme.colors.primary}`} />
                  <span>{theme.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
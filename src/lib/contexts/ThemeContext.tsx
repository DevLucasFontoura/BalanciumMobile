import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { Theme, ThemeColors, lightTheme, darkTheme } from '../types/theme';

// AsyncStorage será importado dinamicamente se disponível
let AsyncStorage: any = null;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  // AsyncStorage não está disponível, usaremos apenas estado local
}

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@balancium_theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    // Carregar tema salvo
    loadTheme();
    
    // Listener para mudanças no tema do sistema
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const loadTheme = async () => {
    if (!AsyncStorage) {
      // Sem AsyncStorage, sempre inicia no tema claro
      setThemeState('light');
      return;
    }
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
        setThemeState(savedTheme as Theme);
      } else {
        // Se não houver tema salvo, inicia no tema claro
        setThemeState('light');
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
      // Em caso de erro, inicia no tema claro
      setThemeState('light');
    }
  };

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    if (AsyncStorage) {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch (error) {
        console.error('Erro ao salvar tema:', error);
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Determina o tema efetivo baseado na configuração
  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return theme;
  };

  const effectiveTheme = getEffectiveTheme();
  const colors = effectiveTheme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}


import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../lib/contexts/ThemeContext';

export default function StatusBarWrapper() {
  const { theme } = useTheme();
  
  return <StatusBar style={theme === 'light' ? 'dark' : 'light'} />;
}


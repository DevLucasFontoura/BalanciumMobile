import { StyleSheet, Platform } from 'react-native';
import { ThemeColors } from '../types/theme';

export function createThemedStyles(colors: ThemeColors) {
  return StyleSheet.create({
    // Estilos que dependem do tema podem ser adicionados aqui
    // Por enquanto, retornamos um objeto vazio para não quebrar
  });
}


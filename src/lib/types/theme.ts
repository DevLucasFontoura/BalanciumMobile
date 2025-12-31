export type Theme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string; // Cor de fundo principal
  surface: string; // Cor de fundo de cards/superfícies
  text: string; // Cor do texto principal
  textSecondary: string; // Cor do texto secundário
  border: string; // Cor das bordas
  primary: string; // Cor primária do app (verde)
}

export const lightTheme: ThemeColors = {
  background: '#ffffff', // Branco (tema claro)
  surface: '#f5f5f5', // Superfícies cinza claro
  text: '#000000', // Texto preto
  textSecondary: 'rgba(0, 0, 0, 0.7)', // Texto secundário preto com opacidade
  border: '#000000', // Bordas pretas
  primary: '#14ba82', // Cor primária verde
};

export const darkTheme: ThemeColors = {
  background: '#000000', // Preto (tema escuro)
  surface: '#1a1a1a', // Superfícies quase pretas
  text: '#ffffff', // Texto branco
  textSecondary: 'rgba(255, 255, 255, 0.7)', // Texto secundário branco com opacidade
  border: 'rgba(255, 255, 255, 0.1)', // Bordas brancas com opacidade
  primary: '#14ba82', // Cor primária verde (mantém)
};


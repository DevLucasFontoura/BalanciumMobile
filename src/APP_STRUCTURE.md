# Estrutura do Aplicativo React Native

Este documento descreve a estrutura completa do aplicativo para facilitar a criação de novos projetos com a mesma arquitetura.

## 📁 Estrutura de Diretórios

```
balancium-mobile/
├── assets/                    # Recursos estáticos (imagens, ícones)
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   ├── icon.svg
│   ├── splash-icon.png
│   └── [outras imagens]
│
├── src/
│   ├── app/                   # Telas da aplicação
│   │   ├── (private)/         # Telas autenticadas (requerem login)
│   │   │   ├── Dashboard/
│   │   │   │   ├── index.tsx          # Export do componente
│   │   │   │   ├── dashboard.tsx      # Componente principal
│   │   │   │   └── dashboard.styles.ts # Estilos do componente
│   │   │   ├── Monthly/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── monthly.tsx
│   │   │   │   └── monthly.styles.ts
│   │   │   ├── NewTransition/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── newTransition.tsx
│   │   │   │   └── newTransition.styles.ts
│   │   │   ├── Settings/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── settings.tsx
│   │   │   │   ├── settings.styles.ts
│   │   │   │   ├── AccountDetails/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── accountDetails.tsx
│   │   │   │   │   └── accountDetails.styles.ts
│   │   │   │   ├── Notifications/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── notifications.tsx
│   │   │   │   │   └── notifications.styles.ts
│   │   │   │   └── Theme/
│   │   │   │       ├── index.tsx
│   │   │   │       ├── theme.tsx
│   │   │   │       └── theme.styles.ts
│   │   │   └── Welcome/
│   │   │       ├── index.tsx
│   │   │       ├── welcome.tsx
│   │   │       └── welcome.styles.ts
│   │   │
│   │   └── (public)/          # Telas públicas (não requerem login)
│   │       ├── Login/
│   │       │   ├── index.tsx
│   │       │   ├── login.tsx
│   │       │   └── login.styles.ts
│   │       └── Register/
│   │           ├── index.tsx
│   │           ├── register.tsx
│   │           └── register.styles.ts
│   │
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Menu/
│   │   │   ├── index.tsx
│   │   │   ├── menu.tsx
│   │   │   └── menu.styles.ts
│   │   ├── SplashScreen/
│   │   │   ├── index.tsx
│   │   │   ├── splashScreen.tsx
│   │   │   └── splashScreen.styles.ts
│   │   └── StatusBarWrapper.tsx
│   │
│   └── lib/                   # Bibliotecas e utilitários
│       ├── contexts/          # Contexts do React
│       │   └── ThemeContext.tsx
│       ├── types/             # Definições de tipos TypeScript
│       │   └── theme.ts
│       └── utils/             # Funções utilitárias
│           └── createThemedStyles.ts
│
├── App.tsx                    # Componente raiz da aplicação
├── index.ts                   # Ponto de entrada (registra o App)
├── app.json                   # Configuração do Expo
├── package.json               # Dependências do projeto
├── tsconfig.json              # Configuração TypeScript
├── babel.config.js            # Configuração Babel
└── eas.json                   # Configuração EAS Build
```

## 🛠️ Tecnologias e Dependências

### Core
- **React Native**: `0.81.5`
- **React**: `19.1.0`
- **Expo**: `~54.0.30`
- **TypeScript**: `~5.9.2`

### Principais Dependências
```json
{
  "@expo/vector-icons": "^15.0.3",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "@react-native-community/datetimepicker": "^8.5.1",
  "@react-native-picker/picker": "^2.11.4",
  "expo-blur": "~15.0.8",
  "expo-haptics": "~15.0.8",
  "expo-linear-gradient": "~15.0.8",
  "expo-status-bar": "~3.0.9",
  "react-native-chart-kit": "^6.12.0",
  "react-native-gesture-handler": "~2.28.0",
  "react-native-reanimated": "~4.1.1",
  "react-native-svg": "^15.15.1"
}
```

## 🏗️ Arquitetura

### 1. Sistema de Navegação
- **Tipo**: Navegação manual baseada em estado (não usa React Navigation)
- **Implementação**: Gerenciada no `App.tsx` através de `useState`
- **Telas**: Definidas como tipos TypeScript (`Screen` type)
- **Validação**: Array `VALID_SCREENS` valida navegação

```typescript
type Screen = 'login' | 'register' | 'welcome' | 'settings' | ...;
const VALID_SCREENS: Screen[] = [...];
```

### 2. Sistema de Temas
- **Context API**: `ThemeContext` gerencia tema global
- **Tipos de Tema**: `'light' | 'dark' | 'system'`
- **Persistência**: AsyncStorage salva preferência do usuário
- **Hook**: `useTheme()` para acessar tema em componentes

**Estrutura do Tema:**
```typescript
interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
}
```

### 3. Padrão de Componentes

Cada tela/componente segue o padrão:

```
ComponentName/
├── index.tsx          # Export default do componente
├── componentName.tsx   # Lógica e JSX do componente
└── componentName.styles.ts  # Estilos separados
```

**Exemplo de index.tsx:**
```typescript
import ComponentName from './componentName';
export default ComponentName;
```

**Exemplo de componentName.tsx:**
```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { styles } from './componentName.styles';

export default function ComponentName() {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Conteúdo</Text>
    </View>
  );
}
```

**Exemplo de componentName.styles.ts:**
```typescript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

### 4. Organização de Telas

- **`(private)/`**: Telas que requerem autenticação
- **`(public)/`**: Telas públicas (login, registro)
- **Nomenclatura**: PascalCase para pastas e arquivos
- **Estrutura**: Cada tela tem sua própria pasta com arquivos separados

### 5. Componentes Globais

- **Menu**: Menu de navegação inferior (componente global)
- **SplashScreen**: Tela de splash/loading
- **StatusBarWrapper**: Wrapper para StatusBar do Expo

## 📝 Convenções de Código

### Nomenclatura
- **Componentes**: PascalCase (`Dashboard`, `NewTransition`)
- **Arquivos**: camelCase (`dashboard.tsx`, `newTransition.tsx`)
- **Estilos**: camelCase (`dashboard.styles.ts`)
- **Pastas**: PascalCase para componentes, camelCase para utilitários

### Imports
- **Alias de Path**: `@/*` aponta para `./src/*` (configurado no `tsconfig.json`)
- **Exemplo**: `import { useTheme } from '@/lib/contexts/ThemeContext';`

### Estilos
- **Separação**: Estilos sempre em arquivo `.styles.ts` separado
- **Tema**: Usar `useTheme()` para cores dinâmicas
- **StyleSheet**: Sempre usar `StyleSheet.create()` para performance

### TypeScript
- **Strict Mode**: Habilitado no `tsconfig.json`
- **Tipos**: Definidos em `src/lib/types/`
- **Props**: Sempre tipadas com interfaces

## ⚙️ Configurações

### TypeScript (`tsconfig.json`)
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Babel (`babel.config.js`)
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // Deve ser o último
    ],
  };
};
```

### Expo (`app.json`)
- Configuração de ícones, splash screen
- Configurações específicas para iOS e Android
- Bundle identifier/package name

## 🚀 Scripts Disponíveis

```json
{
  "start": "expo start",
  "android": "expo run:android",
  "ios": "expo run:ios",
  "web": "expo start --web",
  "build:ios:bundle": "npx expo export --platform ios",
  "build:ios:standalone": "npx expo run:ios --configuration Release --device"
}
```

## 📦 Fluxo de Dados

### Navegação
```
App.tsx (estado currentScreen)
  ↓
handleNavigate(screen)
  ↓
Componentes recebem onNavigate como prop
  ↓
Menu/Componentes chamam onNavigate('screen-name')
```

### Tema
```
ThemeProvider (App.tsx)
  ↓
ThemeContext (lib/contexts/ThemeContext.tsx)
  ↓
useTheme() hook
  ↓
Componentes acessam colors e toggleTheme
```

## 🎨 Padrões de UI

### Cores
- **Primária**: `#14ba82` (verde)
- **Tema Claro**: Fundo branco, texto preto
- **Tema Escuro**: Fundo preto, texto branco
- **Bordas**: Adaptam-se ao tema

### Componentes Visuais
- **BlurView**: Efeito de vidro fosco (`expo-blur`)
- **LinearGradient**: Gradientes (`expo-linear-gradient`)
- **SVG**: Formas customizadas (`react-native-svg`)
- **Charts**: Gráficos (`react-native-chart-kit`)

## 📋 Checklist para Novo Projeto

1. ✅ Criar estrutura de pastas (`src/app/(private)`, `src/app/(public)`, `src/components`, `src/lib`)
2. ✅ Configurar `package.json` com dependências
3. ✅ Configurar `tsconfig.json` com paths alias
4. ✅ Configurar `babel.config.js` com reanimated plugin
5. ✅ Criar `ThemeContext` e tipos de tema
6. ✅ Criar `App.tsx` com sistema de navegação
7. ✅ Criar `index.ts` como ponto de entrada
8. ✅ Configurar `app.json` do Expo
9. ✅ Criar componentes base (Menu, SplashScreen, StatusBarWrapper)
10. ✅ Implementar primeira tela seguindo o padrão (index.tsx, component.tsx, component.styles.ts)

## 🔄 Migração para Novo App

1. Copiar estrutura de pastas
2. Atualizar `package.json` com nome do novo app
3. Atualizar `app.json` (nome, slug, bundle identifier)
4. Manter `ThemeContext` e adaptar cores se necessário
5. Adaptar `App.tsx` com novas telas
6. Substituir componentes específicos do domínio
7. Atualizar assets (ícones, splash screen)

## 📚 Recursos Adicionais

- **Documentação Expo**: https://docs.expo.dev/
- **React Native**: https://reactnative.dev/
- **TypeScript**: https://www.typescriptlang.org/

---

**Última atualização**: Janeiro 2026
**Versão do App**: 1.0.0

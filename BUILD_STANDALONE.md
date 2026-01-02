# Como Criar um Build Standalone do App

## ⭐ Opção 1: EAS Build (RECOMENDADO - Funciona sem conta paga!)

### Passo 1: Instalar EAS CLI
```bash
npm install -g eas-cli
```

### Passo 2: Fazer Login
```bash
eas login
```
(Crie uma conta Expo gratuita se não tiver)

### Passo 3: Configurar EAS
```bash
eas build:configure
```

Isso criará o arquivo `eas.json` automaticamente.

### Passo 4: Criar Build para iOS
```bash
eas build --platform ios --profile preview
```

**Ou para produção:**
```bash
eas build --platform ios --profile production
```

### Passo 5: Aguardar o Build
- O build leva cerca de 15-30 minutos
- Você receberá um link para download do `.ipa`

### Passo 6: Instalar no iPhone
1. Abra o link no iPhone
2. Toque em "Instalar"
3. Vá em **Configurações > Geral > VPN e Gerenciamento de Dispositivos**
4. Confie no certificado do desenvolvedor
5. O app aparecerá na tela inicial

**⚠️ Limitação:** O app expira em 7 dias (para preview). Depois precisa criar novo build.

---

## Opção 2: Build Local com Xcode (⚠️ Requer conta Apple Developer paga)

**⚠️ ATENÇÃO:** Build local no Xcode geralmente requer conta Apple Developer paga ($99/ano) para gerar arquivos instaláveis. Se você não tem conta paga, use a **Opção 1 (EAS Build)** que funciona perfeitamente sem conta paga!

### Passo 1: Gerar Projeto iOS
```bash
npx expo prebuild -p ios
```

### Passo 2: Abrir no Xcode
```bash
open ios/balanciummobile.xcworkspace
```

### Passo 3: Configurar no Xcode
1. Selecione **"Any iOS Device"** como destino (não simulador)
2. Vá em **Product > Archive**
3. Aguarde o build terminar
4. No **Organizer**, selecione o archive
5. Clique em **"Distribute App"**
6. Escolha **"Development"** (para desenvolvimento/teste)
   - ⚠️ **NÃO escolha "Ad Hoc"** - requer conta Apple Developer paga ($99/ano)
   - Se "Development" não aparecer, escolha **"Custom"** e depois selecione "Development" dentro
7. Selecione seu certificado de desenvolvimento
8. Selecione seu iPhone (se aparecer opção)
9. Clique em **"Export"** ou **"Next"** até finalizar

### Passo 4: Instalar
1. O Xcode vai gerar um arquivo `.ipa`
2. Arraste o `.ipa` para o iTunes/Finder
3. Sincronize com seu iPhone
4. Ou use o **Transporter** da Apple

---

## Diferença entre os Métodos

| Método | Tempo | Complexidade | Validade | Custo |
|--------|-------|--------------|----------|-------|
| **EAS Preview** | 15-30 min | Fácil | 7 dias | Grátis |
| **EAS Production** | 15-30 min | Fácil | Permanente* | Grátis* |
| **Xcode Local** | 5-10 min | Média | 7 dias | Grátis |

*Para produção permanente, precisa de conta Apple Developer ($99/ano)

---

## Recomendação

Para testar rapidamente, use **EAS Build Preview**:
```bash
eas build --platform ios --profile preview
```

É o mais simples e você terá um app instalável em ~20 minutos!


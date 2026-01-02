# Como Criar Build Standalone Local (Sem depender do PC depois)

## ⚠️ IMPORTANTE: Limitações

- **Requer Mac com Xcode** para criar o build (uma vez só)
- **Depois de criado**: O app funciona standalone, sem precisar do PC
- **Sem conta paga**: Só funciona no **seu próprio iPhone**
- **Válido por 7 dias**: Depois precisa criar novo build
- **Não pode distribuir**: Para outras pessoas, precisa de conta Apple Developer paga ($99/ano)

---

## Passo a Passo

### 1. Conectar seu iPhone

1. Conecte seu iPhone via cabo USB
2. Desbloqueie o iPhone
3. Confie no computador se solicitado

### 2. Criar Build Standalone

Execute o comando que vai gerar o bundle e instalar automaticamente:

```bash
npm run build:ios:standalone
```

**OU** se preferir fazer manualmente:

```bash
# Gerar bundle e fazer build em Release
npx expo run:ios --configuration Release --device
```

Isso vai:
- ✅ Gerar o bundle JavaScript de produção
- ✅ Copiar o bundle para o app
- ✅ Fazer build em modo Release
- ✅ Instalar automaticamente no seu iPhone conectado

### Alternativa: Usar Xcode Manualmente

Se preferir usar o Xcode:

1. **Gerar o bundle primeiro:**
   ```bash
   npm run build:ios:bundle
   ```

2. **Abrir no Xcode:**
   ```bash
   cd ios
   open balanciummobile.xcworkspace
   ```

3. **Configurar para Release:**
   - Vá em **Product > Scheme > Edit Scheme...**
   - Selecione **"Run"** no lado esquerdo
   - Na aba **"Build Configuration"**, selecione **"Release"**
   - Clique em **"Close"**

4. **Configurar Assinatura:**
   - Selecione o projeto **balanciummobile** (ícone azul)
   - Selecione o target **balanciummobile**
   - Vá na aba **"Signing & Capabilities"**
   - Em **"Team"**, selecione seu Apple ID
   - Marque **"Automatically manage signing"**

5. **Fazer Build:**
   - Selecione seu iPhone no seletor de dispositivo
   - Pressione **Cmd + R** para fazer Build e instalar

---

## Depois do Build

✅ **O app funciona standalone** - não precisa do PC rodando
✅ **Não precisa do `npm start`** - o JavaScript está embutido
✅ **Funciona sem cabo** - depois de instalado, funciona normalmente

⚠️ **Mas expira em 7 dias** - depois precisa criar novo build
⚠️ **Só funciona no seu iPhone** - não pode instalar em outros iPhones sem conta paga

---

## Para Criar Novo Build (quando expirar)

1. Faça as alterações no código
2. Execute novamente: `npm run build:ios:bundle`
3. Abra no Xcode e faça Build novamente

---

## Troubleshooting

### Erro: "No script URL provided"
- **Solução:** Use `npm run build:ios:standalone` que automaticamente embute o bundle
- **OU** use `npx expo run:ios --configuration Release --device` 
- Não use apenas `expo export` + Xcode manual - o bundle não é copiado automaticamente
- O comando `expo run:ios --configuration Release` faz tudo automaticamente

### Erro de Assinatura
- Verifique se seu Apple ID está configurado no Xcode
- Vá em **Xcode > Settings > Accounts** e adicione seu Apple ID

### App não aparece no iPhone ou não abre
- Vá em **Ajustes > Geral > VPN e Gerenciamento de Dispositivos**
- Confie no certificado do desenvolvedor
- **IMPORTANTE:** Se o app foi instalado mas não abre, você PRECISA confiar no certificado manualmente no iPhone

### Erro: "Unable to launch... invalid code signature"
- Isso significa que o app foi instalado, mas você precisa confiar no certificado
- Siga os passos acima para confiar no certificado
- Depois disso, o app deve abrir normalmente


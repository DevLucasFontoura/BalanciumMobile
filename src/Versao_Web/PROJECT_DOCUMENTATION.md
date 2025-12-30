# 📚 Documentação Completa - Balancium v2

Uma plataforma moderna de gestão financeira pessoal desenvolvida com Next.js, React e Supabase.

## 📋 Índice

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Tecnologias](#tecnologias)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Configuração e Instalação](#configuração-e-instalação)
5. [Banco de Dados](#banco-de-dados)
6. [Sistema de Assinaturas](#sistema-de-assinaturas)
7. [Integração Asaas](#integração-asaas)
8. [Arquitetura](#arquitetura)
9. [Deploy](#deploy)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Sobre o Projeto

O Balancium é uma aplicação web completa para gestão financeira pessoal, oferecendo uma interface intuitiva e recursos avançados para ajudar os usuários a organizarem suas finanças de forma eficiente.

### Funcionalidades Principais

- ✅ **Dashboard Financeiro**: Visualização de gráficos e análises financeiras em tempo real
- ✅ **Análise Mensal**: Acompanhamento detalhado de transações por mês
- ✅ **Gestão de Transações**: Registro completo de entradas e saídas financeiras
- ✅ **Categorias Personalizadas**: Criação e gerenciamento de categorias com cores customizadas (Plus/Premium)
- ✅ **Planos de Assinatura**: Sistema completo de planos (Básico, Plus, Premium)
- ✅ **Assinaturas Recorrentes**: Integração com Asaas para pagamentos mensais
- ✅ **Configurações**: Gerenciamento completo de conta, assinatura e preferências
- ✅ **Autenticação**: Sistema completo de login, registro e recuperação de senha
- ✅ **Histórico de Assinaturas**: Visualização completa do histórico de planos
- ✅ **Notificações**: Sistema de notificações para eventos importantes

---

## 🛠️ Tecnologias

### Frontend
- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework de estilização
- **CSS Modules** - Estilização modular por componente
- **Recharts** - Biblioteca para gráficos e visualizações
- **Lucide React** - Ícones modernos
- **Motion** - Animações e transições
- **OGL** - WebGL para efeitos visuais

### Backend & Banco de Dados
- **Supabase** - Backend as a Service (autenticação e banco de dados)
- **PostgreSQL** - Banco de dados relacional
- **Row Level Security (RLS)** - Segurança no nível de linha

### Pagamentos
- **Asaas API** - Gateway de pagamentos para assinaturas recorrentes
- **Webhooks** - Notificações em tempo real de eventos de pagamento

---

## 📁 Estrutura do Projeto

```
balancium-v2/
├── src/
│   ├── app/                              # Rotas e páginas (App Router)
│   │   ├── (private)/                   # Rotas protegidas (requer autenticação)
│   │   │   ├── Dashboard/              # Dashboard principal
│   │   │   ├── Monthly/                # Análise mensal
│   │   │   ├── Settings/               # Configurações
│   │   │   └── Welcome/                # Página de boas-vindas
│   │   ├── (public)/                   # Rotas públicas
│   │   │   ├── HomePage/              # Página inicial
│   │   │   ├── Login/                 # Login
│   │   │   ├── Register/              # Registro
│   │   │   ├── Price/                 # Planos e preços
│   │   │   └── Help/                  # Central de ajuda
│   │   ├── api/                        # API Routes
│   │   │   ├── payments/              # Endpoints de pagamentos
│   │   │   │   ├── verify/            # Verificação de pagamentos
│   │   │   │   └── create/            # Criação de pagamentos
│   │   │   ├── subscriptions/         # Endpoints de assinaturas
│   │   │   │   ├── create/            # Criação de assinaturas
│   │   │   │   └── history/           # Histórico de assinaturas
│   │   │   └── webhooks/              # Webhooks
│   │   │       └── asaas/             # Webhook do Asaas
│   │   ├── layout.tsx                 # Layout principal
│   │   └── globals.css                # Estilos globais
│   ├── components/                     # Componentes reutilizáveis
│   │   ├── Cards/                     # Componentes de card
│   │   ├── Charts/                    # Componentes de gráficos
│   │   ├── Menus/                     # Componentes de menu
│   │   └── Tables/                    # Componentes de tabela
│   ├── lib/                           # Utilitários e serviços
│   │   ├── services/                  # Serviços de negócio
│   │   │   ├── subscription/         # Serviços de assinatura (modular)
│   │   │   │   ├── subscription.service.ts
│   │   │   │   ├── subscription.repository.ts
│   │   │   │   ├── subscription.plan.service.ts
│   │   │   │   ├── subscription.basic.service.ts
│   │   │   │   └── subscription.paid.service.ts
│   │   │   ├── asaasService.ts       # Integração com Asaas
│   │   │   ├── profilesService.ts    # Perfis de usuário
│   │   │   └── transactionsService.ts # Transações
│   │   ├── contexts/                  # Contextos React
│   │   │   ├── PlanContext.tsx       # Contexto de planos
│   │   │   ├── UserProfileContext.tsx # Contexto de perfil
│   │   │   └── SnackbarContext.tsx   # Notificações
│   │   ├── hooks/                     # Hooks customizados
│   │   ├── Data/                      # Dados estáticos (JSON)
│   │   └── constants/                 # Constantes
│   └── types/                         # Tipos TypeScript
├── sql/                               # Scripts SQL
│   ├── add-pending-payment-status.sql
│   ├── fix-unique-active-subscription-constraint.sql
│   └── ...
├── md/                                # Documentação
│   ├── PROJECT_DOCUMENTATION.md      # Esta documentação
│   ├── CONFIGURAR_WEBHOOK_ASAAS.md   # Guia de webhook
│   └── CHANGE_PLAN_DOCUMENTATION.md  # Documentação de mudança de planos
├── public/                            # Arquivos estáticos
└── package.json                       # Dependências
```

---

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase
- Conta no Asaas (sandbox ou produção)

### Passo 1: Clonar o Repositório

```bash
git clone <repository-url>
cd balancium-v2
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

# Asaas
ASAAS_API_TOKEN=seu_token_asaas
ASAAS_API_URL=https://sandbox.asaas.com/api/v3  # Sandbox
# ASAAS_API_URL=https://www.asaas.com/api/v3    # Produção
```

### Passo 4: Configurar Banco de Dados

Execute os scripts SQL necessários no Supabase SQL Editor (veja seção [Banco de Dados](#banco-de-dados)).

### Passo 5: Executar o Projeto

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

---

## 💾 Banco de Dados

### Estrutura de Tabelas

O projeto utiliza tabelas com prefixo `B_` para organização:

#### Tabelas Principais

- **`B_PROFILES`** - Perfis de usuário
  - `id` (UUID, PK, FK para auth.users)
  - `name` (TEXT)
  - `email` (TEXT)
  - `asaas_customer_id` (TEXT) - ID do cliente no Asaas
  - `preferences` (JSONB)
  - `created_at`, `updated_at` (TIMESTAMP)

- **`B_PLANS`** - Planos de assinatura
  - `id` (UUID, PK)
  - `name` (TEXT) - 'Básico', 'Plus', 'Premium'
  - `description` (TEXT)
  - `price` (DECIMAL)
  - `period` (TEXT) - 'para sempre', 'por mês', 'por ano'
  - `features` (JSONB)
  - `popular` (BOOLEAN)

- **`B_USER_SUBSCRIPTIONS`** - Assinaturas dos usuários
  - `id` (UUID, PK)
  - `user_id` (UUID, FK para auth.users)
  - `plan_id` (UUID, FK para B_PLANS)
  - `status` (TEXT) - 'active', 'cancelled', 'expired', 'pending_payment'
  - `start_date` (TIMESTAMP)
  - `end_date` (TIMESTAMP, nullable)
  - `asaas_subscription_id` (TEXT) - ID da assinatura no Asaas
  - `created_at`, `updated_at` (TIMESTAMP)

- **`B_TRANSACTIONS`** - Transações financeiras
  - `id` (UUID, PK)
  - `user_id` (UUID, FK)
  - `type` (TEXT) - 'income', 'expense'
  - `amount` (DECIMAL)
  - `description` (TEXT)
  - `category_id` (UUID, FK)
  - `date` (DATE)
  - `created_at`, `updated_at` (TIMESTAMP)

- **`B_CATEGORIES`** - Categorias personalizadas
  - `id` (UUID, PK)
  - `user_id` (UUID, FK)
  - `name` (TEXT)
  - `color` (TEXT)
  - `icon` (TEXT)
  - `created_at`, `updated_at` (TIMESTAMP)

- **`B_NOTIFICATIONS`** - Notificações
  - `id` (UUID, PK)
  - `user_id` (UUID, FK)
  - `type` (TEXT)
  - `title` (TEXT)
  - `message` (TEXT)
  - `read` (BOOLEAN)
  - `created_at` (TIMESTAMP)

### Scripts SQL Necessários

Execute os seguintes scripts na ordem:

1. **Estrutura Base** (se não existir):
   - `sql/B_PLANS-table.sql` - Criação da tabela de planos
   - `sql/create-notifications-table.sql` - Tabela de notificações

2. **Campos Adicionais**:
   - `sql/add-asaas-customer-id.sql` - Adiciona `asaas_customer_id` em `B_PROFILES`
   - `sql/add-asaas-subscription-id.sql` - Adiciona `asaas_subscription_id` em `B_USER_SUBSCRIPTIONS`
   - `sql/add-pending-payment-status.sql` - Adiciona status `pending_payment`
   - `sql/add-preferences-to-profiles.sql` - Adiciona campo `preferences`

3. **Constraints e Índices**:
   - `sql/fix-unique-active-subscription-constraint.sql` - Constraint única para assinaturas ativas

4. **RLS (Row Level Security)**:
   - Configurar políticas RLS para todas as tabelas

### Views Úteis

- **`v_user_current_plan`** - View para buscar o plano atual do usuário
  ```sql
  SELECT * FROM v_user_current_plan WHERE user_id = '...';
  ```

### ⚠️ Importante: Nomes de Tabelas

No PostgreSQL/Supabase, **sempre use aspas duplas** para manter maiúsculas:

```sql
-- ✅ CORRETO
SELECT * FROM public."B_USER_SUBSCRIPTIONS";

-- ❌ ERRADO (converte para minúsculo)
SELECT * FROM public.B_USER_SUBSCRIPTIONS;
```

---

## 💳 Sistema de Assinaturas

### Status de Assinatura

- **`active`** - Assinatura ativa e funcionando
- **`pending_payment`** - Aguardando confirmação de pagamento
- **`cancelled`** - Assinatura cancelada
- **`expired`** - Assinatura expirada

### Planos Disponíveis

1. **Básico** (Gratuito)
   - Recursos básicos
   - Sem assinatura recorrente
   - Sempre disponível

2. **Plus** (R$ 9,90/mês)
   - Todos os recursos do Básico
   - Categorias personalizadas
   - Edição de transações
   - Relatórios avançados

3. **Premium** (R$ 19,90/mês)
   - Todos os recursos do Plus
   - Exportação de dados
   - Anexos de arquivos
   - Suporte prioritário

### Fluxo de Assinatura

1. **Usuário seleciona plano** → Sistema cria assinatura com status `pending_payment`
2. **Asaas cria assinatura recorrente** → Retorna `subscription_id`
3. **Usuário faz pagamento** → Asaas confirma pagamento
4. **Webhook recebe notificação** → Sistema ativa assinatura (`pending_payment` → `active`)
5. **Sistema atualiza automaticamente** → Plano ativo no sistema

### Arquitetura Modular

O sistema de assinaturas foi desenvolvido de forma modular:

```
subscription/
├── subscription.service.ts          # Orquestrador principal
├── subscription.repository.ts       # Operações de banco de dados
├── subscription.plan.service.ts     # Lógica de planos
├── subscription.basic.service.ts    # Lógica do plano Básico
└── subscription.paid.service.ts     # Lógica de planos pagos
```

### Regras de Negócio

- ✅ Um usuário pode ter múltiplas assinaturas (histórico)
- ✅ Apenas uma assinatura pode estar `active` por usuário
- ✅ Ao mudar de plano, a assinatura atual é marcada como `cancelled`
- ✅ Sempre criar novo registro (nunca reutilizar registros antigos)
- ✅ Assinaturas `pending_payment` são ativadas automaticamente após pagamento

---

## 🔗 Integração Asaas

### Configuração

1. **Criar conta no Asaas** (sandbox ou produção)
2. **Obter API Token** no painel do Asaas
3. **Configurar variáveis de ambiente** (veja [Configuração](#configuração-e-instalação))

### Serviço Asaas

Localização: `src/lib/services/asaasService.ts`

Principais métodos:
- `createCustomer()` - Cria cliente no Asaas
- `createSubscription()` - Cria assinatura recorrente
- `cancelSubscription()` - Cancela assinatura
- `getPayment()` - Busca informações de pagamento
- `getPaymentsByCustomer()` - Lista pagamentos do cliente

### API Routes

#### `/api/subscriptions/create`
Cria assinatura recorrente no Asaas e no banco local com status `pending_payment`.

**Request:**
```json
POST /api/subscriptions/create
Headers: {
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
Body: {
  "planName": "Plus"
}
```

#### `/api/payments/verify`
Verifica pagamentos pendentes e processa assinaturas `pending_payment`.

**Request:**
```json
POST /api/payments/verify
Headers: {
  "Authorization": "Bearer <token>"
}
```

#### `/api/webhooks/asaas`
Endpoint para receber notificações do Asaas.

**Eventos processados:**
- `PAYMENT_CONFIRMED` - Ativa assinatura `pending_payment`
- `PAYMENT_RECEIVED` - Ativa assinatura `pending_payment`
- `SUBSCRIPTION_CANCELLED` - Cancela assinatura no banco
- `SUBSCRIPTION_EXPIRED` - Marca assinatura como expirada

### Webhook

Para configurar o webhook, consulte: `md/CONFIGURAR_WEBHOOK_ASAAS.md`

**URL do Webhook:** `https://seu-dominio.com/api/webhooks/asaas`

**Eventos necessários:**
- ✅ `PAYMENT_RECEIVED`
- ✅ `PAYMENT_CONFIRMED`
- ✅ `SUBSCRIPTION_CREATED`
- ✅ `SUBSCRIPTION_ACTIVATED`
- ✅ `SUBSCRIPTION_CANCELLED`
- ✅ `SUBSCRIPTION_EXPIRED`

### Verificação Automática

O sistema verifica automaticamente pagamentos pendentes:
- Na tela de **Settings** ao carregar
- A cada 30 segundos se houver pagamento pendente
- Quando o webhook não está disponível (fallback)

---

## 🏗️ Arquitetura

### Contextos React

#### PlanContext
Gerencia o plano atual do usuário com cache e atualização automática.

```typescript
const { plan, updatePlan, refreshPlan } = usePlan();
```

#### UserProfileContext
Gerencia o perfil do usuário com cache local.

```typescript
const { profile, updateProfile, refreshProfile } = useUserProfileContext();
```

#### SnackbarContext
Sistema de notificações toast.

```typescript
const { showSnackbar } = useSnackbar();
showSnackbar("Mensagem", "success" | "error" | "info");
```

### Hooks Customizados

- `useAsaasPayment` - Gerenciamento de pagamentos Asaas
- `useChangeSubscriptionPlan` - Mudança de planos com proteção contra race conditions
- `useScrollLock` - Bloqueio de scroll em modais

### Serviços

Todos os serviços estão em `src/lib/services/`:

- **Subscription Services** - Sistema completo de assinaturas (modular)
- **AsaasService** - Integração com API do Asaas
- **ProfilesService** - Gerenciamento de perfis
- **TransactionsService** - Operações de transações
- **NotificationsService** - Sistema de notificações
- **AccountService** - Operações de conta (exclusão, etc)

---

## 🚀 Deploy

### Pré-requisitos

- Conta no Vercel (ou outro provedor)
- Variáveis de ambiente configuradas
- Banco de dados Supabase configurado
- Webhook do Asaas configurado

### Variáveis de Ambiente no Deploy

Configure as seguintes variáveis no painel do provedor:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ASAAS_API_TOKEN
ASAAS_API_URL
```

### Build

```bash
npm run build
```

### URL do Webhook em Produção

Após o deploy, configure o webhook no Asaas:

```
https://seu-dominio.com/api/webhooks/asaas
```

---

## 🐛 Troubleshooting

### Problema: Assinatura não está ativando após pagamento

**Solução:**
1. Verifique se o webhook está configurado no Asaas
2. Verifique os logs do servidor para erros
3. Use "Verificar Pagamentos" na tela de Settings como fallback
4. Verifique se o status da assinatura no banco está `pending_payment`

### Problema: Erro "unique_active_subscription" constraint

**Solução:**
Execute o script: `sql/fix-unique-active-subscription-constraint.sql`

### Problema: Erro "pending_payment status not allowed"

**Solução:**
Execute o script: `sql/add-pending-payment-status.sql`

### Problema: Webhook não está sendo chamado

**Solução:**
1. Verifique se a URL está correta no painel do Asaas
2. Em desenvolvimento, use ngrok ou localtunnel
3. Verifique os logs do Asaas para erros de chamada

### Problema: Plano não está sendo atualizado na UI

**Solução:**
1. Verifique se o `PlanContext` está sendo usado corretamente
2. Chame `refreshPlan()` após mudanças
3. Verifique o cache do navegador

---

## 📚 Documentação Adicional

- **Configuração de Webhook:** `md/CONFIGURAR_WEBHOOK_ASAAS.md`
- **Mudança de Planos:** `md/CHANGE_PLAN_DOCUMENTATION.md`

---

## 📝 Licença

[Adicione informações de licença aqui]

---

## 👥 Contribuindo

[Adicione informações sobre contribuição aqui]

---

**Última atualização:** Janeiro 2025


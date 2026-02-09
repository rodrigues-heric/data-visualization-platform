# Data Visualization Platform

Uma plataforma moderna de visualização e exploração de dados públicos da Cidade de Chicago, construída com React e tecnologias web atuais.

## Visão Geral

### O que é este projeto?

A **Data Visualization Platform** é uma aplicação web intuitiva que permite explorar dados públicos da Cidade de Chicago de forma interativa e fácil de usar. Foi desenvolvida especialmente para analisar informações sobre:

- **Consumo de Energia**: Dados detalhados sobre consumo de eletricidade e gás em edifícios da cidade
- **Educação**: Informações sobre escolas públicas e características das instituições escolares

### Principais Benefícios

**Fácil de Usar**: Interface limpa e responsiva que funciona em qualquer dispositivo (desktop, tablet, smartphone)

**Visualização Dinâmica**: Navegue pelos dados com paginação e selecione quais colunas deseja visualizar

**Ambiente Multilingue**: Suporte para português e inglês - ideal para diferentes perfis de usuário

**Rápido e Responsivo**: Carregamento otimizado com caching inteligente de dados

### Casos de Uso

- **Analistas de Sustentabilidade**: Estudar padrões de consumo de energia na cidade
- **Pesquisadores Educacionais**: Analisar dados demográficos e características de escolas
- **Formuladores de Políticas**: Base factual para decisões sobre infraestrutura e educação
- **Comunidade em Geral**: Acesso público a informações governamentais transparentes

## Visão Técnica

### Arquitetura da Aplicação

A aplicação segue uma arquitetura moderna baseada em componentes React com separação clara de responsabilidades:

```
frontend/
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── pages/        # Componentes de página (Home, Dashboards)
│   │   ├── dashboard/    # Componentes específicos de dashboard
│   │   ├── ui/           # Componentes UI base (Button, Card, Table, etc)
│   │   ├── layout/       # Componentes de layout (FadeIn)
│   │   └── context/      # Context API para estado global (Configurações)
│   ├── services/         # Serviços de API (chicagoAPI.service.ts)
│   ├── hooks/            # Custom hooks (useChicagoData)
│   ├── interfaces/       # Tipos TypeScript (ChicagoFacility, ChicagoSchool)
│   ├── locales/          # Internacionalização (i18n)
│   ├── constants/        # Constantes da aplicação
│   └── lib/              # Utilitários (utils.ts)
```

### Stack Tecnológico

| Camada                  | Tecnologia        | Versão  | Propósito                           |
| ----------------------- | ----------------- | ------- | ----------------------------------- |
| **Framework**           | React             | 19.2.0  | Renderização de UI                  |
| **Build**               | Vite              | 5.x     | Build otimizado e dev server rápido |
| **Linguagem**           | TypeScript        | 5.9.3   | Type safety e melhor DX             |
| **State Management**    | React Query       | 5.90.20 | Gerenciamento de dados assincronos  |
| **Roteamento**          | React Router      | 7.13.0  | Navegação client-side               |
| **Styling**             | TailwindCSS       | 4.1.18  | Utility-first CSS                   |
| **UI Components**       | Radix UI + shadcn | -       | Componentes acessíveis              |
| **Internacionalização** | i18n              | -       | Suporte multilíngue                 |
| **Linting**             | ESLint            | 9.39.1  | Code quality                        |

### Fluxo de Dados

```
API Chicago (city of chicago org)
    ↓
chicagoAPI.service.ts (fetch + tipagem)
    ↓
useChicagoData.hook.ts (React Query)
    ↓
DashboardEnergy/DashboardSchool (componentes)
    ↓
UI Components (Table, Pagination, etc)
```

### Datasets Utilizados

#### 1. **Chicago Building Energy Data**

- **Endpoint**: `data.cityofchicago.org/resource/8yq3-m6wp.json`
- **Dados Principais**:
  - Consumo mensal de eletricidade (kWh)
  - Consumo de gás
  - Dados da construção (idade, área, tipo)
  - Quartis de consumo
  - Informações por área comunitária

#### 2. **Chicago Schools Data**

- **Endpoint**: `data.cityofchicago.org/resource/d7as-muwj.json`
- **Dados Principais**:
  - Informações sobre instituições escolares
  - Características demográficas
  - Localização e identificação

### Funcionalidades Implementadas

- ✅ **Paginação**: Limite de PAGE_LIMIT registros por página (otimizado para performance)
- ✅ **Seleção de Colunas**: Configure quais dados visualizar (via `configureColumns.component`)
- ✅ **Context API**: Gerenciar estado de configurações globais (`settingsContext`)
- ✅ **React Query**: Caching automático, retry logic e refetch otimizado
- ✅ **Type-Safety**: Interfaces TypeScript bem definidas para cada dataset
- ✅ **Responsividade**: Design Mobile-first com TailwindCSS
- ✅ **Acessibilidade**: Componentes Radix UI (WAI-ARIA compliant)
- ✅ **i18n**: Suporte português (pt-BR) e inglês (en)

### Padrões e Boas Práticas

1. **Separação de Responsabilidades**: Services → Hooks → Components
2. **Type Safety**: Uso extensivo de TypeScript com interfaces bem definidas
3. **Component Composition**: Componentização modular e reutilizável
4. **Performance**: React Query com caching, lazy loading de rotas
5. **Code Quality**: ESLint + Prettier configurados
6. **Internacionalização**: i18n estruturado para fácil manutenção

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js**: v18.0.0 ou superior
- **npm** ou **yarn**: Gerenciador de pacotes

### Instalação

1. **Clone o repositório**:

```bash
git clone https://github.com/rodrigues-heric/data-visualization-platform.git
cd data-visualization-platform
```

2. **Instale as dependências**:

```bash
cd frontend
npm install
```

### Execução em Desenvolvimento

Execute a aplicação em modo de desenvolvimento com hot-reload:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

### Build para Produção

Gere a build otimizada para produção:

```bash
npm run build
```

Os arquivos compilados serão gerados na pasta `dist/`.

### Visualizar Build de Produção

Para testar a build de produção localmente:

```bash
npm run preview
```

### Linting e Code Quality

Verificar problemas de código:

```bash
npm run lint
```

## Estrutura de Pastas Detalhada

```
frontend/
├── src/
│   ├── components/
│   │   ├── context/
│   │   │   └── settingsContext.tsx         # Context para configurações globais
│   │   ├── dashboard/
│   │   │   ├── configureColumns.component.tsx  # Seletor de colunas
│   │   │   └── footer.component.tsx            # Footer do dashboard
│   │   ├── layout/
│   │   │   └── fadeIn.tsx                  # Animação FadeIn
│   │   ├── pages/
│   │   │   ├── home.tsx                    # Página inicial
│   │   │   ├── dashboardEnergy.component.tsx   # Dashboard de energia
│   │   │   ├── dashboardSchool.component.tsx   # Dashboard de escolas
│   │   │   ├── detailsEnergy.component.tsx     # Detalhes de energia
│   │   │   ├── detailsSchool.component.tsx     # Detalhes de escolas
│   │   │   ├── header.tsx                  # Header da aplicação
│   │   │   └── footer.tsx                  # Footer global
│   │   └── ui/                             # Componentes UI base (Radix + shadcn)
│   │       ├── badge.tsx, button.tsx, card.tsx, etc.
│   ├── services/
│   │   └── chicagoAPI.service.ts           # Fetch com tipagem dos endpoints
│   ├── hooks/
│   │   └── useChicagoData.hook.ts          # Hook customizado (React Query)
│   ├── interfaces/
│   │   ├── chicagoFacility.interface.ts    # Tipo para dados de energia
│   │   └── chicagoSchool.interface.ts      # Tipo para dados de escolas
│   ├── locales/
│   │   ├── en.json                         # Traduções em inglês
│   │   ├── pt-BR.json                      # Traduções em português
│   │   └── i18n.ts                         # Configuração i18n
│   ├── constants/
│   │   └── pagination.ts                   # Constantes de paginação
│   ├── lib/
│   │   └── utils.ts                        # Funções utilitárias
│   ├── App.tsx                             # App root com rotas
│   ├── main.tsx                            # Entry point
│   └── index.css                           # Estilos globais
├── vite.config.ts                          # Configuração Vite
├── tsconfig.json                           # Configuração TypeScript
├── package.json                            # Dependências e scripts
└── README.md                               # Este arquivo
```

## Licença

Veja o arquivo LICENSE para mais informações.

Desenvolvido por Heric Leite Rodrigues

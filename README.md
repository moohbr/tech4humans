# Tech4Humans - Desafio Web APP

Entrega para o desafio WebApp do TechLab 2025 by Tech4Humans/CEU-UNIFEI.

## Como rodar o projeto

### Pré-requisitos

- Node.js (versão ^22.16.0)
- Yarn (versão ^1.22.22)
- SQLite3

### Configuração do ambiente

1. Clone o repositório e instale as dependências:
```bash
yarn install
```

2. Configure as variáveis de ambiente:

Backend (`.env` na pasta `backend`):
```env
DATABASE_PATH=db.sqlite
APP_PORT=8080
APP_HOST=0.0.0.0
JWT_SECRET=your_secret_key
NODE_ENV=development
SESSION_SECRET=your_session_secret
```

Frontend (`.env` na pasta `frontend`):
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

3. Crie o arquivo do sqlite na pasta `backend`:
```bash
cd backend
touch db.sqlite
```

4. Execute as migrações do banco de dados na pasta `backend`:
```bash
cd backend
yarn migration:run
```

### Executando o projeto

1. Inicie o backend:
```bash
yarn dev:backend
```

2. Em outro terminal, inicie o frontend:
```bash
yarn dev:frontend
```

O frontend estará disponível em `http://localhost:5173` e o backend em `http://localhost:8080`.

## Sobre

Uma aplicação financeira completa que permite:
- Criar e gerenciar contas bancárias
- Realizar transferências entre contas com validação de saldo
- Visualizar histórico detalhado de transações
- Autenticação segura de usuários com JWT
- Interface responsiva e intuitiva

### Decisões Técnicas Importantes

#### Representação Monetária

Uma das decisões mais críticas no desenvolvimento de sistemas financeiros é como representar valores monetários. Neste projeto, optei por utilizar **valores inteiros em centavos** em toda a aplicação, tanto no backend quanto no frontend.

##### Por que usar inteiros para valores monetários?

1. **Precisão Matemática**: Números de ponto flutuante (float/double) sofrem de problemas de precisão em operações matemáticas. Por exemplo, `0.1 + 0.2` em JavaScript resulta em `0.30000000000000004`, não `0.3`.

2. **Consistência Financeira**: Em sistemas bancários reais, todos os cálculos são feitos em centavos para evitar erros de arredondamento que podem resultar em diferenças financeiras significativas.

3. **Conformidade Regulatória**: Muitas regulamentações financeiras exigem precisão absoluta em cálculos monetários, o que é garantido pelo uso de inteiros.

4. **Performance**: Operações com inteiros são mais rápidas que operações com ponto flutuante.

##### Implementação no Projeto

- **Armazenamento**: Todos os valores são armazenados no banco de dados como inteiros (centavos)
- **API**: As APIs recebem e retornam valores em centavos
- **Frontend**: A conversão para formato de exibição (reais) acontece apenas na camada de apresentação
- **Cálculos**: Todas as operações matemáticas (transferências, validações de saldo) são feitas com inteiros

##### Exemplo Prático

```javascript
// Valor armazenado: 150000 (representa R$ 1.500,00)
// Exibição: formatCurrency(150000) → "R$ 1.500,00"
// Operação: transferir R$ 500,00 → 150000 - 50000 = 100000
```

Esta abordagem garante que nunca haverá erros de precisão em operações financeiras, mantendo a integridade dos dados em todas as camadas da aplicação.

### Arquitetura e Design

O projeto utiliza Domain-Driven Design (DDD) com foco em:
- Separação clara de responsabilidades
- Modelagem de domínio eficiente
- Clean Architecture
- Princípios SOLID
- Arquitetura Hexagonal (Ports and Adapters)

### Estrutura do Backend

#### Models

Os `models` representam o coração da arquitetura do backend, seguindo rigorosamente os princípios do Domain-Driven Design (DDD). Esta camada contém:

- **Entidades de Domínio**: Classes que representam os objetos centrais do negócio com suas regras e comportamentos intrínsecos
- **Value Objects**: Objetos imutáveis que encapsulam conceitos específicos do domínio com validações próprias
- **Agregados**: Grupos coesos de entidades e value objects tratados como uma unidade transacional
- **Regras de Negócio**: Validações e lógicas específicas do domínio financeiro

##### Modelos Principais

- **Account**: Entidade que representa uma conta bancária com validações de saldo e operações
- **Bank**: Entidade que representa uma instituição bancária
- **User**: Entidade que representa um usuário do sistema com autenticação
- **Transaction**: Entidade que representa uma transação financeira com rastreabilidade completa
- **Base**: Entidade base com funcionalidades comuns (timestamps, IDs)

##### Exemplo de Estrutura: Model Account

A pasta `account` exemplifica a organização completa do domínio:

**entity/**
- Contém a definição da entidade Account com atributos e comportamentos
- Implementa regras de negócio específicas (validação de saldo, limites)
- Mantém consistência e integridade dos dados
- Gerencia estado interno da conta

**factory/**
- Implementa o padrão Factory para criação controlada de contas
- Encapsula lógica complexa de instanciação
- Garante criação em estado válido e consistente
- Aplica regras de negócio durante a criação

**repository/**
- Define interfaces abstratas de persistência
- Abstrai completamente os detalhes de armazenamento
- Permite substituição de implementações sem impacto no domínio
- Suporte a operações CRUD e consultas específicas

**schemas/**
- Esquemas de validação robustos usando Zod
- Validação de entrada de dados em múltiplas camadas
- Transformação e normalização de dados
- Mensagens de erro padronizadas

**value-objects/**
- Objetos imutáveis como AccountNumber, Balance, Currency
- Encapsulam regras de validação específicas do domínio
- Garantem integridade e consistência de dados críticos
- Implementam comportamentos específicos (formatação, comparação)

#### Services

Os serviços estão organizados em `domain/services` seguindo DDD, com foco no serviço de autenticação como exemplo principal:

##### AuthService

Serviço especializado em segurança e autenticação com implementação robusta:

**Gerenciamento Seguro de Senhas**
- `hashPassword(raw: string)`: Criptografia using bcrypt com salt factor 12
- `comparePassword(raw: string, hash: string)`: Verificação temporal segura
- Proteção contra ataques de timing e força bruta

**Gerenciamento de Tokens JWT**
- `generateToken(user)`: Criação de tokens com payload mínimo e seguro
- `verifyToken(token)`: Validação rigorosa com verificação de integridade
- Tokens com expiração configurável (1 hora padrão)
- Uso de chaves secretas robustas via variáveis de ambiente

**Integração com Casos de Uso**
O AuthService é utilizado principalmente no LoginUseCase, demonstrando integração limpa:

1. Validação de credenciais de entrada
2. Verificação de existência do usuário
3. Comparação segura de senhas
4. Geração de token JWT para sessão autenticada
5. Retorno de dados de autenticação estruturados

**Práticas de Segurança Implementadas**
- Hash de senhas com bcrypt e salt alto
- Tokens JWT com tempo de vida limitado
- Logging de eventos de segurança para auditoria
- Validação rigorosa de entrada usando schemas Zod
- Tratamento seguro de erros sem vazamento de informações

#### Use Cases

Implementação do padrão **Command Pattern** com **Request-Response Cycle**, seguindo Clean Architecture:

##### Estrutura do Padrão

**Use Case (Command)**
- Classe focada em uma única responsabilidade de negócio
- Método `execute` como ponto de entrada único
- Gerenciamento transacional completo
- Tratamento estruturado de erros e logging

**Request**
- Encapsulamento completo de dados de entrada
- Validação em múltiplas camadas usando Zod
- Conversão automática para Value Objects
- Getters tipados para acesso seguro

**Response**
- Padronização de retorno com BaseResponse/EntityResponse
- Status de operação (sucesso/falha) bem definidos
- Mensagens de erro estruturadas e internationalizáveis
- Dados tipados de retorno

**Interfaces**
- Contratos bem definidos para inversão de dependência
- Facilita criação de mocks para testes
- Garante consistência de implementação
- Suporte a decorators e middlewares

##### Benefícios Arquiteturais

- **Isolamento Completo**: Cada caso de uso é independente e autocontido
- **Testabilidade Máxima**: Estrutura facilita testes unitários, integração e E2E
- **Validação Robusta**: Múltiplas camadas de validação garantem integridade
- **Tipagem Forte**: TypeScript fornece segurança em toda cadeia de execução
- **Observabilidade**: Sistema de logging integrado para rastreabilidade completa

#### Infrastructure

Implementação da **Arquitetura Hexagonal** completa, isolando o domínio de dependências externas:

##### Estrutura de Adaptadores

**Datasources (TypeORM)**
- Implementação concreta de repositórios
- Gerenciamento de conexões e transações
- Mapeamento objeto-relacional otimizado
- Suporte a migrações automáticas

**HTTP Layer**
- API REST completa com OpenAPI/Swagger
- Middlewares de autenticação JWT
- Validação de entrada padronizada
- Tratamento de erros HTTP estruturado
- Rate limiting e throttling

**Dependency Injection**
- Container IoC completo
- Gerenciamento automático de ciclo de vida
- Resolução de dependências em tempo de execução
- Suporte a decorators e providers

**Logging System**
- Sistema estruturado de logs
- Múltiplos transportes (console, arquivo, remoto)
- Correlação de requests
- Métricas de performance integradas

##### Por que esta Arquitetura Complexa?

A decisão de implementar uma arquitetura robusta e aparentemente "over-engineered" foi intencional e estratégica:

**Demonstração de Expertise Técnica**
Esta estrutura serve como showcase de conhecimentos avançados em engenharia de software, demonstrando capacidade de implementar padrões arquiteturais complexos de forma coerente e funcional.

**Escalabilidade Futura**
Embora o projeto atual seja relativamente simples, a arquitetura permite evolução orgânica para sistemas muito mais complexos sem necessidade de refatorações massivas.

**Manutenibilidade Premium**
A separação rigorosa de responsabilidades e a alta coesão dos módulos facilitam manutenção, debugging e adição de novas funcionalidades.

**Testabilidade Excepcional**
A estrutura permite testes em todos os níveis: unitários (domínio), integração (use cases), e E2E (API), com alta cobertura e confiabilidade.

**Padrões da Indústria**
Demonstra conhecimento prático de padrões utilizados em sistemas financeiros reais de alta escala e criticidade.

### Estrutura do Frontend

Arquitetura moderna de aplicação React com foco em reusabilidade, performance e manutenibilidade:

#### Organização de Componentes

**Componentes de Autenticação**
- `account-info-form`: Gerenciamento de informações de perfil do usuário
- `sign-in-form`: Interface de login com validação robusta
- `sign-up-form`: Registro de usuários com validação em tempo real
- `layout`: Componentes de layout responsivos para autenticação

**Componentes do Dashboard**
- `cards`: Componentes reutilizáveis para exibição de contas e transações
- `dialogs`: Modais para operações CRUD com validação
- `layout`: Layouts específicos do painel administrativo
- `sections`: Áreas de conteúdo principal organizadas

#### Gerenciamento de Estado

**Custom Hooks**
- `use-login`: Estado de autenticação com persistência segura
- `use-accounts`: Cache inteligente de dados de contas
- `use-banks`: Gerenciamento de dados bancários
- `use-transactions`: Estado e operações de transações com otimistic updates

**Stores Zustand**
- Estado global leve e performático
- Persistência seletiva de dados
- DevTools integradas para debugging

#### Integração com API

**Fetchers Organizados**
- Camada de abstração sobre fetch API
- Interceptors para autenticação automática
- Retry automático e tratamento de erros
- Cache e invalidação inteligente

**Tipagem Completa**
- Tipos TypeScript espelhando o backend
- Validação de runtime com Zod
- IntelliSense completo em toda aplicação

#### Benefícios da Arquitetura Frontend

**Performance Otimizada**
- Code splitting automático
- Lazy loading de componentes
- Memoização estratégica de componentes caros
- Virtual scrolling para listas grandes

**Developer Experience**
- Hot reload com estado preservado
- Debugging tools integradas
- Lint rules customizadas
- Pre-commit hooks para qualidade

**Acessibilidade**
- Componentes com ARIA labels completos
- Suporte a navegação por teclado
- Contraste e legibilidade otimizados
- Screen reader friendly

**Responsividade**
- Mobile-first design
- Breakpoints consistentes
- Touch-friendly interfaces
- Progressive Web App ready

## Garantia de Integridade de Dados

### Transações de Banco de Dados (ACID)

A aplicação implementa transações de banco de dados de forma rigorosa para garantir consistência e integridade dos dados financeiros. Todas as operações críticas são executadas dentro de transações que seguem as propriedades ACID:

#### Implementação de Transações

**Operações Transacionais Críticas:**
- Transferências entre contas (débito + crédito atômico)
- Criação de contas com saldo inicial
- Atualizações de perfil de usuário
- Operações de autenticação com logs de auditoria

**Exemplo de Transferência Transacional:**
```typescript
// TransferUseCase - Operação atômica crítica
async execute(request: TransferRequest): Promise<TransferResponse> {
  return await this.dataSource.transaction(async (manager) => {
    // 1. Validar saldo da conta origem
    const sourceAccount = await this.accountRepository.findById(request.sourceAccountId, manager);
    if (sourceAccount.balance < request.amount) {
      throw new InsufficientFundsError();
    }
    
    // 2. Debitar da conta origem
    await this.accountRepository.updateBalance(
      request.sourceAccountId, 
      sourceAccount.balance - request.amount, 
      manager
    );
    
    // 3. Creditar na conta destino
    const targetAccount = await this.accountRepository.findById(request.targetAccountId, manager);
    await this.accountRepository.updateBalance(
      request.targetAccountId, 
      targetAccount.balance + request.amount, 
      manager
    );
    
    // 4. Registrar transação
    const transaction = await this.transactionRepository.create({
      sourceAccountId: request.sourceAccountId,
      targetAccountId: request.targetAccountId,
      amount: request.amount,
      type: TransactionType.TRANSFER,
      status: TransactionStatus.COMPLETED
    }, manager);
    
    // Se qualquer operação falhar, toda a transação é revertida automaticamente
    return TransferResponse.success(transaction);
  });
}
```

#### Benefícios das Transações

**Atomicidade**: Operações de transferência são "tudo ou nada" - não existe estado intermediário onde apenas uma conta foi atualizada.

**Consistência**: Regras de negócio são sempre respeitadas - nunca haverá saldo negativo não autorizado ou transações parciais.

**Isolamento**: Operações simultâneas não interferem entre si - dois usuários transferindo da mesma conta não causam condições de corrida.

**Durabilidade**: Uma vez confirmada, a transação é permanente mesmo em caso de falha do sistema.

### Operações em Cascata (Cascade Operations)

O sistema implementa cascateamento inteligente para manter relacionamentos consistentes entre entidades:

#### Relacionamentos com Cascade

**User → Accounts (CASCADE SOFT DELETE)**
```typescript
@Entity('users')
export class UserEntity {
  @OneToMany(() => AccountEntity, account => account.user, {
    cascade: ['soft-remove'], // Cascade apenas para soft delete
    onDelete: 'NO ACTION' // Previne deleção acidental em nível de DB
  })
  accounts: AccountEntity[];
}
```

**Account → Transactions (CASCADE SOFT DELETE)**
```typescript
@Entity('accounts')
export class AccountEntity {
  @OneToMany(() => TransactionEntity, transaction => transaction.sourceAccount, {
    cascade: ['soft-remove'],
    onDelete: 'NO ACTION'
  })
  outgoingTransactions: TransactionEntity[];
  
  @OneToMany(() => TransactionEntity, transaction => transaction.targetAccount, {
    cascade: ['soft-remove'],
    onDelete: 'NO ACTION'
  })
  incomingTransactions: TransactionEntity[];
}
```

#### Estratégia de Cascateamento Defensivo

**Cascade Limitado**: Apenas operações de soft delete são cascateadas automaticamente, nunca hard deletes.

**Validação Prévia**: Antes de qualquer cascade, o sistema valida dependências e bloqueia operações que violem integridade.

**Logs de Auditoria**: Todas as operações em cascade são registradas para rastreabilidade completa.

### Deleção Lógica (Soft Delete)

#### Vantagens da Deleção Lógica

**Preservação de Histórico**: Transações financeiras nunca são perdidas, mesmo quando contas são "deletadas".

**Auditoria Completa**: Possibilidade de rastrear todas as operações, incluindo tentativas de deleção.

**Recuperação de Dados**: Capacidade de restaurar registros deletados acidentalmente.


#### Constraints e Validações

**Nível de Aplicação:**
- Validação de regras de negócio antes de qualquer operação
- Verificação de dependências entre entidades
- Validação de estados consistentes

**Nível de Banco:**
- Foreign keys com estratégias apropriadas
- Constraints de unicidade respeitando soft deletes
- Triggers para validações críticas


### Benefícios para Integridade dos Dados

**Consistência Garantida**: Transações ACID garantem que o estado do sistema seja sempre consistente, mesmo em caso de falhas.

**Rastreabilidade Completa**: Deleção lógica mantém histórico completo para auditoria e compliance.

**Recuperação Segura**: Possibilidade de desfazer operações sem perda de dados críticos.

Esta arquitetura de frontend complementa perfeitamente o design robusto do backend, resultando em uma aplicação completa, profissional e escalável que demonstra proficiência em desenvolvimento full-stack moderno.
# 🚀 Simplified Payment API

Este é um desafio de backend que consiste em desenvolver uma API RESTful para gerenciamento de movimentação financeira de usuários. A aplicação permite que os usuários depositem dinheiro em suas carteiras e realizem transferências entre si de forma segura e eficiente.

## 📌 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework TypeScript para desenvolvimento de APIs escaláveis.
- **[TypeORM](https://typeorm.io/)** - ORM para interação com bancos de dados relacionais.
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados utilizado na aplicação.
- **[Docker](https://www.docker.com/)** - Containerização do ambiente.
- **[Swagger (OpenAPI)](https://swagger.io/)** - Documentação da API.
- **[Vitest](https://vitest.dev/)** - Testes automatizados.

---

## ⚙️ Funcionalidades

- **Cadastro de Usuários**: Permite que usuários comuns e lojistas se cadastrem.
- **Depósito em Carteira**: Usuários podem adicionar saldo às suas carteiras.
- **Transferência de Valores**: Usuários comuns podem transferir dinheiro para outros usuários ou lojistas.
- **Consulta de Estatísticas**: Permite visualizar transferências recentes.
- **Integração com Serviços Externos**:
  - Validação de transações via serviço autorizador.
  - Notificação de transferências via serviço externo.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- **[Node.js](https://nodejs.org/)** (v20+)
- **[Docker e Docker Compose](https://www.docker.com/)**

### Configuração

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/patricks-js/simplified-payment-api.git
   cd simplified-payment-api
   ```

2. **Configure as variáveis de ambiente**:

   Crie um arquivo `.env` na raiz do projeto e adicione:

   ```bash
   DATABASE_URL=postgres://user:password@localhost:5432/simplified_payment
   AUTH_SERVICE_URL=https://util.devi.tools/api/v2/authorize
   NOTIFICATION_SERVICE_URL=https://util.devi.tools/api/v1/notify
   ```

3. **Suba os containers do banco de dados**:

   ```bash
   docker-compose up -d
   ```

4. **Instale as dependências**:

   ```bash
   pnpm install
   ```

5. **Execute as migrações do banco de dados**:

   ```bash
   pnpm db:migrate
   ```

6. **Inicie a aplicação**:

   ```bash
   pnpm start:dev
   ```

7. **Acesse a documentação da API** via Swagger:

   - `http://localhost:3000/api/docs`

---

## 📖 Endpoints Principais

### Cadastro de Usuário

**POST `/auth/register`**

- Registra um usuário no sistema.
- Tipos de usuários: **common** (pode transferir e receber) e **merchant** (somente recebe).

📍 **Exemplo de request**:

```json
{
  "name": "João da Silva",
  "document": "12345678900",
  "email": "joao@exemplo.com",
  "password": "senhaSegura123",
  "type": "common"
}
```

---

### Depósito em Carteira

**POST `/wallets/deposit`**

- Adiciona saldo à carteira do usuário.

📍 **Exemplo de request**:

```json
{
  "userId": 4,
  "amount": 150.0
}
```

---

### Transferência de Valores

**POST `/transactions/perform`**

- Realiza transferência de dinheiro entre usuários.

📍 **Exemplo de request**:

```json
{
  "amount": 100.0,
  "senderId": 4,
  "receiverId": 15
}
```

✅ **Fluxo da Transferência**:

1. Validação dos dados.
2. Verificação de saldo.
3. Consulta ao serviço autorizador externo.
4. Transação financeira segura.
5. Notificação ao recebedor.

---

### Consulta de Saldo

**GET `/users/balance`**

📍 **Exemplo de resposta**:

```json
{
  "userId": 4,
  "balance": 350.0
}
```

---

### Estatísticas de Transferências

**GET `/estatistica`**

📍 **Exemplo de resposta**:

```json
{
  "count": 10,
  "sum": 1000.0,
  "avg": 100.0,
  "min": 50.0,
  "max": 200.0
}
```

---

## ✅ Testes e Qualidade de Código

O projeto inclui testes unitários e de integração para garantir a qualidade do código.

### Executar testes

```bash
npm run test
```

### Executar testes com cobertura

```bash
npm run test:cov
```

---

## 📜 Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais informações.

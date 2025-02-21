# Simplified Payment API

Este desafio consiste em desenvolver uma API RESTful que gerencia a movimentação financeira dos usuários. A aplicação deve possibilitar que os usuários depositem dinheiro em suas carteiras e realizem transferências entre si, de forma simples e segura, seguindo regras de negócio claras.

## Requisitos Funcionais

- **Cadastro de Usuários:**
  - Usuários devem se cadastrar informando Nome Completo, CPF, e-mail e senha.
  - O sistema deve diferenciar dois perfis: *usuário comum* e *lojista*.

- **Movimentação de Carteira:**  
  - Usuários podem adicionar dinheiro às suas carteiras.
  - Usuários podem visualizar a movimentação de suas carteiras.

- **Transferência de Valores:**  
  - Usuários podem transferir dinheiro para outros usuários ou lojistas.
  - O pagador não pode ser um lojista (lojistas só podem receber transferências).

- **Consulta de Estatísticas:**  
  - Usuários podem obter estatísticas de transferências recentes (por exemplo, total transferido nos últimos 60 segundos).

- **Integração com Serviços Externos:**
  - Consultar um serviço autorizador externo para validar cada transferência antes de finalizá-la.
  - Após a transferência, enviar uma notificação para o recebedor utilizando um serviço de terceiros.

## Requisitos Não Funcionais

- **Qualidade do Código:**  
  - Código limpo, bem organizado e de fácil manutenção.
  - Adoção de princípios SOLID e design patterns quando apropriado.

- **Testes Automatizados:**  
  - Implementação de testes unitários e de integração que cubram os principais cenários e exceções.

- **Segurança:**  
  - Tratamento adequado de erros e validações robustas.
  - Garantir que dados sensíveis (como senhas) sejam armazenados de forma segura.

- **Containerização:**  
  - Possibilidade de empacotar a aplicação via Docker, facilitando a execução.

- **Observabilidade:**  
  - Inclusão de logs informativos e, se possível, um endpoint de _healthcheck_ para monitoramento da aplicação.

- **Documentação:**  
  - Uso de ferramentas como Swagger/OpenAPI para documentar a API.

## Regras de Negócio

- **Validação de Dados:**  
  - Todas as operações de transferência devem incluir dados obrigatórios: valor, identificador do pagador e do recebedor.
  - O valor transferido deve maior que zero.

- **Verificação de Saldo:**  
  - O sistema deve validar se o pagador possui saldo suficiente antes de realizar a transferência.
  
- **Perfil de Usuário:**  
  - Apenas usuários comuns podem enviar dinheiro; lojistas somente podem receber.

- **Autorização Externa:**  
  - Antes de confirmar a transferência, o sistema deve consultar um serviço autorizador (via chamada GET para [https://util.devi.tools/api/v2/authorize](https://util.devi.tools/api/v2/authorize)).

- **Transacionalidade:**  
  - A transferência deve ser tratada como uma operação transacional: se ocorrer qualquer erro (na autorização ou no processamento), a operação deve ser revertida e o saldo do pagador não deve ser debitado.

- **Notificação Pós-Transferência:**  
  - Após a transferência bem-sucedida, o recebedor deve ser notificado por meio de um serviço externo (chamada POST para [https://util.devi.tools/api/v1/notify](https://util.devi.tools/api/v1/notify)).
  - Falhas na notificação não devem comprometer a transferência, mas devem ser registradas em filas para consumo.

## Endpoints da API

### 1. Cadastro de Usuários

#### **POST /users**

- **Descrição:**  
  Registra um novo usuário no sistema.

- **Request Body:**
  ```json
  {
    "name": "João da Silva",
    "document": "12345678900", // formato CPF/CNPJ
    "email": "joao@exemplo.com",
    "password": "senhaSegura123",
    "type": "comum" // ou "lojista"
  }
  ```

- **Regras:**
  - CPF e e-mail devem ser únicos.
  - O campo `type` define se o usuário é *comum* (pode enviar e receber) ou *lojista* (somente recebe).

- **Respostas:**
  - `201 Created` – Usuário registrado com sucesso.
  - `422 Unprocessable Entity` – Dados inválidos.
  - `400 Bad Request` – Omissão de campos obrigatórios.

---

### 2. Depósito em Carteira

#### **POST /deposit**

- **Descrição:**  
  Permite que um usuário adicione dinheiro à sua carteira.

- **Request Body:**
  ```json
  {
    "userId": 4,
    "amount": 150.0
  }
  ```

- **Regras:**
  - O valor do depósito deve ser maior ou igual a zero.
  - O usuário identificado por `userId` deve existir.

- **Respostas:**
  - `200 OK` – Depósito realizado com sucesso.
  - `422 Unprocessable Entity` – Valor inválido.
  - `400 Bad Request` – Requisição mal formatada.

---

### 3. Transferência de Valores

#### **POST /transfer**

- **Descrição:**  
  Realiza a transferência de dinheiro entre usuários.

- **Request Body:**
  ```json
  {
    "amount": 100.0,
    "payer": 4,
    "payee": 15
  }
  ```

- **Fluxo da Operação:**
  1. **Validação de Entrada:**  
     - Verificar se os campos `amount`, `payer` e `payee` estão presentes e o valor é válido (≥ 0).
  2. **Verificação de Perfil e Saldo:**  
     - Confirmar que o pagador (payer) é um usuário comum e possui saldo suficiente.
     - Validar que o recebedor (payee) é um usuário válido, podendo ser comum ou lojista.
  3. **Autorização Externa:**  
     - Realizar a chamada ao serviço autorizador. Se a autorização falhar, cancelar a operação.
  4. **Operação Transacional:**  
     - Debitar o valor da carteira do pagador e creditar o mesmo na carteira do recebedor. Em caso de erro, reverter a transação.
  5. **Notificação:**  
     - Enviar notificação ao recebedor usando o serviço de notificação. Falhas na notificação devem ser registradas sem reverter a operação.

- **Respostas:**
  - `200 OK` – Transferência efetuada com sucesso.
  - `422 Unprocessable Entity` – Falha nas validações (dados inválidos, saldo insuficiente, tentativa de transferência por lojista, erro na autorização, etc.).
  - `400 Bad Request` – Requisição mal formatada.

---

### 4. Consulta de Saldo

#### **GET /balance/{userId}**

- **Descrição:**  
  Retorna o saldo atual da carteira do usuário identificado pelo `userId`.

- **Exemplo de Resposta:**
  ```json
  {
    "userId": 4,
    "balance": 350.0
  }
  ```

- **Respostas:**
  - `200 OK` – Consulta realizada com sucesso.
  - `404 Not Found` – Usuário não encontrado.

---

### 5. Estatísticas de Transferências

#### **GET /estatistica**

- **Descrição:**  
  Retorna estatísticas das transferências realizadas nos últimos 60 segundos (ou em uma janela de tempo configurável).  
  As estatísticas incluem:
  - `count`: Número de transferências
  - `sum`: Soma total dos valores transferidos
  - `avg`: Média dos valores transferidos
  - `min`: Menor valor transferido
  - `max`: Maior valor transferido

- **Exemplo de Resposta:**
  ```json
  {
    "count": 10,
    "sum": 1000.0,
    "avg": 100.0,
    "min": 50.0,
    "max": 200.0
  }
  ```

- **Regras:**
  - Se não houver transferências no período, todos os valores devem ser retornados como `0`.

- **Respostas:**
  - `200 OK` – Estatísticas retornadas com sucesso.
  - `400 Bad Request` – Caso haja algum problema na consulta ou na formatação dos dados.

---

### 6. Healthcheck

#### **GET /health**

- **Descrição:**  
  Endpoint para verificação do status da aplicação.

- **Exemplo de Resposta:**
  ```json
  {
    "status": "UP"
  }
  ```

- **Respostas:**
  - `200 OK` – A aplicação está funcionando corretamente.

## Extras e Diferenciais

- **Testes Automatizados e Qualidade do Produto:**  
  - Cobertura abrangente com testes unitários e de integração, avaliando não só os fluxos “felizes”, mas também os caminhos de exceção e validação.
  - Uso de CI/CD para rodar testes e análises estáticas.

- **Logs e Observabilidade:**  
  - Inclusão de logs detalhados para rastreamento das operações e um endpoint de healthcheck para monitoramento da aplicação.

- **Configuração Dinâmica:**  
  - Possibilidade de configurar parâmetros importantes, como a janela de tempo para cálculo de estatísticas.
  
- **Transacionalidade e Performance:**  
  - Garantia de operações transacionais nas transferências.
  - Monitoramento e análise do tempo de processamento das operações.

- **Habilidades Básicas e Avançadas de Desenvolvimento Back-end:**  
  - Domínio sobre a criação de APIs RESTful, organização do código, e uso adequado de versionamento com Git.
  
- **Qualidade e Manutenibilidade do Código:**  
  - Adoção de boas práticas, princípios SOLID, e uso de design patterns.
  - Organização e modularização do código (controller, service, repository, etc.).

- **Conhecimento de Arquitetura e Infraestrutura:**  
  - Aplicação de conceitos como containerização, mensageria e escalabilidade.
  - Proposta e implementação de melhorias na arquitetura.

- **Integração com Serviços Externos:**  
  - Implementação de chamadas a serviços externos para autorização e notificação, incluindo o tratamento de falhas desses serviços.

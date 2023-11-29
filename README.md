# Simplified payment API - Back-End challenge

This repository contains my solution for [PicPay back-end challenge](https://github.com/PicPay/picpay-desafio-backend) using Node.js with Typescript. The project was also built using the TDD methodology.

## 📜 Table of contents

- [About the challenge](#🏋🏽-about-the-challenge)
- [Project requirements](#📋-project-requirements)
- [Techs that I used](#💻-technologies-that-i-used)
- [How to run](#⚙️-how-to-run)
- [License](#📄-license)

## 🏋🏽 About the challenge

The goal of this project is implement a simplified version of PicPay. It should be possible to make transfers between ordinary customers and merchants, and the **merchant only receive transfers**. Ordinary users can make and receive transfers from any other customer.

## 📋 Project requirements

- All the users, needs of **Full Name**, **Registration**, **Email** and **Password**.
- **Registration** and **Email** must be uniques.
- Customers can **to make transfers** to other customers and merchants.
- Merchants **only receive** transfers.
- The balance must be **validated before making transfers**.
- Check this [external service (mock)](https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc), before finish a transfer.
- The transfer operation must be a transaction; if there are **any problems**, a **reversal must be made**.
- For any receipt of payment, the customer or merchant, **should be a notification by a third-part service**. [This mock](https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6) simulate the service.
- The service **must be RESTFul**.

### **Payload**

POST `/api/transactions`

```json
{
  "status": "ok",
  "transactionId": "1234",
  "amount": 100.0,
  "currency": "USD",
  "timestamp": "2023-11-09T12:34:56Z",
  "sender": {
    "id": "1234",
    "name": "John Doe"
  },
  "receiver": {
    "id": "4321",
    "name": "Robert Fowler"
  }
}
```

## 💻 Technologies that I used

- Node.js
- TypeScript
- Vitest
- Prisma
- PostgreSQL
- Docker

## ⚙️ How to run

To run this application locally, follow the steps above:

1. Clone the project

```bash
git clone https://github.com/patricks-js/picpay-challenge
```

2. Go to the project directory

```bash
cd simplified-payment-api
```

3. Install dependencies (I'm using `pnpm`)

```bash
pnpm install
```

4. Start the server

```bash
pnpm start:dev # Or `pnpm start` to run the build version
```

### Docker containers

This project uses Docker to manage the application and database containers. Make sure that Docker and Docker compose are installed on your machine.

**Environment variables** can be found in `.env.local`.

```env
# Database
POSTGRES_DB_NAME=""
POSTGRES_DB_USER=""
POSTGRES_DB_PASSWORD=""
DATABASE_URL=""

# Other
JWT_SECRET=""

```

To **up the containers**, run the follow command:

```bash
docker-compose up -d
```

The application will be available at [http://localhost:3333](http://localhost:3333).

To **down the containers**, run the follow command:

```bash
docker-compose down
```

## 📄 License

This project is under the MIT license. See the file [LICENSE](./LICENSE) for more details.

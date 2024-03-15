## Overview

Keep track of where your money goes with a clean, minimal dashboard.

<img src="./docs/overview.png">

## Features

- Add current cashflows (income, savings, balance)
- Manage reoccuring transactions
- Create and manage transactions
- View cashflows
- Chart containing an overview of your monthly cashflow
- Responsive layout
- Dark and light themes

  <img src="./docs/new-reoccuring1.png" width=220 height=400>
  <img src="./docs/new-transaction1.gif" height=400>
  <img src="./docs/chart.png" width=320px>
  <img src="./docs/balance.png" height=90px>
  <img src="./docs/reoccuring.png" width=620px>

## Stack

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Getting started

You can either use this project on it's [website](https://pbd.vercel.app) or by spinning up your own server.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository

```shell
git clone https://github.com/sidsurakanti/budgeting-app.git
```

Navigate to the project directory

```shell
cd budgeting-app
```

Install dependencies

```shell
npm install
```

Create a new .env.local file and populate it

```bash
# auth secret used for jwt encoding
# run: openssl rand -base64 32
AUTH_SECRET=""
# refer to @vercel/postgres docs: https://vercel.com/docs/storage/vercel-postgres/quickstart
# you might also need to host this project using vercel if you want to use their db
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""
```

Start up the server

```shell
npm run dev
```

Your app should now be running on `http://localhost:3000`.

## Contributing

Refer to [CONTRIBUTING.md](./docs/CONTRIBUTING.md)

## Roadmap

- [x] Clean up code
- [ ] Write a better README
- [ ] Track previous paychecks
- [ ] Find APIs from banking or credit card companies to use to automatically get transactions
- [ ] Add other sign in options

## Support

If you need help with anything or want to request new features, you can reach me on [discord](https://discord.com/users/521872289231273994) 👍

## Acknowledgements

Thanks to everyone who assisted me on this project ❤️

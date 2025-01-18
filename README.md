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

```zsh
cd finance-analytics-app
```

Install dependencies

```zsh
npm install --legacy-peer-deps # use legacy peer deps b/c some packages don't have support for React 19 yet
```

Create a new .env.local file and populate it

```bash
# auth.js secret
# run: openssl rand -base64 32
AUTH_SECRET=""
# see: https://github.com/settings/developers
# set your callback url as http://[origin]/api/auth/callback/github
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
# see: https://console.cloud.google.com/apis/credentials/
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
# refer to @vercel/postgres docs: https://vercel.com/docs/storage/vercel-postgres/quickstart
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""
```

Start up the server

```zsh
npm run dev
```

Your app should now be running on `http://localhost:3000`.

## Contributing

Refer to [CONTRIBUTING.md](./docs/CONTRIBUTING.md)

## Roadmap

- [x] Clean up code
- [ ] Write a better README
- [ ] Look into Plaid's API to auto-fetch transactions from user's credit cards

## Support

If you need help with anything or want to request new features, you can reach me on [discord](https://discord.com/users/521872289231273994) 👍

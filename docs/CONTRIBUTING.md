# Contributing

Thanks for your interest in contributing to this project.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to me!

## Tech Stack

- Next.js
- Typescript
- TailwindCSS
- PostgresSQL (Neon w/ Vercel)
- shadcn/ui
- Recharts

This repository is structured as follows:

```
app
  └── (auth)
      └── layout.tsx
      └── login
          └── page.tsx
      └── register
          └── page.tsx
  └── (pages)
      └── layout.tsx
      └── cashflows
          └── page.tsx
      └── reoccuring
          └── page.tsx
      └── transactions
          └── page.tsx
  └── layout.tsx
  └── page.tsx

components
  └── auth
      └── ...
  └── base
      └── ...
  └── home
      └── ...
  └── cashflows
      └── ...
  └── reoccuring
      └── ...
  └── transactions
      └── ...
  └── ui
      └── ...
  ...
lib
└── ...
schemas
└── ...

```

| Path                 | Description                                           |
| -------------------- | ----------------------------------------------------- |
| `/app`               | The actual application for the website.               |
| `/components`        | The react components for the website.                 |
| `/components/[path]` | Components for that specific path of the app          |
| `/lib`               | Database operations, type defintions, and other utils |
| `/components/ui`     | Reusuable UI components                               |
| `/schemas`           | Form schemas for validation                           |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/finance-analytics-app.git
```

### Navigate to project directory

```bash
cd finance-analytics-app
```

### Create a new Branch

```bash
git checkout -b my-new-feature-branch
```

### Install dependencies

```bash
npm i --legacy-peer-deps
```

### Rename .env.example file to .env.local and populate it

```bash
# auth.js
# run: openssl rand -base64 32
AUTH_SECRET=""
# see: https://github.com/settings/developers
# set your callback url as http://[origin]/api/auth/callback/github
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
# see: https://console.cloud.google.com/apis/credentials/
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# db
# refer to @vercel/postgres docs: https://vercel.com/docs/storage/vercel-postgres/quickstart
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""
```

## Commit Conventions

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(profile): updated logic for avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new features

If you have a request for a new feature, please open an issue on GitHub or contact me. I'll be happy to help you out.

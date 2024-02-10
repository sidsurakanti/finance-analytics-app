Welcome to our project's documentation. Here's a quick overview of the project to get you started.

## Design Docs

You can find the basic design and visual guidelines for this project [here](./design.png).

## Tech Stack

- Next.js
- Typescript
- TailwindCSS
- PostgresSQL (Vercel)

## File Structure

I've organized the project structure to keep things neat and easy to work with. Here's how I structured it:

- Each page has it's own folder in the `components` folder to store all the components it uses
- The `lib/` folder contains all the essential utilities for this app
- `styles/` Directory: stores fonts and global css styles
- `.env.local` is used for environmental variables

This structure helps us keep page-specific components tidy and separate from global components, ensuring our codebase is easy to navigate and maintain.

```
└── 📁app
    └── 📁(auth)
        └── 📁login
            └── page.tsx
        └── 📁register
            └── page.tsx
    └── 📁(pages)
        └── 📁cashflows
            └── 📁edit
                └── page.tsx
            └── page.tsx
        └── 📁dashboard
            └── 📁components
            └── page.tsx
        └── 📁transactions
            └── 📁components
            └── 📁create
                └── page.tsx
            └── page.tsx
    └── layout.tsx
    └── page.tsx
└── 📁components
    └── 📁cashflows
        └── CashflowCard.tsx
        └── CashflowChart.tsx
        └── EditButtonWrapper.tsx
    └── 📁dashboard
        └── CashflowPreview.tsx
        └── RecentTransactions.tsx
        └── TransactionsPreview.tsx
    └── 📁login
        └── LoginForm.tsx
    └── nav.tsx
    └── 📁transactions
        └── CreateTransactionForm.tsx
        └── TransactionCard.tsx
        └── TransactionList.tsx
└── 📁lib
    └── actions.ts
    └── data.ts
    └── definitions.ts
    └── placeholder-data.ts
└── 📁styles
    └── fonts.ts
    └── globals.css
```

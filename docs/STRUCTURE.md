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

- Each page, like `/dashboard` and `/cashflows`, has it's own `components` folder specific to that page for storing all the components it uses.
- The `ui/` folder houses all the global components and styles used throughout the app.
- The `lib/` folder contains all the essential utilities for this app.
- `public/` Directory: stores static assets like `favicon.ico` and `logo.svg`
- `.env.local` is used for local environmental variables. Keep this file private and safe.

This structure helps us keep page-specific components tidy and separate from global components, ensuring our codebase is easy to navigate and maintain.

```
- app
  - (pages)
    - cashflows
      - components
        page.tsx
    - dashboard
      - components
        page.tsx
    - login
        - components
        page.tsx
    - transactions
        page.tsx
  - ui
    - components
    - styles
        fonts.ts
        globals.css
  - lib
      actions.ts
      data.ts
      definitions.ts
      utils.ts
  page.tsx
  layout.tsx

- public
    favicon.ico
    hero.png
    logo.svg

- info
    CONTRIBUTING.md
    design.png
    STRUCTURE.md (you are here)
- scripts
    seed.sql

.env.local
```

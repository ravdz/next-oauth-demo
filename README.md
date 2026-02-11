# Next.js OAuth 2.0 Demo

A minimal demo app: **OAuth 2.0 (Google)** + **Next.js** (App Router, API Routes). Sign in with Google, HTTP-only cookie session, and a sample protected page (notes).

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Google OAuth 2.0** (Authorization Code flow)

## Requirements

- Node.js 18+
- A Google account and OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

## Quick start

1. **Clone and install**

   ```bash
   git clone <repo-url>
   cd next-oauth-demo
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env` and fill in the values:

   ```bash
   cp .env.example .env
   ```

   | Variable               | Description                             |
   | ---------------------- | --------------------------------------- |
   | `GOOGLE_CLIENT_ID`     | Client ID from Google Cloud Console     |
   | `GOOGLE_CLIENT_SECRET` | Client Secret from Google Cloud Console |
   | `BASE_URL`             | App URL (e.g. `http://localhost:3000`)  |

   In Google Console, add to **Authorized redirect URIs**:  
   `http://localhost:3000/auth/callback` (and your production URL when deploying).

3. **Run**

   ```bash
   npm run dev
   ```

   App: [http://localhost:3000](http://localhost:3000).

## Project structure (overview)

- **Frontend** — pages in `src/app/` (home, `/auth/callback`, `/notes`).
- **API** — `src/app/api/auth/callback`, `api/auth/logout`, `api/session`, `api/notes`.
- **Auth** — `src/lib/auth.ts`: Google auth URL, code-for-token exchange, session from cookie.

## Scripts

| Command                | Description           |
| ---------------------- | --------------------- |
| `npm run dev`          | Development server    |
| `npm run build`        | Production build      |
| `npm run start`        | Run after build       |
| `npm run lint`         | ESLint                |
| `npm run lint:fix`     | ESLint with auto-fix  |
| `npm run format`       | Prettier (write)      |
| `npm run format:check` | Prettier (check only) |

## Code quality: Husky + lint-staged

Before each commit, **Husky** runs a `pre-commit` hook that invokes **lint-staged**:

- **lint-staged** runs ESLint (`--fix`) and Prettier only on files staged for commit (`.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.css`, `.md`).

So code that gets committed is already formatted and linted, without manually running `lint:fix` or `format` beforehand.

```bash
# Hooks are set up on npm install (via the "prepare" script)
# Run manually what pre-commit does:
npx lint-staged
```

## License

MIT (or as needed for your project).

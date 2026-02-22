# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Deployment counter (Postgres + Dokploy)

This repository now includes a small Node API server (`server.js`) that:

- serves the built React app
- exposes `GET /api/deployments` for the homepage counter
- exposes `POST /api/deployments/increment` to increment the counter

### Local run (full app + API)

```sh
npm ci
npm run build
npm run start
```

### Database setup

Create a Postgres database in Dokploy, then run:

```sql
CREATE TABLE IF NOT EXISTS app_metrics (
  metric_key TEXT PRIMARY KEY,
  metric_value BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO app_metrics (metric_key, metric_value)
VALUES ('deployments', 0)
ON CONFLICT (metric_key) DO NOTHING;
```

### Required environment variables

Add these to your Dokploy app:

- `DATABASE_URL`
- `DEPLOY_HOOK_TOKEN`
- `DEPLOYMENTS_METRIC_KEY` (optional, defaults to `deployments`)
- `DEPLOYMENTS_FALLBACK` (optional, defaults to `0`)
- `PGSSLMODE` (optional; use `require` only when needed)

### Increment counter via hook

Call this endpoint after each deploy:

```sh
curl -X POST https://YOUR_DOMAIN/api/deployments/increment \
  -H "Authorization: Bearer YOUR_DEPLOY_HOOK_TOKEN"
```

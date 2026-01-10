# Deployment Guide

## Infrastructure
The application is designed to be deployed on **Vercel** with a **Neon** database.

### Prerequisites
*   Vercel Account
*   Neon Database Project
*   Supabase Project

## Database Management in Production
Since we use **Drizzle Kit**, schema updates in production are handled by pushing changes directly or running migrations.

**Recommended Workflow:**
1.  **Develop**: Change schema locally in `lib/db/schema.ts`.
2.  **Push**: Run `npx drizzle-kit push` to update the Neon database (or use migrations for stricter control).
3.  **Deploy**: Push code to GitHub. Vercel automatically builds and deploys the new application code.

## Environment Variables
The following variables must be set in the Vercel Project Settings:

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | Connection string for Neon (Pooled) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret Key (for Admin tasks) |
| `GOOGLE_CLIENT_ID` | OAuth Config |
| `GOOGLE_CLIENT_SECRET` | OAuth Config |
| `GITHUB_CLIENT_ID` | OAuth Config |
| `GITHUB_CLIENT_SECRET` | OAuth Config |

## CI/CD Pipeline
*   **Branch `main`**: Deploys to Production.
*   **Pull Requests**: Vercel creates a Preview Deployment for every PR. We can use branching in Neon to have separate databases for previews if needed.

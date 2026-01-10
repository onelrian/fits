# FITS - Modern E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![Database](https://img.shields.io/badge/Database-Neon-blue)](https://neon.tech)

**FITS** is a zero-cost, high-performance e-commerce platform designed for reliability and scalability. It features comprehensive product management, secure OAuth2 authentication, and a streamlined shopping experience built on modern serverless architecture.

## Documentation
*   **[Architecture Guide](docs/architecture.md)**: System design, database schema, and authentication flow.
*   **[Deployment Guide](docs/deployment.md)**: Production deployment pipeline and configuration.

## Technology Stack
-   **Framework**: Next.js 15 (App Router, Server Actions)
-   **Language**: TypeScript
-   **Database**: Neon (PostgreSQL) with Drizzle ORM
-   **Authentication**: Supabase (OAuth2)
-   **Styling**: Tailwind CSS
-   **State Management**: Zustand

## Getting Started

### Prerequisites
-   Node.js 18+
-   npm or pnpm

### Installation
1.  **Clone the repository**
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Environment Setup**
    Ensure all required environment variables are configured in `.env.local`.

    | Variable | Description |
    | :--- | :--- |
    | `DATABASE_URL` | Neon PostgreSQL connection string (Pooled) |
    | `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
    | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Public API Key |
    | `SUPABASE_SERVICE_ROLE_KEY` | Supabase Secret Key (Service Role) |
    | `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
    | `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
    | `GITHUB_CLIENT_ID` | GitHub OAuth Client ID |
    | `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret |
    | `UPLOADTHING_SECRET` | UploadThing Secret Key |
    | `UPLOADTHING_APP_ID` | UploadThing App ID |
    | `RESEND_API_KEY` | Resend API Key for emails |

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    
The application will be available at [http://localhost:3000](http://localhost:3000).
# FITS -  Find It, Try It, Style It

A modern, zero-cost e-commerce platform enabling merchants to sell products online.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git version control

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd fits
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.template .env.local
# Fill in your credentials in .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser.

## Documentation

- [Account Setup Guide](./docs/ACCOUNT_SETUP.md) - Create all required accounts
- [Development Roadmap](./docs/ROADMAP.md) - Full 14-week development plan
- [Architecture Overview](./docs/ARCHITECTURE.md) - System architecture and design decisions

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Neon PostgreSQL
- **Authentication:** Supabase OAuth2
- **File Storage:** UploadThing
- **Email:** Resend
- **State Management:** Zustand
- **Data Fetching:** React Query
- **Animations:** Framer Motion
- **Monitoring:** Grafana Stack (Phase 5)

## Development Roadmap

This project follows a 14-week structured development plan:

- **Phase 1:** Foundation (Weeks 1-3)
- **Phase 2:** Product Management (Weeks 4-6)
- **Phase 3:** Shopping Experience (Weeks 7-9)
- **Phase 4:** Order Management (Weeks 10-11)
- **Phase 5:** Polish & Optimization (Weeks 12-13)
- **Phase 6:** Production Launch (Week 14)
- **Phase 7:** Payment Integration (Weeks 15-16, Optional)


## Environment Variables

All required environment variables are documented in `env.template`. Copy this file to `.env.local` and fill in your credentials.

**Important:** Never commit `.env.local` to version control. It is already included in `.gitignore`.

## Security

- Environment variables are stored in `.env.local` (not committed)
- Sensitive keys are never logged or exposed in client-side code
- Database connections use SSL/TLS encryption
- Authentication uses OAuth2 with secure token handling

## Development

### Running the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## License

MIT
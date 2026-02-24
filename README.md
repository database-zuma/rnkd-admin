# RNKD Admin Dashboard

> Internal operations dashboard for the **RNKD Padel** platform — manage players, matches, rankings, and liga fixtures in one place.

**[🔗 Live Demo → rnkd-admin.vercel.app](https://rnkd-admin.vercel.app)**

---

## What it does

RNKD Admin gives operators a single command center to run the padel ecosystem:

| Module | Description |
|--------|-------------|
| **Dashboard** | Real-time KPIs — active players, matches played, avg MMR, tier distribution |
| **User Management** | Full player roster with MMR history, tier badges, and profile detail view |
| **Match Management** | Complete match log with scores, MMR deltas, and per-match breakdowns |
| **Liga Fixtures** | Season fixture scheduling, registrations, and standings management |
| **Analytics** _(coming soon)_ | Revenue, retention, and engagement metrics |
| **Tournaments** _(coming soon)_ | Bracket management and event tracking |

---

## Stack

- **Framework** — [Next.js 14](https://nextjs.org) App Router
- **UI Components** — [shadcn/ui](https://ui.shadcn.com) (New York style)
- **Styling** — [Tailwind CSS v3](https://tailwindcss.com) with custom RNKD design tokens
- **Tables** — [TanStack Table v8](https://tanstack.com/table) with sorting, filtering, pagination
- **Charts** — [Recharts](https://recharts.org)
- **Font** — JetBrains Mono (stats & numbers), system sans (UI)
- **Deployment** — [Vercel](https://vercel.com)

---

## Design System

The dashboard uses the RNKD dark theme — built for desktop operators at 1280px+.

```
Background     #000000   — true black canvas
Cards          #1C1C1E   — elevated surface
Hover          #2C2C2E   — interactive feedback

Volt           #D2F802   — primary CTA, active states
Mint           #30D158   — success, positive MMR
Red            #EF4444   — errors, losses
Orange         #FF9F0A   — pending, warnings
Blue           #0A84FF   — info, links

Text primary   #F5F5F7
Text secondary #A1A1A6
```

Glass cards, volt accent borders on active nav, and monospaced numbers throughout.

---

## Local Development

```bash
# Clone
git clone https://github.com/database-zuma/rnkd-admin.git
cd rnkd-admin

# Install
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/dashboard`.

> **Note:** The app currently runs on mock data. Supabase integration is wired up in `src/lib/supabase/` and ready to connect once credentials are provided.

---

## Project Structure

```
src/
├── app/
│   ├── login/                    Login page
│   └── (admin)/
│       ├── layout.tsx            Admin shell (sidebar + content)
│       ├── dashboard/            Overview with charts and KPIs
│       ├── users/                Player list + [id] detail
│       ├── matches/              Match log + [id] detail
│       └── liga/
│           ├── fixtures/         Fixture list + [fixtureId] detail
│           ├── seasons/
│           ├── registrations/
│           └── standings/
├── components/
│   ├── layout/                   Sidebar, page header
│   ├── dashboard/                Chart components (client)
│   └── shared/                   DataTable, badges, MMR display
└── lib/
    ├── mock-data/                 users.ts · matches.ts · liga.ts
    ├── data/                      DAL — getUsers, getMatches, getDashboardStats
    └── supabase/                  Client + server Supabase instances
```

---

## Deployment

Hosted on Vercel. Any push to `main` redeploys automatically.

```bash
# Manual deploy
vercel --prod --yes
```

---

## Roadmap

- [ ] Connect Supabase for live data
- [ ] Analytics page — revenue & retention charts
- [ ] Tournament bracket manager
- [ ] Push notification center
- [ ] Role-based access (admin vs. operator)
- [ ] Audit log with change history

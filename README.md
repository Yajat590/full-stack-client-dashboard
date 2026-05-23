# ClientHub — B2B SaaS Client Dashboard

A high-fidelity B2B SaaS client portal built for content writing agencies. Clients can log in to track article pipelines, approve drafts, manage billing, and download completed content — all from a clean, premium dark-mode interface.

**Live Demo → [clienthub-dashboard.netlify.app](https://clienhub-dashboard.netlify.app/)**

---

## Screenshots

> Dashboard · Kanban Board · Inbox · Task Detail

*(Add screenshots here)*

---

## Features

- **Dashboard** — High-level analytics, interactive area chart, and a live "Recent tasks" table showing the five most immediately due items
- **Kanban Board** — Three-column task board (In Progress · Pending Review · Completed) driven by global state
- **Task Detail** — Dynamic per-task route with status overview and one-click mock download for completed items
- **Inbox** — Full-page notifications feed with smart icon mapping based on message content
- **Auth Flow** — Login and signup pages wired to Supabase Auth
- **Settings modal** — In-app profile/settings via shadcn Dialog, no extra route needed
- **Dark-mode first** — Deep purple/charcoal sidebar (`#252432`) with airy white content panels and a vibrant purple accent (`#8b5cf6`)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + Radix UI |
| Charts | Recharts |
| Auth & Database | Supabase (SSR) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Deployment | Netlify |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Installation

```bash
# Clone the repo
git clone https://github.com/Yajat590/full-stack-client-dashboard.git
cd full-stack-client-dashboard

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these in your Supabase project under **Settings → API**.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── dashboard/        # Main analytics view
│   │   ├── orders/           # Kanban board + task detail [id]
│   │   ├── inbox/            # Notifications feed
│   │   ├── clients/          # Client list
│   │   ├── invoices/         # Billing
│   │   └── settings/         # Settings page
│   ├── login/                # Auth — login
│   └── signup/               # Auth — signup
├── components/
│   ├── dashboard/            # Sidebar, TopNav, Charts
│   └── ui/                   # shadcn/ui primitives
└── lib/
    ├── context/              # OrderContext — global state
    └── supabase/             # Supabase client helpers
```

---

## License

MIT

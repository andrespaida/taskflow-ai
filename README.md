# TaskFlow

A modern, responsive task manager built with React and TypeScript. Plan work, track progress, and stay organized — with zero backend required.

[![CI](https://github.com/andrespaida/taskflow-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/andrespaida/taskflow-ai/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Highlights

- **Full task CRUD** — title, description, and priority (Low / Medium / High)
- **Smart filtering & search** — All, Active, Done tabs plus live search
- **Dashboard stats** — totals and animated completion progress
- **Dark mode** — toggle with persisted preference
- **Local-first** — data stored in `localStorage`, syncs across tabs
- **Accessible** — keyboard navigation, focus traps, screen reader announcements
- **Tested** — 25 Playwright end-to-end tests

## Tech stack

| Layer | Tools |
| --- | --- |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Build | Vite 8 |
| Testing | Playwright |
| Linting | ESLint + TypeScript ESLint |

## Quick start

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/andrespaida/taskflow-ai.git
cd taskflow-ai
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Run tests in Playwright UI mode |
| `npm run test:e2e:report` | Open the last HTML test report |

## Project structure

```
taskflow-ai/
├── e2e/                    # Playwright end-to-end tests
├── public/                 # Static assets (favicon)
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Layout shell
│   │   ├── tasks/          # Task-specific UI
│   │   └── ui/             # Reusable primitives
│   ├── constants/          # Filters, storage keys, priorities
│   ├── contexts/           # React context definitions
│   ├── features/tasks/     # TaskBoard feature module
│   ├── hooks/              # Custom React hooks
│   ├── providers/          # Theme & Task providers
│   ├── types/              # Shared TypeScript types
│   ├── utils/              # Pure helpers & validation
│   ├── App.tsx             # Application root
│   └── main.tsx            # Entry point
├── playwright.config.ts
└── vite.config.ts
```

## Architecture

TaskFlow uses a **provider + feature module** pattern:

- **`ThemeProvider` / `TaskProvider`** — global state for theme and tasks
- **`useTheme()` / `useTasks()`** — hooks consumed by feature components
- **`features/tasks/TaskBoard`** — composes the main screen
- **`utils/`** — pure functions for filter, sort, search, and storage validation

Data flows from `localStorage` → providers → UI, with no external API.

## Testing

E2E tests cover functional flows, dark mode, task creation, and error handling:

```bash
npm run test:e2e
```

The Playwright config starts the Vite dev server automatically. After a run:

```bash
npm run test:e2e:report
```

## Deployment

Build static assets for any static host (GitHub Pages, Netlify, Vercel, etc.):

```bash
npm run build
```

Output is written to `dist/`. Configure your host to serve `index.html` for SPA routes.

## Browser support

Works in all modern browsers with `localStorage` support (Chrome, Firefox, Safari, Edge).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes
4. Push and open a Pull Request

Please run `npm run lint`, `npm run build`, and `npm run test:e2e` before submitting.

## License

[MIT](LICENSE) — free to use, modify, and distribute.

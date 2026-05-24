# TaskFlow

A modern, responsive task management web application built with React, TypeScript, and Tailwind CSS.

## Features

- Create, edit, and delete tasks with title, description, and priority
- Task completion with animated checkboxes
- Search and filter (All / Active / Done)
- Dashboard stats with completion progress
- Dark mode with system preference detection
- LocalStorage persistence (tasks, filter, theme)
- Cross-tab sync for stored data
- Smooth animations powered by Framer Motion

## Architecture

```
src/
├── app/                 # (entry via App.tsx)
├── providers/           # Theme + Task context providers
├── features/tasks/      # TaskBoard, StatsOverview, TaskToolbar
├── components/
│   ├── layout/          # Header, Layout shell
│   ├── tasks/           # Task domain components
│   └── ui/              # Reusable UI primitives
├── hooks/               # useLocalStorage
├── types/               # Shared TypeScript interfaces
├── utils/               # Pure helpers (filter, sort, storage)
└── constants/           # Filter options, storage keys
```

**Design decisions:**
- **Providers** centralize theme and task state — components consume via `useTheme()` / `useTasks()` instead of prop drilling
- **Feature modules** (`features/tasks/`) compose domain UI while keeping reusable pieces in `components/`
- **Utils stay pure** — filtering, sorting, and search logic live outside React for easy testing
- **Unified storage** — `useLocalStorage` wraps shared read/write helpers with cross-tab sync

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

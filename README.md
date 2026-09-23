# Interactive Kanban Board

A drag-and-drop Kanban board built with React, TypeScript, and Motion. Tasks can be moved between columns, reordered within a column, and edited through animated modals. All data persists in `localStorage`.

🔗 **[Live Demo](https://Filip000151.github.io/interactive-kanban-app/)**

## Features

- **Three columns** — To Do, In Progress, Done
- **Drag & drop** — move tasks between columns and reorder within a column
- **Animated transitions** — layout animations powered by Motion
- **Task management** — create, edit, and delete tasks with animated modals
- **Persistent state** — everything saved to `localStorage`
- **Staggered entry animations** — cards animate in on load

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Motion** (Framer Motion) — animations and drag & drop
- **Tailwind CSS** — styling
- **React Icons** — icons

### Prerequisites

- Node.js 20+
- npm

## Run Locally

```bash
git clone https://github.com/Filip000151/interactive-kanban-app.git
cd interactive-kanban-app
npm install
npm run dev

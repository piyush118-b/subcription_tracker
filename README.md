# Subscription Tracker

A modern SaaS application for tracking and managing subscriptions.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **CSS**: Tailwind CSS
- **Database**: Supabase

## Project Structure

```
├── frontend/          # React application
├── backend/           # Node.js API server
├── CLAUDE.md         # Project documentation
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

### Configuration

#### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Backend (.env)
Create a `.env` file in the `backend` directory:
```
SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
PORT=3001
```

### Running the Application

Start the backend:
```bash
cd backend
npm run dev
```

Start the frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

## Supabase Database Setup

Create a `subscriptions` table in your Supabase project with the following schema:

| Column        | Type        | Description                     |
|---------------|-------------|----------------------------------|
| id            | uuid        | Primary key (auto-generated)    |
| name          | text        | Subscription name                |
| amount        | numeric     | Cost amount                      |
| billing_cycle | text        | weekly, monthly, or yearly       |
| start_date    | date        | Subscription start date          |
| category      | text        | Category (e.g., Entertainment)   |
| description   | text        | Optional description             |
| created_at    | timestamp   | Auto-generated                   |
| updated_at    | timestamp   | Auto-updated                     |

## Design System

### Colors
- **Background**: Deep navy (`#0f172a`)
- **Primary**: Electric blue (`#3b82f6`)
- **Positive**: Green (`#22c55e`)
- **Warning**: Amber (`#f59e0b`)
- **Danger**: Red (`#ef4444`)
- **Cards**: Dark surfaces (`#334155`)

### Typography
- Font: Inter / system-ui stack

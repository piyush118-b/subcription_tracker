# Subscription Tracker SaaS

## Overview
A modern SaaS application for tracking and managing subscriptions.

## Tech Stack
- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **CSS**: Tailwind CSS
- **Database**: Supabase
- **Design**: impeccable design system

## Project Structure
```
├── frontend/          # React application
├── backend/          # Node.js API server
├── CLAUDE.md         # This file
└── README.md         # Project documentation
```

## Design System

### Color Palette
- **Background**: Deep navy / charcoal (`#0f172a`, `#1e293b`)
- **Primary**: Electric blue / indigo (`#3b82f6`, `#6366f1`)
- **Positive**: Green (`#22c55e`, `#16a34a`)
- **Warning**: Amber (`#f59e0b`, `#d97706`)
- **Danger**: Red (`#ef4444`, `#dc2626`)
- **Cards**: Slightly lighter dark surfaces (`#334155`) with subtle borders

### Typography
- Font family: Inter / Geist / SF Pro style
- System font stack fallback

### Visual Style
- Minimal, clean, data-heavy, professional
- Dark theme by default
- Subtle borders and shadows

## Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
PORT=3001
```

## Commands

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Supabase Configuration
- Project ID: `sftdufudzifctfdeimkp`
- Use provided keys securely (never commit to git)

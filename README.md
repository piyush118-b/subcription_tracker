# Burnwatch — Subscription Tracker

A personal finance dashboard that aggregates SaaS subscriptions and streaming services, tracks renewal dates, and monitors monthly cash-flow burn.

## The Problem We Solve

1. **Subscriptions Sprawl** — Netflix, Figma, ChatGPT, that gym app you forgot about — spend spreads across billing cycles no one tracks in one place.

2. **Annual vs Monthly Confusion** — A ₹4,999/year plan and a ₹499/month plan look different on paper. You need them on the same scale to know your real burn.

3. **Silent Renewals** — Auto-renew charges hit your card before you remember to cancel. By the time you notice, the money's gone.

## How It Works

1. **Add a subscription** — Enter the service, cost, and billing cycle in seconds.
2. **We normalize the math** — Yearly plans are converted to a true monthly cost automatically.
3. **Track burn & renewals** — See total monthly spend and get flagged the moment a renewal is within 7 days.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | Supabase |
| State | React Context + Hooks |

## Project Structure

```
subscription-tracker/
├── frontend/          # React website (what users see)
├── backend/         # Node.js API (behind the scenes)
└── README.md        # You are here
```

## Quick Start

### 1. Set up Supabase Database

Go to your Supabase project → SQL Editor and run the commands in `backend/README.md`.

### 2. Start the Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## Features

### Core Functionality
- ✅ Add/Edit/Delete subscriptions
- ✅ Cost normalization (yearly → monthly)
- ✅ Days until renewal calculation
- ✅ Active/Paused toggle (paused items excluded from burn rate)
- ✅ "Renewing Soon" amber badge for items within 7 days

### UX Improvements
- ✅ Empty state with CTA
- ✅ Skeleton loading animations
- ✅ Delete confirmation modal
- ✅ Monthly cost preview (when selecting yearly)
- ✅ Form auto-focus
- ✅ Keyboard shortcuts (Enter to submit)
- ✅ Search subscriptions
- ✅ Sort subscriptions (7 options)
- ✅ Inline edit via modal
- ✅ Success/error toasts

### Backend Features
- ✅ Server-side calculations
- ✅ Input validation
- ✅ CORS protection
- ✅ Error handling middleware
- ✅ Cost uniformity engine
- ✅ Date intersection calculator

## Design System

- **Background**: Deep navy (`#0f172a`)
- **Primary**: Electric blue (`#3b82f6`)
- **Warning**: Amber (`#f59e0b`) — used ONLY for "Renewing Soon"
- **Positive**: Green (`#22c55e`)
- **Danger**: Red (`#ef4444`)
- **Dark theme** for professional finance app feel

## API Response Shape

```json
{
  "subscriptions": [
    {
      "id": "uuid",
      "service_name": "Netflix",
      "cost": 649.00,
      "billing_cycle": "monthly",
      "next_renewal_date": "2026-09-15",
      "status": "active",
      "monthly_normalized_cost": 649.00,
      "days_until_renewal": 4,
      "renewing_soon": true
    }
  ],
  "metrics": {
    "total_monthly_burn": 2340.50,
    "upcoming_renewals_count": 1
  }
}
```

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5001/api
```

### Backend (.env)
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxx   # Never share this!
PORT=5001
FRONTEND_URL=http://localhost:5173
```

## Future Ideas

- User authentication (login, own subscriptions)
- Email notifications before renewals
- Subscription categories/tags
- Export data to CSV
- Monthly/yearly view toggle
- Browser notifications

# Burnwatch — Subscription Tracker

A simple tool to help you track what you're paying for every month. Know your total monthly spend and get warned before renewals catch you off guard.

## Project Overview

**What problem does this solve?**
- People forget about subscriptions they're paying for
- Yearly and monthly plans are hard to compare
- Renewals hit before you remember to cancel

**Our approach:**
1. Add a subscription in seconds (name, cost, billing cycle)
2. We do the math — yearly plans become monthly costs
3. You see your total burn rate and any upcoming renewals

## Tech Stack

- **Frontend**: React (website UI)
- **Backend**: Node.js + Express (API)
- **Database**: Supabase (stores data)
- **Styling**: Tailwind CSS

## Project Structure

```
subscription-tracker/
├── frontend/          # React website (what users see)
│   ├── pages/         # Main screens
│   ├── components/     # UI pieces
│   ├── api/           # Backend communication
│   └── context/       # Data management
│
├── backend/           # Node.js API (behind the scenes)
│   ├── routes/        # URL mappings
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic
│   └── validators/     # Input checking
│
└── README.md          # You are here
```

## Quick Start

### 1. Set up the Database (Supabase)

Go to your Supabase project → SQL Editor and run the commands in `backend/README.md`.

This creates the `subscriptions` table.

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

Open `http://localhost:5173` in your browser.

## How It Works

### Frontend Flow
1. User visits `/` → sees landing page
2. Clicks "Add Subscription" → goes to `/add` form
3. Fills form → data POSTs to backend
4. Success → redirects to `/dashboard`
5. Dashboard shows all subscriptions + metrics

### Backend Flow
1. Receives request
2. Validates input (is the cost a number? is the date valid?)
3. Saves to / reads from Supabase
4. Calculates derived values (monthly cost, days until renewal)
5. Returns response

### The Math (Why We Calculate on Backend)

**Monthly Normalization**
- Monthly plan: $10/month → $10/month (no change)
- Yearly plan: $120/year → $120 ÷ 12 = $10/month
- Weekly plan: $3/week → $3 × 4.33 = $13/month

We calculate this on the backend so:
- The frontend doesn't need to know the formula
- If we change the formula, we change it in one place
- The data is consistent regardless of who's asking

**Days Until Renewal**
- Today's date is always changing
- If we stored "days until renewal", it would be wrong tomorrow
- So we calculate it fresh every time someone asks

## Design Decisions

### Dark Theme
Finance apps feel more professional in dark mode. It also saves battery on OLED screens.

### Single Accent Color (Blue)
We use blue for interactive elements and key numbers. This makes the UI predictable.

### Amber = Warning Only
Amber is used only for "renewing soon" warnings. Using it elsewhere would dilute its meaning.

### No Client-Side Math
We don't calculate totals on the frontend because:
- The backend already knows the formula
- The backend has the authoritative data
- It keeps the frontend simple

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (.env)
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxx   # Never share this!
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## Future Ideas

- User authentication (login, own subscriptions)
- Email notifications before renewals
- Edit existing subscriptions
- Categories/tags for subscriptions
- Export data to CSV

# Backend

This folder contains the API — the behind-the-scenes code that the frontend talks to. It handles data storage (Supabase) and complex calculations.

## What It Does

- Stores subscriptions in the database
- Calculates monthly costs (converts yearly to monthly)
- Calculates days until renewal
- Returns combined data + metrics in one response

## Why These Files Are Organized This Way

```
backend/src/
├── server.js              # Starts the app, connects everything
├── routes/                # Maps URLs to controller functions
├── controllers/           # Handles incoming requests
├── services/              # Business logic (calculations)
├── validators/            # Checks if input is valid
├── middleware/            # Code that runs before/after requests
└── config/                # Database connection
```

**Why separate services?**: Calculations like "convert yearly cost to monthly" might be needed in multiple places. Keeping it in one file means fixing it once fixes it everywhere.

**Why validators?**: Instead of checking data in multiple places, validators check it once at the entrance. If data is bad, it gets rejected immediately.

**Middleware**: Like a security guard or filter. Runs before the main request handler.

## The Thought Process

### Cost Normalization
Users enter costs in different billing cycles (monthly, yearly). But comparing them is hard when they're different. 

**Solution**: Convert everything to a monthly cost. Yearly ÷ 12. Weekly × 4.33.

### Days Until Renewal
We don't store "days until renewal" because it changes every day. If we stored it, it would be wrong tomorrow.

**Solution**: Calculate it on-the-fly when someone asks. The server does this math using the renewal date + today's date.

### API Response Shape
Instead of two calls (one for list, one for totals), we return both together:

```json
{
  "subscriptions": [...],
  "metrics": {
    "total_monthly_burn": 2340.50,
    "upcoming_renewals_count": 3
  }
}
```

This means fewer requests from the frontend.

## How to Run

```bash
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:5000`

## Environment Variables

Create a `.env` file (copy from `.env.example`):

```
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-secret-key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Important**: Never share your `SUPABASE_SERVICE_ROLE_KEY`. It has full database access.

## API Endpoints

| Method | URL | What it does |
|--------|-----|--------------|
| GET | /api/health | Server is alive |
| GET | /api/subscriptions | List all + metrics |
| POST | /api/subscriptions | Add new subscription |
| PATCH | /api/subscriptions/:id | Update status (active/paused) |
| DELETE | /api/subscriptions/:id | Remove subscription |

## Database Setup

See the SQL commands in this folder's parent README. Run them once in Supabase SQL Editor to create the table.

## File Reference

| File | Purpose |
|------|---------|
| `server.js` | Main entry point |
| `services/costNormalizer.service.js` | Converts yearly/weekly to monthly |
| `services/renewalCalculator.service.js` | Calculates days until renewal |
| `controllers/subscriptions.controller.js` | Handles subscription CRUD |
| `validators/subscription.validator.js` | Input validation rules |
| `config/supabaseClient.js` | Database connection |

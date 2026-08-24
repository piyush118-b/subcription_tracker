# Backend — Burnwatch API

Node.js + Express REST API for the Subscription Tracker.

## Tech Stack

- Node.js + Express
- @supabase/supabase-js (server-side, service role)
- express-validator (input validation)
- date-fns (date calculations)
- cors (cross-origin protection)
- dotenv (environment config)

## Folder Structure

```
backend/src/
├── server.js                   # App entry, middleware, listener
│
├── config/
│   └── supabaseClient.js      # Supabase client (service role)
│
├── routes/
│   └── subscriptions.routes.js  # Route definitions
│
├── controllers/
│   └── subscriptions.controller.js  # Request handlers
│
├── services/
│   ├── costNormalizer.service.js    # Yearly → monthly conversion
│   └── renewalCalculator.service.js  # Days until renewal calc
│
├── validators/
│   └── subscription.validator.js     # Input validation rules
│
├── middleware/
│   ├── errorHandler.js              # Centralized error handling
│   └── validateRequest.js           # Validation result checker
│
└── config/
    └── supabaseClient.js           # Database connection
```

## Why This Architecture?

### Separation of Concerns
- **Routes** — Map URLs to handlers
- **Controllers** — Handle request/response, call services
- **Services** — Business logic (calculations)
- **Validators** — Input checking before processing

### Why Service Role Key?
The frontend NEVER talks directly to Supabase. All database operations go through this backend API using the service role key, which has full access. This keeps sensitive data protected.

## API Endpoints

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| GET | `/api/health` | — | `{ status: "ok" }` |
| GET | `/api/subscriptions` | — | `{ subscriptions: [...], metrics: {...} }` |
| POST | `/api/subscriptions` | `{ service_name, cost, billing_cycle, next_renewal_date }` | Created subscription |
| PATCH | `/api/subscriptions/:id` | `{ status }` | Updated subscription |
| DELETE | `/api/subscriptions/:id` | — | `204 No Content` |

## GET /api/subscriptions Response

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

## Cost Uniformity Engine

All costs are normalized to monthly for comparison:

```javascript
function normalizeToMonthly(cost, billingCycle) {
  if (billingCycle === 'yearly') {
    return Math.round((cost / 12) * 100) / 100;
  }
  return cost;
}
```

- **Monthly**: returned as-is
- **Yearly**: divided by 12

## Date Intersect Calculator

Days until renewal is calculated on-the-fly (never stored):

```javascript
function getDaysUntilRenewal(nextRenewalDate, referenceDate = new Date()) {
  return differenceInCalendarDays(parseISO(nextRenewalDate), referenceDate);
}

function isRenewingSoon(nextRenewalDate) {
  const days = getDaysUntilRenewal(nextRenewalDate);
  return days >= 0 && days <= 7;
}
```

**Why calculated, not stored?**
Because "today" changes every day. If we stored `days_until_renewal`, it would be wrong tomorrow.

## Validation Rules

| Field | Rule |
|-------|------|
| `service_name` | string, 2-100 chars |
| `cost` | float, > 0 |
| `billing_cycle` | exactly "monthly" or "yearly" |
| `next_renewal_date` | valid ISO date |
| `status` (PATCH) | exactly "active" or "paused" |

## Error Handling

All errors return consistent JSON:

```json
{
  "error": {
    "message": "Service name must be between 2 and 100 characters",
    "code": "VALIDATION_ERROR"
  }
}
```

Error codes:
- `VALIDATION_ERROR` — Input validation failed
- `NOT_FOUND` — Subscription not found
- Other codes from Supabase

## CORS Configuration

Only allows requests from the configured frontend origin:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
```

## Environment Variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (full access) | Yes |
| `PORT` | Server port (default: 5001) | No |
| `FRONTEND_URL` | Frontend URL for CORS | No |

## Database Setup (Supabase SQL)

Run this in your Supabase SQL Editor:

```sql
-- Enable UUID
create extension if not exists "uuid-ossp";

-- Create enums
create type billing_cycle_enum as enum ('monthly', 'yearly');
create type subscription_status_enum as enum ('active', 'paused');

-- Create table
create table subscriptions (
    id                  uuid primary key default uuid_generate_v4(),
    user_id             uuid references auth.users(id),
    service_name        text not null check (char_length(service_name) >= 2),
    cost                numeric(10,2) not null check (cost > 0),
    billing_cycle       billing_cycle_enum not null,
    next_renewal_date   date not null,
    status              subscription_status_enum not null default 'active',
    description         text,
    created_at          timestamptz not null default now(),
    updated_at          timestamptz not null default now()
);

-- Indexes
create index idx_subscriptions_status on subscriptions(status);
create index idx_subscriptions_renewal on subscriptions(next_renewal_date);

-- Auto-update trigger
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_subscriptions_updated_at
before update on subscriptions
for each row execute function set_updated_at();
```

## Running Locally

```bash
cd backend
npm install
npm run dev
```

API runs at `http://localhost:5001`

# Subscription Tracker Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your Supabase credentials:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (never expose this to frontend)
   - `PORT`: Server port (default: 5000)
   - `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)

4. Run the server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/health | Health check |
| GET | /api/subscriptions | List all subscriptions with metrics |
| POST | /api/subscriptions | Create new subscription |
| PATCH | /api/subscriptions/:id | Update subscription status |
| DELETE | /api/subscriptions/:id | Delete subscription |

## Database Setup (Supabase)

Run the following SQL in your Supabase SQL Editor:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create enums
create type billing_cycle_enum as enum ('monthly', 'yearly');
create type subscription_status_enum as enum ('active', 'paused');

-- Create subscriptions table
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

-- Create indexes
create index idx_subscriptions_status on subscriptions(status);
create index idx_subscriptions_renewal on subscriptions(next_renewal_date);

-- Auto-update updated_at trigger
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

-- Optional: Enable RLS (uncomment when auth is set up)
-- alter table subscriptions enable row level security;
-- create policy "Users manage their own subscriptions"
--   on subscriptions for all
--   using (auth.uid() = user_id);
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| SUPABASE_URL | Supabase project URL | Yes |
| SUPABASE_SERVICE_ROLE_KEY | Supabase service role key (server-side only) | Yes |
| PORT | Server port | No (default: 5000) |
| FRONTEND_URL | Frontend URL for CORS | No (default: http://localhost:5173) |

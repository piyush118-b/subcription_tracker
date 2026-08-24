# Frontend

This folder contains the user-facing part of Burnwatch — the website people see when they use the app.

## What It Does

- **Landing Page**: First thing visitors see. Explains what Burnwatch does and why they need it.
- **Add Subscription Form**: Simple form to add a new subscription (service name, cost, billing cycle, renewal date).
- **Dashboard**: Shows all subscriptions in a table with metrics like total monthly spend.

## Why These Files Are Organized This Way

```
frontend/src/
├── pages/           # Main screens (Landing, Add Form, Dashboard)
├── components/      # Reusable UI pieces (buttons, cards, table rows)
├── api/             # All calls to the backend
├── context/         # Shared state across the app
├── hooks/           # Reusable logic (fetching data, calculating metrics)
└── styles/          # Global styling (colors, buttons, inputs)
```

**Pages vs Components**: Pages are full screens. Components are smaller pieces that pages use. Example: Dashboard (page) uses MetricCard (component).

**Context**: React's way of sharing data without passing it through every file. Think of it like a shared clipboard.

**Hooks**: Reusable logic functions. `useSubscriptions` fetches data, `useMetrics` calculates totals.

## Design Choices

We went with a dark theme because finance apps look more professional in dark mode. The blue accent color makes important numbers stand out.

- **Primary (Blue)**: Key actions, important numbers
- **Warning (Amber)**: Renewals coming soon (the only use of amber, so it means "pay attention")
- **Green/Red**: Positive/negative indicators

## How to Run

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`

## API Connection

The frontend talks to the backend at `http://localhost:5000/api`. This is configured in `.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

When building for production, update this to your deployed backend URL.

## File Reference

| File | Purpose |
|------|---------|
| `App.jsx` | Main router — decides which page to show based on URL |
| `main.jsx` | Entry point — loads the app |
| `context/SubscriptionContext.jsx` | Holds all subscription data in one place |
| `api/subscriptions.js` | All API calls (get list, create, update, delete) |

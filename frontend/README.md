# Frontend — Burnwatch

React application for the Subscription Tracker dashboard.

## Tech Stack

- React 19 + Vite
- React Router (routing)
- Tailwind CSS (styling)
- Axios (API calls)
- date-fns (date formatting)
- react-hot-toast (notifications)

## Folder Structure

```
frontend/src/
├── pages/                  # Main screens
│   ├── LandingPage.jsx     # Marketing page with hero, features, CTA
│   ├── OnboardingForm.jsx  # Add subscription form
│   └── Dashboard.jsx       # Metrics + subscription table
│
├── components/
│   ├── landing/           # Landing page sections
│   │   ├── Hero.jsx
│   │   ├── FeatureGrid.jsx
│   │   └── CTASection.jsx
│   │
│   ├── form/              # Form components
│   │   ├── BillingCycleSelect.jsx
│   │   └── RenewalDatePicker.jsx  # Calendar picker with quick select
│   │
│   ├── metrics/           # Dashboard metric cards
│   │   ├── MetricCard.jsx
│   │   ├── BurnRateCard.jsx
│   │   └── UpcomingRenewalsCard.jsx
│   │
│   ├── grid/              # Table components
│   │   ├── SubscriptionTable.jsx
│   │   ├── SubscriptionRow.jsx
│   │   ├── SearchSortBar.jsx
│   │   ├── RenewingSoonBadge.jsx
│   │   └── ActiveToggle.jsx
│   │
│   ├── EmptyState.jsx      # Shown when no subscriptions
│   ├── Skeleton.jsx       # Loading placeholders
│   ├── DeleteConfirmModal.jsx
│   └── EditSubscriptionModal.jsx
│
├── api/
│   └── subscriptions.js    # API wrapper (axios)
│
├── context/
│   └── SubscriptionContext.jsx  # Global state management
│
├── hooks/
│   ├── useSubscriptions.js  # Fetch + cache list
│   └── useMetrics.js        # Derives burn rate + alert count
│
└── styles/
    └── index.css           # Design system + Tailwind config
```

## Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | LandingPage | Marketing + explainer + CTA |
| `/add` | OnboardingForm | Entry form for new subscription |
| `/dashboard` | Dashboard | Metrics row + subscription grid |

## Features Implemented

### Forms
- ✅ Add subscription form with validation
- ✅ Edit subscription modal
- ✅ Delete confirmation modal
- ✅ Auto-focus on first field
- ✅ Enter to submit (keyboard shortcut)
- ✅ Monthly preview when selecting yearly billing
- ✅ Quick select buttons for renewal date (+7 days, +1 month, +1 year)

### Dashboard
- ✅ Total Monthly Burn Rate card
- ✅ Upcoming Renewals Alert count
- ✅ Subscription table with sorting
- ✅ Search/filter by name, billing cycle, description
- ✅ Sort by: newest, oldest, name, cost, renewal date
- ✅ "Renewing Soon" amber badge (within 7 days)
- ✅ Active/Paused toggle (optimistic UI)
- ✅ Row click to edit
- ✅ Delete button on hover
- ✅ Skeleton loading state
- ✅ Empty state with CTA

### Design
- ✅ Dark theme (finance app aesthetic)
- ✅ Inter font family
- ✅ Consistent spacing (8px grid)
- ✅ Amber = warning only (for renewals)
- ✅ Responsive layout

## API Integration

The frontend calls the backend via the Vite proxy:

```javascript
// Frontend → Vite Proxy → Backend
// GET  /api/subscriptions
// POST /api/subscriptions
// PATCH /api/subscriptions/:id
// DELETE /api/subscriptions/:id
```

Proxy configured in `vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5001',
      changeOrigin: true,
    },
  },
},
```

## Context Architecture

`SubscriptionContext` holds all subscription state and provides:
- `subscriptions` — array of subscription objects
- `loading` — boolean for loading state
- `error` — error message if any
- `fetchSubscriptions()` — refetch from API
- `addSubscription()` — POST new subscription
- `updateSubscription()` — PATCH subscription
- `deleteSubscription()` — DELETE subscription

Used by `useSubscriptions` hook which auto-fetches on mount.

## Design System

### Colors (CSS Variables)
```css
--background: #0f172a
--background-secondary: #1e293b
--card: #1e293b
--primary: #3b82f6
--positive: #22c55e
--warning: #f59e0b
--danger: #ef4444
--text: #94a3b8
--text-primary: #f1f5f9
```

### Component Classes
```css
.card        /* Dark card with border */
.btn-primary /* Blue action button */
.btn-danger  /* Red delete button */
.btn-secondary /* Outlined button */
.input      /* Dark input field */
```

## Running Locally

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

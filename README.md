# Burnwatch — Subscription Tracker

A personal finance dashboard that aggregates SaaS subscriptions and streaming services, tracks renewal dates, and monitors monthly cash-flow burn.

## Problem Statement — How We Addressed Each Requirement

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| **Entry Form** with service name, currency field, billing cycle dropdown, calendar date-picker | `OnboardingForm.jsx` with `RenewalDatePicker.jsx` (native calendar + quick select buttons) | ✅ |
| **Metrics Row**: Total Monthly Burn Rate + Upcoming Renewals Alert Count | `BurnRateCard.jsx` + `UpcomingRenewalsCard.jsx` | ✅ |
| **Subscription Grid**: Structured table with renewal date highlighting | `SubscriptionTable.jsx` + `SubscriptionRow.jsx` | ✅ |
| **"Renewing Soon" Amber Badge**: Flag items within 7 days | `RenewingSoonBadge.jsx` with amber border on row | ✅ |
| **Active/Paused Toggle Switch**: Doesn't delete, greys out + excludes from metrics | `ActiveToggle.jsx` with optimistic UI | ✅ |
| **Cost Uniformity Engine**: Normalize annual → monthly | `costNormalizer.service.js` | ✅ |
| **Date Intersect Calculator**: Days remaining until renewal | `renewalCalculator.service.js` | ✅ |
| **Paused items excluded from burn rate but visible (greyed)** | `calculateTotalMonthlyBurn` filters `status === 'active'` | ✅ |
| **All business logic on server-side** | All calculations in backend services | ✅ |

---

## Features Implemented

### Core Features (From Problem Statement)
- ✅ Add subscription form with service name, cost, billing cycle, renewal date
- ✅ Visual calendar date-picker with quick select shortcuts (+7 days, +1 month, +1 year)
- ✅ Total Monthly Burn Rate metric (sum of active subscriptions, normalized to monthly)
- ✅ Upcoming Renewals Alert Count (subscriptions renewing within 7 days)
- ✅ Subscription table with service, cost, billing cycle, renewal date, status
- ✅ "Renewing Soon" amber badge + amber left border on rows within 7 days
- ✅ Active/Paused toggle switch with optimistic UI
- ✅ Paused subscriptions greyed out and excluded from burn rate
- ✅ Cost normalization (yearly plans divided by 12 for monthly comparison)
- ✅ Days until renewal calculated on-the-fly (never stored, stays current)
- ✅ Server-side calculations (frontend only handles presentation)

### UX Improvements (Implemented Beyond Requirements)

| Feature | Description |
|---------|-------------|
| **Loading Screens** | Animated loading screen on all pages with brand logo |
| **Skeleton Loading** | Animated placeholders while data fetches |
| **Empty State** | Friendly message + CTA when no subscriptions exist |
| **Delete Confirmation Modal** | "Delete Netflix?" confirmation before removal |
| **Monthly Preview** | Shows "= $X/month" when selecting yearly billing |
| **Form Auto-focus** | Cursor starts in service name field |
| **Keyboard Shortcuts** | Enter to submit form + hint shown |
| **Search/Filter** | Real-time search by name, billing cycle, description |
| **Sort Options** | 7 sort modes (newest, oldest, name, cost, renewal) |
| **Inline Edit** | Click any row to edit subscription in modal |
| **Success/Error Toasts** | react-hot-toast notifications |
| **Clickable Logo** | Logo navigates to landing page from any page |
| **Consistent Navigation** | Header with logo, dashboard link, add button on all pages |

### Backend Features

| Feature | Description |
|---------|-------------|
| **RESTful API** | GET, POST, PATCH, DELETE endpoints |
| **Input Validation** | express-validator rules for all fields |
| **Error Handling** | Centralized middleware with consistent error shape |
| **CORS Protection** | Restricted to frontend origin |
| **Service Role Supabase** | Server-side only, never exposed to frontend |
| **Combined Response** | Subscriptions + metrics in single GET request |

---

## Future Vision

### 1. Authentication System
**User Accounts (Signup/Login)**
- Email + password registration
- Login with session management
- Password reset functionality
- Email verification

**Social Login**
- Google OAuth (one-click sign in)
- GitHub OAuth
- Apple Sign In
- Seamless onboarding without password creation

**Implementation**: Supabase Auth provides all of this out-of-the-box.

### 2. Multi-User Support
- Each user sees only their own subscriptions
- Shared family accounts (optional)
- Invites to manage family subscriptions
- User profile management

**Implementation**: Row Level Security (RLS) on `user_id` column.

### 3. Notification System

**Email Notifications**
- Renewal reminders 3 days before
- Weekly/monthly burn rate digest
- "You haven't checked in a while" reminders

**In-App Notifications**
- Bell icon with unread count
- Notification center/history
- Mark as read/dismiss

**Browser Notifications**
- Push notifications for upcoming renewals
- Permission-based opt-in

**Implementation**: Supabase Edge Functions + cron jobs for scheduled notifications.

### 4. Enhanced UI/UX

**Dashboard Improvements**
- Monthly/Yearly view toggle
- Spend by category pie chart
- Trend charts (month-over-month comparison)
- Drag-and-drop reordering
- Bulk actions (pause all, delete multiple)

**Subscription Details**
- Full edit history
- Payment method tracking
- Receipt upload
- Notes/tags for organization

**Mobile Experience**
- Responsive design optimization
- Mobile app (React Native or PWA)
- Quick actions from notifications

### 5. Data & Analytics

**Insights**
- Total yearly burn projection
- Savings from paused subscriptions
- Most expensive subscriptions ranking
- Category breakdown

**Export**
- CSV export
- PDF reports
- Data backup/restore

### 6. Advanced Features

**Integrations**
- Bank/credit card import (Plaid)
- Automatic subscription detection
- Price change alerts

**Subscription Discovery**
- Popular subscription recommendations
- Price comparison tools
- Deal alerts

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| State | React Context + Hooks |
| Notifications | react-hot-toast |

---

## Project Structure

```
subscription-tracker/
├── frontend/              # React application
│   ├── src/
│   │   ├── pages/        # LandingPage, Dashboard, OnboardingForm
│   │   ├── components/   # UI components (forms, tables, cards, modals)
│   │   ├── api/           # Axios API wrapper
│   │   ├── context/       # SubscriptionContext (global state)
│   │   ├── hooks/         # useSubscriptions, useMetrics
│   │   └── styles/        # Tailwind + design system
│   └── README.md
│
├── backend/              # Express API
│   ├── src/
│   │   ├── config/        # Supabase client
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── validators/    # Input validation
│   │   └── middleware/     # Error handling
│   └── README.md
│
└── README.md
```

---

## Quick Start

### 1. Set up Supabase Database
Run the SQL from `backend/README.md` in Supabase SQL Editor.

### 2. Start Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Deployment

### Frontend — Vercel (Free & Open Source)

The frontend is deployed on **Vercel** which offers a generous free tier for open source projects:

1. **Connect GitHub Repository** to Vercel
2. **Set Environment Variables** in Vercel:
   ```
   VITE_API_BASE_URL=https://your-backend.vercel.app/api
   ```
3. **Deploy** — Vercel auto-deploys on every push to `master`

**Why Vercel?**
- Free tier for open source projects
- Automatic HTTPS/SSL
- Global CDN for fast loading
- Preview deployments for pull requests

### Backend — Railway, Render, or Vercel Functions

Options for backend deployment:

| Platform | Free Tier | Notes |
|----------|-----------|-------|
| **Railway** | $5/month credit | Easy Node.js deployment |
| **Render** | Free (sleeps after 15min) | Good for demos |
| **Vercel Serverless** | Free | Requires adapter for Express |
| **DigitalOcean App Platform** | Free for 3 apps | Good alternative |

### Database — Supabase (Free Tier)

Supabase provides a generous free tier:
- 500MB database
- 1GB file storage
- 2GB bandwidth/month
- 50K monthly active users

**Total Cost: $0/month** (for personal/small project use)

---

## Design System

- **Background**: Deep navy (`#0f172a`)
- **Primary**: Electric blue (`#3b82f6`)
- **Warning**: Amber (`#f59e0b`) — **only** for "Renewing Soon"
- **Positive**: Green (`#22c55e`)
- **Danger**: Red (`#ef4444`)
- **Cards**: Dark surfaces (`#1e293b`)
- **Typography**: Inter font family
- **Theme**: Dark mode (finance app aesthetic)

---

## Environment Variables

### Frontend
```
VITE_API_BASE_URL=http://localhost:5001/api
```

### Backend
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxx
PORT=5001
FRONTEND_URL=http://localhost:5173
```

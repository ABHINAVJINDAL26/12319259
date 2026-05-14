# Campus Notification Dashboard

A Next.js frontend application for browsing and prioritizing campus notifications.

## Features

- **All Notifications** - View all notifications with type filtering and pagination
- **Priority Inbox** - See the most important notifications ranked by type and recency
- **Notification Status** - Track new vs viewed notifications
- **Type Filtering** - Filter by Placement, Result, or Event notifications
- **Responsive Design** - Works on desktop and mobile devices

## Setup

### Requirements
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=http://4.224.186.213/evaluation-service
NEXT_PUBLIC_BEARER_TOKEN=your_auth_token_here
```

### Running the App

Development mode:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

Production build:
```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # All notifications page
│   ├── priority/
│   │   └── page.tsx          # Priority inbox page
│   ├── layout.tsx            # Root layout
│   └── layout-client.tsx     # Client-side theme provider
├── components/
│   ├── Navbar.tsx            # Top navigation
│   ├── NotificationCard.tsx  # Single notification display
│   ├── NotificationList.tsx  # List wrapper with pagination
│   └── FilterBar.tsx         # Type filter and controls
├── lib/
│   ├── api.ts                # API client functions
│   ├── logger.ts             # Logging utility
│   └── evaluationAuth.ts     # Token management
├── logging_middleware/       # Logging middleware package
├── stage1.ts                 # Priority algorithm implementation
└── notification_system_design.md  # Algorithm documentation
```

## Pages

### All Notifications (`/`)

Displays all available notifications with:
- Type filter (All Types, Placement, Result, Event)
- Pagination controls
- New/viewed status indicators
- Click to mark as viewed

### Priority Inbox (`/priority`)

Shows top N priority notifications:
- Adjustable top N selector (10, 15, 20)
- Weighted by notification type and recency
- Type filter support
- Pagination

## Priority Algorithm

Notifications are ranked using a weight-based score:

```
Score = (Type Weight × 10^13) + Timestamp
```

**Type Weights:**
- Placement: 3 (highest priority)
- Result: 2
- Event: 1

Same-type notifications are ordered by recency (newest first).

## API Endpoints

The app proxies requests through local Next.js API routes:

- `GET /api/notifications` - Fetch notifications
- `POST /api/logs` - Submit log entries

## Browser Storage

Viewed notification IDs are stored in localStorage under the key `viewedNotifications`.

## Technologies

- Next.js 16
- React 19
- TypeScript
- Material UI 9
- Emotion (styling)

## Logging

The app uses a custom logging middleware integrated throughout the codebase. Logs are sent to the evaluation service for tracking.

## Notes

- Notifications are not persisted locally - fresh data is fetched on each page load
- Authentication uses bearer tokens fetched from the evaluation service
- The priority algorithm runs client-side without database storage

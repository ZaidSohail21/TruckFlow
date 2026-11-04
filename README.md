# TruckFlow — Agentic Truck Dispatching & Fleet Management System

**Phase 1 & Phase 1.5: Frontend Foundation, Design System, Role Dashboards, and Public Company Website**

---

## 1. Product Overview

**TruckFlow** is an enterprise-grade logistics technology SaaS platform designed for commercial freight dispatchers, fleet managers, truck drivers, and cargo customers. TruckFlow brings together dispatch operations, equipment capacity, driver milestone coordination, and autonomous AI agents operating under strict human dispatch oversight.

### Platform Structure

1. **Public Marketing Website & Company Portfolio** (`/`, `/about`, `/platform`, `/solutions`, `/reviews`, `/contact`, `/request-access`):
   - High-impact commercial highway truck photography and telemetry motion design.
   - 4-pillar capability overview: Dispatcher Agent, Fleet Tracking, Driver Comms Agent, Customer Agent.
   - Role-specific solution breakdowns and honest early-product research insights.
   - Supervised **Access Request System** for controlled role onboarding.
   - Functional contact inquiry system with local demonstration logging.

2. **Authenticated Operational Workspaces**:
   - **Dispatcher** (`/dispatcher/dashboard`) — Load matching, active fleet assignments, delay risk alerts.
   - **Fleet Manager** (`/fleet/dashboard`) — Equipment roster, asset readiness, maintenance scheduling.
   - **Driver** (`/driver/dashboard`) — Mobile-first assignment card, touch-friendly arrival check-ins, POD uploads.
   - **Customer** (`/track`) — Public shipment tracking portal with milestone cards and delivery status.
   - **Administrator** (`/admin/dashboard`) — User role provisioning, AI agent monitoring, security governance.

---

## 2. Technology Stack

- **Framework**: React 19 + TypeScript 7 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom `@theme` tokens and `@custom-variant dark`
- **Routing**: React Router v6 (Data Router pattern with centralized route guards)
- **Animation**: Framer Motion (respects `prefers-reduced-motion`)
- **Global State**: Zustand (session state, responsive sidebar, persistent theme preference)
- **Server State**: TanStack Query v5 (query client primed for Phase 2 REST/GraphQL APIs)
- **Forms & Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Date Utilities**: date-fns
- **Linting & Type Safety**: TypeScript 7 strict mode + Oxlint (0 errors, 0 warnings)

---

## 3. Brand Identity & Design System

TruckFlow uses a specialized operational logistics palette:

- **Primary Navy**: `#183153` (Sidebar, hero scrim, authority surfaces)
- **Primary Steel Blue**: `#3976A8` (Active navigation, primary buttons, interactive highlights)
- **Surface Background**: `#F5F7FA` | **Card Surface**: `#FFFFFF`
- **Text Primary**: `#182230` | **Text Secondary**: `#64748B` | **Border**: `#E2E8F0`
- **Semantic Colors**:
  - Success: `#16A36A` (Available equipment, on-time loads, active status)
  - Warning: `#D99A25` (Depot maintenance, schedule risks, upcoming items)
  - Danger: `#D94A4A` (Delayed loads, critical alerts, urgent items)
- **Typography Scale**:
  - **Inter**: Headings, body copy, and UI controls
  - **JetBrains Mono**: Reference identifiers (`TF-1042`, `TRK-012`), telemetry speeds, timestamps
- **Theme Support**: Synchronized Light and Dark themes with persistent localStorage.

---

## 4. Getting Started

### Prerequisites

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Installation & Run

```bash
# Navigate to project directory
cd d:\Downloads\FYP\TruckFlow

# Install dependencies (already installed)
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore the public marketing website, or `http://localhost:5173/login` for the workspace login.

### Production Build & Lint

```bash
# Type check and production build
npm run build

# Run Oxlint
npm run lint
```

---

## 5. Public Website Navigation Map

| Path | Page | Description |
|---|---|---|
| `/` | **Home** | Cinematic truck hero, telemetry animation, brand overview, 4-step workflow, and role solutions |
| `/about` | **About** | Mission, vision, core product principles, and human-in-the-loop philosophy |
| `/platform` | **Platform** | Comprehensive breakdown of the 4 AI agents with operational safety disclosures |
| `/solutions` | **Solutions** | Detailed operational challenge vs. capability matrix for each role |
| `/reviews` | **Reviews** | Qualitative research findings, pilot evaluation insights, and cohort participation |
| `/contact` | **Contact** | Inquiry form with Zod validation and isolated mock logging |
| `/request-access` | **Request Access** | Controlled role onboarding request form with review queue confirmation |
| `/track` | **Shipment Tracking** | Public self-service tracking portal with search and milestone cards |

---

## 6. Demo Credentials (Phase 1 Mock Authentication)

| Role | Email | Password | Default Redirect |
|---|---|---|---|
| **Dispatcher** | `dispatcher@truckflow.com` | `demo1234` | `/dispatcher/dashboard` |
| **Fleet Manager** | `fleet@truckflow.com` | `demo1234` | `/fleet/dashboard` |
| **Driver** | `driver@truckflow.com` | `demo1234` | `/driver/dashboard` |
| **Customer** | `customer@truckflow.com` | `demo1234` | `/track` |
| **Administrator** | `admin@truckflow.com` | `demo1234` | `/admin/dashboard` |

---

## 7. Architecture & Folder Structure

```
src/
├── app/
│   ├── providers.tsx         # QueryClientProvider, Sonner Toaster, store initializers
│   ├── query-client.ts       # TanStack Query client configuration
│   └── router.tsx            # Public marketing routes + auth routes + protected role routes
├── components/
│   ├── feedback/             # AccessDenied, NotFound, ComingSoon, ConfirmationDialog
│   ├── forms/                # FormInput, FormPasswordInput
│   ├── shared/               # StatCard, StatusBadge, PageHeader, PageContainer, ActivityTimeline
│   └── tables/               # Generic responsive DataTable with search/sort/pagination
├── features/
│   ├── auth/                 # LoginPage, ForgotPasswordPage, ResetPasswordPage, ProtectedRoute
│   ├── dashboard/            # DispatcherDashboard, FleetDashboard, DriverDashboard, CustomerTrackPage, AdminDashboard
│   └── marketing/            # Public company website feature module
│       ├── components/       # HeroSection, BrandIntroduction, PlatformOverview, ProductShowcase, etc.
│       ├── pages/            # HomePage, AboutPage, PlatformPage, SolutionsPage, ReviewsPage, ContactPage, RequestAccessPage
│       ├── services/         # requestAccessService.ts, contactService.ts (isolated mock adapters)
│       └── types/            # marketing.types.ts
├── layouts/                  # MarketingLayout, AppLayout, AppSidebar, AppHeader, AuthLayout
├── lib/                      # constants.ts, navigation.ts, utils.ts
├── mocks/                    # Mock data for users, loads, trucks, drivers, activity, recommendations
├── services/                 # authService.ts (isolated adapter for easy API swapping)
├── store/                    # authStore.ts, sidebarStore.ts, themeStore.ts (Zustand)
├── types/                    # Domain models, enum definitions, API response shapes
└── main.tsx                  # React 19 entry point
```

---

## 8. Quality & Acceptance Summary

- [x] **Cinematic Hero**: Full-width commercial highway semi-truck photography with dark gradient scrims and animated telemetry progress line.
- [x] **Motion Design**: Smooth entrance reveals, staggered child cards, and reduced-motion compatibility powered by Framer Motion.
- [x] **Complete Public Suite**: Dedicated pages for Home, About, Platform, Solutions, Reviews, Contact, and Request Access.
- [x] **Controlled Onboarding**: Request Access system supporting Dispatcher, Fleet Manager, Driver, and Customer roles with validation and confirmation screens.
- [x] **Seamless Auth Handoff**: Marketing navbar dynamically presents "Go to Dashboard" when a session is active and "Sign In" when unauthenticated.
- [x] **Zero Build & Lint Errors**: Strict TypeScript check and Oxlint pass with 0 errors and 0 warnings.

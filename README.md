# 🏃‍♂️ SportZone Store - Production-Ready Full-Stack Platform

A complete, production-ready e-commerce web platform for sports gear, performance footwear, and activewear. Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion**, and a dedicated **Express + TypeScript Backend Server**.

Repository: [https://github.com/muzamilCodes/-SportZone-](https://github.com/muzamilCodes/-SportZone-)

---

## 📌 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites & Environment Variables](#prerequisites--environment-variables)
- [How to Run (Separate Frontend & Backend)](#how-to-run-separate-frontend--backend)
- [Database Setup & Seed Data](#database-setup--seed-data)
- [Running Automated Tests](#running-automated-tests)
- [Honest Checkout & Payment Integration](#honest-checkout--payment-integration)
- [Performance & Accessibility (A11y)](#performance--accessibility-a11y)
- [API Reference](#api-reference)
- [Deployment Guidelines](#deployment-guidelines)

---

## 🏗️ Architecture Overview

The codebase is structured with clean separation of concerns:

- **Frontend (Root)**: React 18 Single Page Application with client-side routing via React Router DOM, route-level code splitting (`React.lazy`), 3D depth tilt effects (`ThreeDTilt`), interactive 3D physics sports sphere, and Cart/Auth Contexts. Runs by default on `http://localhost:8080`.
- **Backend (`/server`)**: Modular Express + TypeScript REST API featuring JWT authentication, Bcrypt password hashing, Zod schema validation, server-side price recalculation, stock tracking, and user-isolated order management. Runs by default on `http://localhost:4000`.

---

## 🌟 Key Features

### 1. 3D-Style Interactive Visual Experience
- **Page-Specific 3D Depth**: Interactive mouse hover-tilt with CSS 3D perspective (`preserve-3d`, `rotateX`, `rotateY`) on Home hero, Product cards, Product details, Cart summary, Checkout summary, Login card, Dashboard profile, About values, and 404.
- **Interactive 3D Sports Sphere**: Canvas-based 3D rotating geometry on the homepage with mouse drag interaction and physics damping.
- **Lightweight Fallbacks**: Automatically disables heavy 3D calculations on touch/mobile devices and respects the user's `prefers-reduced-motion` accessibility preferences.

### 2. Fully Working Authentication & Verified Sessions
- **Password Security**: Passwords hashed securely using `bcryptjs` (salt rounds: 10).
- **Session Verification**: Frontend automatically validates stored JWT tokens against the server endpoint (`GET /auth/me`) on mount. If a token expires or is invalid, the user is safely logged out.
- **Consistent Contract**: Full support and aliases for both `/user/login`, `/user/register` and `/api/auth/login`, `/api/auth/register`, eliminating endpoint mismatch.

### 3. Server-Recalculated E-Commerce & Stock Protection
- **No Client Price Trust**: The backend ignores client-submitted prices and recalculates item subtotals, standard 8% tax, and shipping fees ($4.99 or Free on orders >= $50) directly from verified database records.
- **Stock Validation**: Orders exceeding available inventory are strictly rejected with HTTP 400. Stock decrements atomically on order creation.
- **User Order Isolation**: Each user can only view their own orders (`GET /order`). Cross-user order lookup returns HTTP 403 Forbidden.

### 4. Honest & Transparent Checkout
- Clear distinction between **Cash on Delivery (COD)** and **Card Payment (Sandbox Simulation)**.
- No misleading "payment completed" claims without a live merchant transaction.
- Standard environment variable placeholders provided for live Stripe integration (`VITE_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`).

### 5. Performance & Accessibility
- **Route-Level Code Splitting**: All pages lazy-loaded via `React.lazy()` with custom loading fallback, reducing initial JavaScript chunk size.
- **Sensible Caching**: React Query configured with 5-minute stale-time caching.
- **Accessibility**: Full keyboard navigation, visible focus rings, ARIA roles, and high-contrast color tokens.

---

## 🛠️ Tech Stack

| Component | Technologies |
|---|---|
| **Frontend Framework** | React 18, TypeScript 5, Vite 5 |
| **Styling & Design System** | Tailwind CSS 3, `tailwindcss-animate`, shadcn/ui (Radix UI) |
| **Animations & 3D** | Framer Motion, HTML5 3D Canvas Physics, CSS 3D Perspective |
| **Routing & State** | React Router DOM v6, React Context, TanStack React Query v5 |
| **Backend API** | Express 4, TypeScript 5, Node.js (via `tsx`) |
| **Security & Auth** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cors` |
| **Validation** | Zod (strict backend schemas) |
| **Testing** | Vitest, Supertest, React Testing Library, jsdom |

---

## 📁 Folder Structure

```text
SportZone-Store/
├── public/                 # Static assets & icons
├── src/                    # Frontend application source
│   ├── api/                # Configured Axios instance with interceptors
│   ├── components/         # Reusable UI components
│   │   ├── ThreeDTilt.tsx  # 3D perspective tilt component with motion fallback
│   │   ├── ThreeDSportsBall.tsx # 3D interactive sports sphere
│   │   ├── ProductCard.tsx # 3D interactive product card
│   │   └── ui/             # shadcn/ui components (Radix primitives)
│   ├── context/            # React Contexts (AuthContext, CartContext)
│   ├── layout/             # MainLayout, Navbar, Footer
│   ├── pages/              # Lazy-loaded route views (Home, Products, Details, Cart, etc.)
│   ├── test/               # Frontend unit & characterization test suite
│   ├── App.tsx             # Root router with Suspense & Context Providers
│   └── index.css           # Global Tailwind CSS and design tokens
├── server/                 # Dedicated backend REST API
│   ├── src/
│   │   ├── __tests__/      # Backend integration & security tests
│   │   ├── middleware/     # JWT authentication & validation middleware
│   │   ├── routes/         # Auth, Product, and Order routes
│   │   ├── app.ts          # Express application setup & route aliases
│   │   ├── db.ts           # Persistent database manager & atomic storage
│   │   ├── index.ts        # Server entrypoint (Port 4000)
│   │   ├── seed.ts         # Standalone database seed script
│   │   └── seedData.ts     # Realistic sports products dataset
│   ├── package.json        # Backend dependencies & test scripts
│   ├── tsconfig.json       # Backend TypeScript configuration
│   └── .env.example        # Backend environment variables template
├── .env.example            # Frontend environment variables template
├── package.json            # Root scripts for dev, build, lint, and test
├── tailwind.config.ts      # Tailwind design configuration
└── vite.config.ts          # Vite configuration
```

---

## ⚙️ Prerequisites & Environment Variables

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Frontend Environment (`.env`)
Create a `.env` file in the root directory:
```bash
# Backend REST API URL
VITE_API_URL=http://localhost:4000

# Optional Stripe Publishable Key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder_key_here
```

### Backend Environment (`server/.env`)
Create a `.env` file in the `server/` directory:
```bash
PORT=4000
JWT_SECRET=sportzone_production_secret_key_2026
CLIENT_ORIGIN=http://localhost:8080
STRIPE_SECRET_KEY=sk_test_placeholder_key_here
```

---

## 🚀 How to Run (Separate Frontend & Backend)

You can run the backend and frontend in separate terminal windows:

### Terminal 1: Run Backend Server
```bash
# Option A: From root directory
npm run server:dev

# Option B: From inside the server folder
cd server
npm install
npm run dev
```
> The backend server will start at: **`http://localhost:4000`**  
> Health check: `http://localhost:4000/api/health`

### Terminal 2: Run Frontend Web App
```bash
# From root directory
npm install
npm run dev
```
> The frontend application will start at: **`http://localhost:8080`**

---

## 🗄️ Database Setup & Seed Data

The project includes an automatic JSON database with persistence in `server/data/db.json`. It auto-seeds on first run with 8 high-performance sports items (Nike Pegasus 40, Wilson Evolution Basketball, Garmin Forerunner 265, Babolat Pure Aero Racket, etc.).

To re-seed the database manually at any time:
```bash
npm run seed
# or: cd server && npm run seed
```

---

## 🧪 Running Automated Tests

A comprehensive suite of **20 automated characterization and security tests** is provided:

### Run Both Test Suites
```bash
npm run test:all
```

### Run Frontend Tests (Vitest + React Testing Library)
```bash
npm test
```
- Tests CartContext addition, quantity increment, removal, subtotal calculation, and clear cart.

### Run Backend Tests (Vitest + Supertest)
```bash
npm run test:server
```
- Tests password hashing with bcrypt
- Duplicate email prevention (409)
- Login validation & wrong password rejection (401)
- Verified session retrieval via `/auth/me` with Bearer tokens
- Products catalog & category filtering
- Server-side price recalculation & anti-tamper price defense
- Stock sufficiency enforcement (rejects orders over stock)
- User order ownership & cross-user 403 authorization protection

---

## 💳 Honest Checkout & Payment Integration

The checkout process operates transparently without misleading claims:

1. **Cash on Delivery (COD)**: Fully functional out of the box. Records the order with `paymentMethod: cash_on_delivery` and `status: pending`.
2. **Card Payment (Sandbox Simulation)**: Records the order in test mode with a clear notice indicating that live payment processing requires setting `VITE_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`.

---

## 🌐 API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Service health check | No |
| `POST` | `/user/register` or `/auth/register` | Register new user account | No |
| `POST` | `/user/login` or `/auth/login` | Login user and receive JWT token | No |
| `GET` | `/auth/me` | Fetch verified profile of logged-in user | **Yes** (`Bearer <token>`) |
| `GET` | `/product` | List all products with search & category filters | No |
| `GET` | `/product/:id` | Fetch product details by ID | No |
| `POST` | `/order` | Place order with server price & stock recalculation | Optional (associates if logged in) |
| `GET` | `/order` | Retrieve user's order history | **Yes** (`Bearer <token>`) |
| `GET` | `/order/:id` | Retrieve single order details (ownership protected) | **Yes** (`Bearer <token>`) |

---

## 🚢 Deployment Guidelines

- **Frontend**: Deploy to Vercel, Netlify, or Cloudflare Pages. Set build command to `npm run build` and output directory to `dist`. Set environment variable `VITE_API_URL` to your production backend URL.
- **Backend**: Deploy `server/` to Render, Railway, Fly.io, or Heroku. Set build command to `npm run build` and start command to `npm start`. Set environment variables `PORT`, `JWT_SECRET`, and `CLIENT_ORIGIN`.

---

## 📄 License & Attribution

Developed for **SportZone Store**. All rights reserved.

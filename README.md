# 🏃‍♂️ SportZone Store - Modern E-Commerce Platform

A sleek, modern, and high-performance e-commerce web application built for sports gear, apparel, and lifestyle products. Powered by **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **shadcn/ui**.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Application Pages & Routes](#application-pages--routes)
- [Backend & API Integration](#backend--api-integration)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture & Design Decisions](#architecture--design-decisions)

---

## 🌟 Overview

**SportZone Store** delivers a complete online shopping experience with seamless navigation, responsive UI, dynamic shopping cart management, authenticated user flow, and order tracking. It is built as a Single Page Application (SPA) leveraging React Router and client-side caching.

---

## 🚀 Key Features

### 🛍️ Storefront & Shopping
- **Hero & Promotional Sections**: Engaging banners, value propositions (Free Shipping, Secure Payments, 24/7 Support), and category showcases.
- **Product Catalog (`/products`)**: Browse items with real-time category filtering and live search capabilities.
- **Product Details (`/product/:id`)**: Rich view with high-resolution imagery, pricing, descriptions, quantity selection, and instant Add to Cart.
- **Interactive Shopping Cart (`/cart`)**: Real-time quantity adjustments, subtotal calculation, discount summaries, and direct checkout initiation.
- **Checkout Flow (`/checkout`)**: Multi-step checkout with delivery address forms, order review, payment option selection, and toast notifications.

### 👤 Authentication & Dashboard
- **User Authentication (`/login`)**: Unified Login and Registration toggle with JWT token persistence in `localStorage`.
- **User Dashboard (`/dashboard`)**: Displays user profile details and full order history with status badges (`pending`, `processing`, `shipped`, `delivered`).
- **Protected State**: Axios interceptors automatically attach the `Authorization: Bearer <token>` header to secured API calls and handle 401 unauthenticated redirects.

### ℹ️ Informational & Support Pages
- **About Us (`/about`)**: Company story, mission, and brand philosophy.
- **Contact Us (`/contact`)**: Interactive contact form and direct store contact details.
- **FAQ (`/faq`)**: Expandable accordion questions covering ordering, payments, and delivery.
- **Shipping & Returns (`/shipping`, `/returns`)**: Comprehensive shipping and return policy guidelines.

### 🎨 Visuals & UX
- **Dark & Light Mode**: Built-in theme switcher using `next-themes` with automatic system theme detection.
- **Micro-Animations**: Smooth page and component transitions powered by `framer-motion`.
- **Accessible UI Primitives**: 40+ customized components from `shadcn/ui` based on Radix UI.
- **Toast Notifications**: Feedback toasts via `sonner` and `shadcn` toast system.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Core Framework** | [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Tooling** | [Vite 5](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/), `tailwindcss-animate`, `clsx`, `tailwind-merge` |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) |
| **State & Data Fetching** | React Context API, [TanStack React Query v5](https://tanstack.com/query/latest) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Charts & Carousel** | [Recharts](https://recharts.org/), [Embla Carousel](https://www.embla-carousel.com/) |

---

## 📁 Folder Structure

```text
sportzone-package/
├── public/                 # Static assets & icons
├── src/
│   ├── api/
│   │   └── axios.ts        # Configured Axios instance with request/response interceptors
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # shadcn/ui primitives (Button, Dialog, Card, Input, etc.)
│   │   ├── Loader.tsx      # Spinners & skeleton loaders
│   │   ├── NavLink.tsx     # Navigation link helper
│   │   ├── ProductCard.tsx # Standardized product card
│   │   ├── SearchBar.tsx   # Search input component
│   │   └── ThemeToggle.tsx # Light/Dark mode toggle button
│   ├── context/            # React Context state managers
│   │   ├── AuthContext.tsx # User login, registration, and session state
│   │   └── CartContext.tsx # Shopping cart items, counts, and pricing
│   ├── hooks/              # Custom React hooks (toast, mobile detection, etc.)
│   ├── layout/
│   │   ├── MainLayout.tsx  # Global layout wrapping Navbar, Content, and Footer
│   │   ├── Navbar.tsx      # Top navigation header with cart badge & mobile menu
│   │   └── Footer.tsx      # Site-wide footer with quick links & newsletter
│   ├── lib/                # Utilities (e.g., utils.ts for cn class merge)
│   ├── pages/              # Application views / routes
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── FAQ.tsx
│   │   ├── Shipping.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx             # Application router & providers wrapper
│   ├── index.css           # Global Tailwind CSS and theme design tokens
│   └── main.tsx            # React application entry point
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind design system configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 🧭 Application Pages & Routes

| Route | Page File | Description |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Main landing page with hero banners, categories & featured items |
| `/products` | `src/pages/Products.tsx` | Complete product catalog with search & filtering |
| `/product/:id` | `src/pages/ProductDetails.tsx` | Detailed product showcase, specifications & add to cart |
| `/cart` | `src/pages/Cart.tsx` | Shopping cart list, quantity controls & order summary |
| `/checkout` | `src/pages/Checkout.tsx` | Checkout form with billing, shipping, and payment |
| `/login` | `src/pages/Login.tsx` | User login and registration forms |
| `/dashboard` | `src/pages/Dashboard.tsx` | User profile and real-time order history tracking |
| `/about` | `src/pages/About.tsx` | Brand story and mission statement |
| `/contact` | `src/pages/Contact.tsx` | Customer support contact form and details |
| `/faq` | `src/pages/FAQ.tsx` | Frequently asked questions accordion |
| `/shipping` | `src/pages/Shipping.tsx` | Shipping information and delivery estimates |
| `/returns` | `src/pages/Shipping.tsx` | Return and refund policies |
| `*` | `src/pages/NotFound.tsx` | 404 error page with quick return home button |

---

## 🔌 Backend & API Integration

The frontend connects to a REST API via `src/api/axios.ts` configured with a base URL of `http://localhost:4000`.

### Expected API Endpoints:
- **Authentication**:
  - `POST /auth/login` - Authenticate user credentials and return JWT token
  - `POST /auth/register` - Create a new user account
  - `GET /auth/me` - Fetch logged-in user profile
- **Products**:
  - `GET /product` - Retrieve list of products
  - `GET /product/:id` - Retrieve single product details
- **Orders**:
  - `GET /order` - Retrieve user's order history
  - `POST /order` - Place a new customer order

> [!NOTE]
> To change the backend API URL, edit `baseURL` inside `src/api/axios.ts` or set up a `.env` environment variable (`VITE_API_URL`).

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm`, `yarn`, `pnpm`, or `bun`

### Installation Steps

1. **Clone or navigate to the repository directory**:
   ```bash
   cd sportzone-package
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) (or the port specified by Vite in your terminal) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📜 Available Scripts

- `npm run dev`: Starts Vite dev server with Hot Module Replacement (HMR).
- `npm run build`: Compiles TypeScript and builds the production bundle into `/dist`.
- `npm run build:dev`: Compiles development build mode.
- `npm run lint`: Runs ESLint to check for code quality and syntax issues.
- `npm run preview`: Locally serves the production build.

---

## 💡 Architecture & Design Decisions

- **Client-Side Routing**: Informational storefront pages (`/about`, `/contact`, `/faq`, `/shipping`) are registered directly in React Router, ensuring fast navigation without extra backend latency.
- **Decoupled State**: Cart items are managed in `CartContext`, allowing instant updates across the Navbar badge, Cart view, and Product cards.
- **Theme Resilience**: Dark/Light mode tokens are mapped via CSS variables in `src/index.css` for consistent contrast across components.

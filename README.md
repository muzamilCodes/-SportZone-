# 🏃‍♂️ SportZone Store - Modern Full-Stack E-Commerce Platform

A production-ready e-commerce web platform for sports gear, performance footwear, and activewear with **completely separated Frontend and Backend architectures**.

Repository: [https://github.com/muzamilCodes/-SportZone-](https://github.com/muzamilCodes/-SportZone-)

---

## 📁 Project Architecture & Clean Folder Structure

The project is cleanly split into two standalone, dedicated applications:

```text
SportZone-Store/
├── frontend/               # 🎨 REACT + VITE + TAILWIND FRONTEND
│   ├── src/
│   │   ├── api/            # Axios HTTP client with auth token interceptor
│   │   ├── components/     # UI primitives & 3D Tilt components
│   │   ├── context/        # AuthContext (session verified) & CartContext
│   │   ├── layout/         # Navbar, Footer, MainLayout
│   │   ├── pages/          # Code-split lazy routes (Home, Products, Checkout, etc.)
│   │   └── test/           # Frontend unit & shopping flow tests
│   ├── public/             # Static icons & SVGs
│   ├── package.json        # Frontend dependencies & scripts
│   ├── vite.config.ts      # Vite dev & build configuration
│   ├── tailwind.config.ts  # Tailwind CSS tokens & dark mode styling
│   ├── vitest.config.ts    # Frontend test configuration
│   └── .env.example        # Frontend environment variables template
│
├── backend/                # ⚙️ EXPRESS + TYPESCRIPT REST API
│   ├── src/
│   │   ├── routes/         # Auth, Product, and Order route handlers
│   │   ├── middleware/     # JWT authentication & validation middleware
│   │   ├── __tests__/      # Backend security & recalculation test suite
│   │   ├── db.ts           # Persistent database manager with atomic writes
│   │   ├── app.ts          # Express application setup & CORS configuration
│   │   ├── index.ts        # Backend entrypoint (Port 4000)
│   │   ├── seed.ts         # Standalone database seed script
│   │   ├── seedData.ts     # Initial realistic sports products catalog
│   │   └── types.ts        # TypeScript data contracts & models
│   ├── data/
│   │   └── db.json         # File-based JSON database storage
│   ├── package.json        # Backend dependencies & test scripts
│   ├── tsconfig.json       # Backend TypeScript configuration
│   ├── .env.example        # Backend environment variables template
│   └── .gitignore
│
├── package.json            # Root scripts to run both simultaneously or individually
├── .gitignore              # Root git ignore
└── README.md               # Complete documentation
```

---

## 🚀 Running on Localhost (Frontend & Backend)

### Method 1: Run Both Simultaneously from Root (Recommended)
From the root directory (`SportZone-Store/`):
```bash
# Start both backend (Port 4000) and frontend (Port 8080) concurrently
npm run dev
```

---

### Method 2: Run Separately in Individual Terminals

#### 🔹 Terminal 1: Backend Server (Port 4000)
```bash
cd backend
npm run dev
```
- **Backend API URL**: `http://localhost:4000`
- **Health Check**: `http://localhost:4000/api/health`
- **Products Endpoint**: `http://localhost:4000/product`

#### 🔹 Terminal 2: Frontend Web Application (Port 8080)
```bash
cd frontend
npm run dev
```
- **Frontend App URL**: `http://localhost:8080`

---

## 🌟 Key Full-Stack Features

1. **Clean Separation**: Frontend and Backend have their own dependencies, configuration files, and scripts without any overlap.
2. **3D Visual Experience**: Interactive mouse perspective tilt (`ThreeDTilt`) on products, cards, and hero sections, alongside a 3D Canvas physics sports ball with reduced-motion support.
3. **Verified Authentication**: Passwords securely hashed with `bcryptjs`. Server-verified session on app mount via `GET /auth/me`.
4. **Server-Side Price & Stock Recalculation**: Backend validates prices, stock sufficiency, 8% tax, and shipping calculation directly from database records, preventing any client-side tampering.
5. **Honest Checkout**: Clear distinction between Cash on Delivery (COD) and Test Card Sandbox with transparent feedback.
6. **Route-Level Code Splitting**: All pages lazy-loaded via `React.lazy()` with skeleton loading states for high performance.

---

## 🧪 Running Automated Tests

Run all 20 tests across both frontend and backend:
```bash
npm run test
```

Or run individually:
```bash
# Frontend tests (Vitest + React Testing Library)
npm run test:frontend

# Backend tests (Vitest + Supertest)
npm run test:backend
```

---

## 🔑 Environment Variables Setup

### Frontend (`frontend/.env`)
```bash
VITE_API_URL=http://localhost:4000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder_key_here
```

### Backend (`backend/.env`)
```bash
PORT=4000
JWT_SECRET=sportzone_production_secret_key_2026
CLIENT_ORIGIN=http://localhost:8080
STRIPE_SECRET_KEY=sk_test_placeholder_key_here
```

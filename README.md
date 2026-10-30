## AIORI — Federated Traffic Intelligence Suite

> **PS-003** · Federated Learning on METR-LA Dataset  
> Real-time traffic forecasting with privacy-preserving edge AI

---

### 🧠 What is AIORI?

AIORI is a full-stack federated learning simulation platform for intelligent traffic systems. It simulates how 4 RSU (Roadside Unit) edge nodes collaboratively train GRU/TCN/MLP-Mixer/ST-GNN models on the METR-LA highway sensor dataset — **without any raw data ever leaving the edge**.

---

### ✨ Features

| Feature | Description |
|--------|-------------|
| 🌐 **3D Digital Twin** | Procedural Three.js highway + RSU node visualization |
| 📊 **Live Forecast Dashboard** | Real-time METR-LA traffic speed predictions |
| 🔬 **Heatmap & Shard Studio** | Non-IID Dirichlet data distribution visualizer |
| ⚖️ **Simulation Comparison** | Side-by-side benchmark pinning & cloud sync |
| 🌸 **Flower FedLLM Studio** | Federated LLM traffic reasoning (FlowerTune) |
| 🎙️ **Gemini Live AI** | Voice & text AI dispatch assistant powered by Gemini 3.8 |
| 🔐 **Supabase Auth** | Google OAuth, Email/Password, & Anonymous authentication |
| 🗄️ **Supabase Database** | PostgreSQL cloud storage with Row Level Security (RLS) for pinned runs |
| ⚡ **Vercel Serverless Ready** | Native Vercel functions for zero-configuration, instant cloud deployment |
| 🌍 **8 Indian Languages** | EN, HI, KN, TA, TE, ML, MR, BN |

---

### 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 6 + Tailwind CSS v4
- **3D Visualization**: Three.js
- **AI Engine**: Google Gemini API (`gemini-3.8-flash`, `gemini-3.8-live`)
- **Backend / Serverless**: Vercel Serverless Functions (`/api/*`) + Node.js / Express / WebSocket (local dev & streaming)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

---

### ⚙️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env
# Fill in your GEMINI_API_KEY and VITE_SUPABASE_* credentials in .env

# 3. Start development server
npm run dev
```

Visit `http://localhost:3000` (or `http://localhost:5173` if running Vite directly with `npm run build` / preview).

---

### 🗄️ Supabase Database Setup

To enable cloud saving and synchronization of simulation runs:

1. Create a project at [Supabase](https://app.supabase.com).
2. Open the **SQL Editor** tab in your Supabase dashboard.
3. Run the schema script located in [`supabase/schema.sql`](./supabase/schema.sql):
   ```sql
   CREATE TABLE IF NOT EXISTS pinned_runs (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
     timestamp TEXT,
     config JSONB,
     metrics JSONB,
     rsu_metrics JSONB,
     user_id TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```
4. Copy your **Project URL** and **Anon Key** from `Project Settings → API` into your `.env` or Vercel environment variables.

---

### 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Optional | Google Gemini API key for live AI dispatch & Flower FedLLM reasoning |
| `VITE_SUPABASE_URL` | Optional | Supabase project URL (e.g. `https://xyz.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Optional | Supabase anonymous public API key |
| `SUPABASE_URL` | Optional | Supabase project URL for serverless functions |
| `SUPABASE_ANON_KEY` | Optional | Supabase anon key for serverless functions |
| `NODE_ENV` | Auto | Set to `production` when deployed |
| `PORT` | Auto | Local server port (default: 3000) |

*(Note: The app includes intelligent client-side mock fallbacks when API keys are not provided).*

---

### 🚀 Deployment

#### Deploy to Vercel (Recommended)

The project includes pre-configured [vercel.json](./vercel.json) and serverless endpoints in [`api/`](./api).

##### Option 1: Via Vercel CLI
```bash
# Install Vercel CLI globally if not already installed
npm i -g vercel

# Deploy
vercel
```

##### Option 2: Via GitHub Import
1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new) and import your repo.
3. In **Environment Variables**, add:
   - `GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. Vercel will automatically run `npm run vercel-build` and serve the client app and serverless API functions.

---

### 📄 License

MIT — see [LICENSE](./LICENSE)

---

### 🔬 Research Reference

Based on **PS-003**: *Federated Learning for Privacy-Preserving Traffic Forecasting using METR-LA*  
Dataset: [METR-LA](https://github.com/liyaguang/DCRNN) — 207 loop detectors, LA Caltrans District 7

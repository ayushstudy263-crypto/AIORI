# Flow Forge — AIORI Federated Traffic Intelligence Suite

**Hackathon:** AIORI Hackathon 3  
**Problem Statement:** PS-003 — Federated Traffic-Flow Prediction with Communication-Cost Evaluation  
**Category:** Smart Cities  
**Team:** Flow Forge

## Team

| Name | Email |
|------|-------|
| Ayush Rastogi | ayushstudy263@gmail.com |
| Purvi Jain | purvijain22jul2006@gmail.com |
| Dr. Atul Srivastava | asrivastava5@lko.amity.edu |

## Intro Video
- **Complete description of the problem statement:** https://youtu.be/5wjOAO3cRCo
- **Short description of the problem statement:** https://youtu.be/RWwwxcE9wKE

---

### 🧠 Overview & What is AIORI?

Flow Forge explores federated learning for road-traffic forecasting. It simulates a full-stack federated learning simulation platform where 4 RSU (Roadside Unit) edge nodes collaboratively train GRU/TCN/MLP-Mixer/ST-GNN models on the METR-LA highway sensor dataset using Federated Averaging (FedAvg) — **without raw data ever leaving the edge**.

The platform provides interactive 3D digital twins, communication cost & byte payload evaluation, Dirichlet non-IID data partitioning, and real-time cloud sync.

---

### ✨ Features

| Feature | Description |
|--------|-------------|
| 🌐 **3D Digital Twin** | Procedural Three.js highway + RSU edge node traffic visualization |
| 📊 **Live Forecast Dashboard** | Real-time METR-LA traffic speed predictions (GRU, TCN, MLP-Mixer, ST-GNN) |
| 🔬 **Heatmap & Shard Studio** | Non-IID Dirichlet distribution visualizer across simulated clients |
| 📡 **Communication Cost Analysis**| Serialization payload tracking, cumulative bytes, and bandwidth efficiency metrics |
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

### 🚀 Deployment to Vercel

The project includes pre-configured [vercel.json](./vercel.json) and serverless endpoints in [`api/`](./api).

#### Option 1: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

#### Option 2: Via GitHub Import
1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new) and import your repo.
3. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**.

---

### 📁 Repository Contents

| File / Directory | Description |
|------------------|-------------|
| `Proposed-structure-hackathon.pdf` | Hackathon presentation following the AIORI proposed structure |
| `src/` | Full-stack React + Three.js application source code |
| `api/` | Vercel serverless function endpoints |
| `supabase/` | Supabase SQL migration schema |
| `README.md` | Comprehensive project overview, setup, and evaluation guide |

---

### 🔬 Research Reference & Scope

- **Dataset:** [METR-LA](https://github.com/liyaguang/DCRNN) — 207 loop detectors, Los Angeles Caltrans District 7.
- **Federated Reference:** McMahan et al., [Communication-Efficient Learning of Deep Networks from Decentralized Data](https://proceedings.mlr.press/v54/mcmahan17a.html), AISTATS 2017.
- **Scope Note:** The core benchmark uses METR-LA sensor speed readings. Communication cost models payload size of serialized weights and gradient updates.

---

### 📄 License

MIT — see [LICENSE](./LICENSE)

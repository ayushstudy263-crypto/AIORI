## AIORI — Federated Traffic Intelligence Suite

> **PS-003** · Federated Learning on METR-LA Dataset  
> Real-time traffic forecasting with privacy-preserving edge AI

---

### 🚀 Live Demo

Deployed on **Firebase Hosting** → [https://cryptic-span-xbcxw.web.app](https://cryptic-span-xbcxw.web.app)

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
| ⚖️ **Simulation Comparison** | Side-by-side benchmark pinning |
| 🌸 **Flower FedLLM Studio** | Federated LLM traffic reasoning (FlowerTune) |
| 🎙️ **Gemini Live AI** | Voice-based AI dispatch assistant |
| 🔐 **Firebase Auth** | Google Sign-In + Anonymous auth |
| 🌍 **8 Indian Languages** | EN, HI, KN, TA, TE, ML, MR, BN |

---

### 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 6 + Tailwind CSS v4
- **3D**: Three.js
- **AI**: Google Gemini API (`gemini-3.8-flash`, `gemini-3.8-live`)
- **Backend**: Node.js + Express + WebSocket (Gemini Live proxy)
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Hosting**: Firebase Hosting

---

### ⚙️ Local Development

```bash
# Install dependencies
npm install

# Set your Gemini API key (optional — app has intelligent fallbacks)
export GEMINI_API_KEY=your_key_here

# Start dev server
npm run dev
```

Visit `http://localhost:3000`

---

### 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Optional | Google Gemini API key for live AI features |
| `NODE_ENV` | Auto | Set to `production` when deployed |
| `PORT` | Auto | Server port (default: 3000) |

---

### 📦 Deployment

#### Firebase Hosting (Static Frontend)

```bash
npm run build
firebase deploy --only hosting
```

#### Full Stack (Firebase Hosting + Cloud Run)

The Express API server (`server.ts`) handles Gemini proxying and WebSocket. For full production deployment with the backend:

```bash
# Build frontend
npm run build

# Deploy hosting
firebase deploy --only hosting
```

---

### 📄 License

MIT — see [LICENSE](./LICENSE)

---

### 🔬 Research Reference

Based on **PS-003**: *Federated Learning for Privacy-Preserving Traffic Forecasting using METR-LA*  
Dataset: [METR-LA](https://github.com/liyaguang/DCRNN) — 207 loop detectors, LA Caltrans District 7

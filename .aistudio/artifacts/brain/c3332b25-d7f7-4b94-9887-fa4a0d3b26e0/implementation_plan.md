# Implementation Plan - PS-003 Feature Engineering, MAE Header Badge Animation & Deliverables Alignment

## 1. Context & Objectives
Based on user requirements and the PS-003 problem statement (*Federated Traffic-Flow Prediction with Communication-Cost Evaluation*), this update delivers:
1. **MAE Badge Animation**: A smooth CSS background color fade transition (no scale distortion) on the `MAE: X km/h` badge in the header triggered whenever the MAE value changes or a round completes.
2. **Feature Engineering**: Multi-horizon historical lags (t-1, t-3, t-6, t-12 steps / 5 to 60 minutes), cyclical hour-of-day sine/cosine encoding, weekday vs. weekend boolean indicators, and morning/evening peak-hour shockwave indicators.
3. **PS-003 Deliverables & Hygiene**:
   - Keep all existing panels intact while cleaning redundant calculations.
   - Include the **FedAvg Algorithm & Client Update Pseudocode** demonstration modal directly accessible from the UI.
   - Verify zero temporal leakage across chronological train/val/test splits (70% train / 15% val / 15% test).
   - Ensure seamless communication-cost tracking (bytes per round, parameter quantization, uplink/downlink overhead).
   - Ensure the 3-seed benchmark matrix (seeds 42, 101, 777) reports mean ± standard deviation for MAE, RMSE, and communication bytes.

---

## 2. Proposed Changes

### A. MAE Header Badge Smooth Transition Animation
- **Target**: `src/components/Header.tsx` and `src/App.tsx`.
- **Implementation**:
  - Expose/display the live `MAE: X km/h` badge with round status directly in the header bar.
  - Implement a reactive flash state hook (`isAnimating` or `justUpdated` keyed by `currentMAE` and `currentRound`).
  - Use Tailwind CSS transition classes (`transition-colors duration-700 ease-out`) for a smooth background fade from an active emerald/teal highlight (`bg-emerald-200/90 border-emerald-400 text-emerald-950 shadow-md`) fading smoothly back to the stable badge state (`bg-emerald-50 border-emerald-300 text-emerald-800`), explicitly avoiding scale or transform jumps.

### B. Traffic Feature Engineering Engine
- **Target**: `src/services/trafficDataService.ts` and `src/components/MetrLaEffectivePredictions.tsx`.
- **Implementation**:
  - Create a dedicated feature engineering utility:
    - **Multi-horizon historical lags**: Lag-1 (5 min), Lag-3 (15 min), Lag-6 (30 min), Lag-12 (60 min).
    - **Cyclical time encoding**: $\sin(2\pi \cdot \text{hour}/24)$, $\cos(2\pi \cdot \text{hour}/24)$ to capture diurnal rhythms without midnight discontinuity.
    - **Temporal indicators**: `isWeekend` boolean, `isMorningRush` (07:30–09:45), and `isEveningRush` (16:30–19:30).
    - **Shockwave delta index**: Rate of speed deceleration over consecutive steps.
  - Expose an interactive **Feature Engineering Inspector** card inside the predictions dashboard showing the engineered feature matrix for any selected sensor.

### C. PS-003 Algorithmic Deliverable: FedAvg Pseudocode Modal
- **Target**: `src/components/FedAvgPseudocodeModal.tsx` and integration into `Sidebar.tsx` / `ControlBar.tsx`.
- **Implementation**:
  - Deliver the explicit PS-003 requirement: *"Working prototype demonstration with pseudocode snippet."*
  - Interactive syntax-highlighted FedAvg algorithm breakdown covering:
    - Server orchestration & parameter broadcasting.
    - Local client SGD with mini-batches & loss computation on local RSU shards.
    - Model parameter delta transmission & uplink bandwidth quantization (FP32, FP16, INT8, Top-K).
    - Federated weighted model aggregation: $w_{t+1} \leftarrow \sum_{k=1}^K \frac{n_k}{n} w_{t+1}^k$.

### D. Code Cleanup & Verification
- Clean up any unused imports or redundant state calculations while keeping all existing functional panels (3D digital twin, traffic forecast dashboard, Dirichlet heatmap, simulation comparison, Flower FedLLM studio).
- Run full verification (`npm run build`, `compile_applet`, `lint_applet`).

---

## 3. Verification Plan
- **MAE Animation Verification**: Step or run simulation rounds, observe that the MAE badge background smoothly fades across updates without jarring layout shifts or scaling.
- **Feature Engineering Verification**: Check that multi-horizon lags, cyclical temporal features, and rush-hour indicators accurately reflect timestamps across the 7-day chronological dataset.
- **PS-003 Compliance**: Validate 3–5 clients, IID vs Non-IID Dirichlet skew, chronological splits, FedAvg algorithm, communication bytes tracking, and 3-seed reproducibility.
- **Build Verification**: Run `compile_applet` and verify zero TypeScript or bundler errors.

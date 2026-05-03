# Hunter Kinder

**Email:** hkinder@stlteach.org | **Phone:** 573-579-1340
**GitHub:** github.com/aurascoper | **Location:** Missouri, USA

---

## Professional Summary

Scientist-turned-data-engineer with a full-stack background: pharmaceutical analytical chemistry at GMP/GLP-compliant facilities (Dynalabs, Biokyowa), statistical process control in production environments, and 3+ years certified STEM instruction. Fluent in Python, R, Julia, SQL, and Rust. Currently running a two-layer Missouri ag-monitoring product (Sentinel-2/SAR, Earth Engine, Render-deployed dashboard) and competing in the ARC-AGI Prize 2026 (neuroevolution + MCTS solver, holdout 0.79+) while teaching full-time. Looking for a role that puts scientific domain knowledge, geospatial data, and ML together.

---

## Experience

### Certified 5-12 STEM Instructor
**Missouri Public Schools** | 2022 – Present

- Managed diverse classrooms and provided instructional support across grade levels 5–12
- Delivered curriculum and facilitated student learning across biology, chemistry, and data-adjacent STEM subjects
- Tracked learning progress through formative and summative assessment design

### R&D Scientist I
**Dynalabs — St. Louis, MO** | January 2021 – November 2021

- Designed and validated drug potency methods using HPLC-UV, IC, and SEC for biopharmaceutical clients
- Produced actionable analytical insights ensuring compliance with FDA regulatory standards
- Operated in GMP/GLP-regulated environments with full documentation accountability

### Analytical Chemist II
**Dynalabs — St. Louis, MO** | June 2020 – January 2021

- Conducted HPLC-UV/PDA, size-exclusion chromatography, and ion chromatography for pharmaceutical analysis
- Collaborated on cross-functional regulatory projects ensuring adherence to FDA, GMP, and GLP standards

### Bio-Process Analyst
**Biokyowa — Cape Girardeau, MO** | August 2018 – June 2020

- Managed HPLC, atomic absorption quality, and microbial seed analyses for large-scale amino acid fermentation
- Ensured FDA compliance across production analytics for biopharmaceutical-grade amino acid manufacturing
- Performed statistical analysis of process control data to identify and resolve production efficiency gaps

### Statistical Process Controls Coordinator / Lab Supervisor
**SEMO Milling — Scott City, MO** | July 2017 – August 2018

- Supervised lab technicians and implemented statistical controls to optimize milling production efficiency
- Developed and analyzed process improvement techniques using SPC methods to enhance product quality

### Flow Cytometry Technician
**Eurofins — St. Louis, MO** | 2015 – 2016

- Conducted flow cytometry analyses for biological and pharmaceutical research studies
- Analyzed cell population data and provided critical experimental results

### Nano-Bioengineering Researcher
**Southeast Missouri State University** | 2015 – 2016

- Contributed to nano-bioengineering research on novel techniques and applications
- Designed experiments and performed data analysis for innovative bioengineering projects

---

## Independent Research

### Agricultural Yield Pipeline — Two-Layer Crop Monitoring System
**github.com/aurascoper/agri_yield_pipeline** | 2026
**Live demo:** mo-agri-baseline.onrender.com

- Shipped a two-layer ag-analytics product: **Layer 1** — statewide historical yield model across 97 Missouri counties, 23 years of USDA/NOAA/MODIS data, R² = 0.713 (GradientBoosting on NDVI + PRCP + TMAX features); **Layer 2** — per-field live monitoring on Google Earth Engine with service-account auth and a Render-deployed Dash/Plotly dashboard
- Wrote the Earth Engine exporters: Sentinel-2 L2A 10m NDVI with SCL cloud masking (classes 3/8/9/10 dropped); Sentinel-1 C-band SAR VV dB with 30m focal-median speckle filter, ASCENDING orbit after the S1B failure killed US Midwest descending coverage
- Built a Layer-1-scores-Layer-2 stress alerter: snaps each field to nearest county, pulls the DOY ±7 county baseline from the shared parquet cache, z-scores the live field NDVI, and emits warn/stress pings above |z|≥1.5 / 2.0. First real run across three demo fields caught a +4.3σ anomaly at a Nodaway seed trial (cover crop lingering green past senescence)
- Ran per-county Daymet 1-km correlations for 115 MO counties (85 passed the ≥10-paired-year threshold): mean r(July TMAX, yield) = −0.63 with 84/85 counties negative; mean r(May–Aug PRCP, yield) = +0.33; the heat-stress signal dominates
- Stack: Python + Earth Engine + rioxarray + GeoPandas; Dash/Plotly dashboard with matplotlib-rasterized tile previews; Render free-tier deploy via Blueprint (`render.yaml`, gunicorn, pyarrow) with a carved-out `requirements-dash.txt` that excludes the GDAL/Kafka heavy deps so the image builds clean

### ARC-AGI Prize 2026 Competitor
**Self-directed** | 2025 – Present

- Building a neuroevolution + MCTS-based solver for ARC-AGI-2 tasks in Python
- Implemented D4 symmetry canonicalization, domain-specific DSL, SSD/SOAR self-distillation
- Current holdout score: 0.79+; active competition across ~1000 tasks
- Research artifacts and ablation checkpoints tracked for potential paper track

### SobolevRNA — Megascale RNA 3D Structure Prediction
**github.com/aurascoper/SobolevRNA** | 2026

- Built a multi-model RNA 3D structure prediction pipeline for kilobase-scale targets (up to 4,640 nt)
- Designed HWS (Hierarchical Windowed Sensor): sliding-window RNA-FM embedding extraction with linear-taper blending, bypassing the 1,022-nt architectural truncation limit
- Implemented SHR (Stochastic Hamiltonian Relaxation) in JAX: four-term physics Hamiltonian (bond + steric + DL contact + Flory R_g) with Sobolev H¹ gradient preconditioning via DCT-II spectral filtering
- Achieved 0.509 private TM-score (0.387 public) on Stanford RNA 3D Folding Part 2 (Kaggle) — private > public inversion attributable to physics-based generalization on novel RNA families
- Full technical whitepaper with mathematical derivations published in repo

### obi-execution-engine — Algorithmic Trading System
**github.com/aurascoper/obi-execution-engine** | 2026

- Built dual-engine mean-reversion trading system in Python (async/TaskGroup) operating across 166 symbols: 28 crypto pairs + 138 equity symbols via Alpaca Trading API
- Implemented Ornstein-Uhlenbeck z-score signal pipeline (1.25σ entry / 0.50σ exit) gated by order-book imbalance (OBI) confirmation; architecture grounded in Avellaneda & Lee (2010) and Cartea et al. (2018)
- Engineered production risk controls: 2% daily drawdown circuit breaker, per-symbol notional caps, GICS sector exposure limits, macro event kill-switch (±15 min around CPI/FOMC/NFP)
- Paper trading (Phase 2) with structured JSON logging; Phase 3 roadmap: passive maker algorithm with cancel-replace loops

### Biofilms — Computational Extremophile Dynamics Simulator
**github.com/aurascoper/Biofilms** | 2025

- Co-authored "Modeling Radiotrophic Fitness" (with Brett Faulkner, B.Sc BioPhys): mathematical framework for spatiotemporal dynamics of radiotrophic microbial communities (*Cryptococcus neoformans*, *Deinococcus radiodurans*) under gamma and ionizing radiation stress
- Derived full PSDE system: Hamiltonian H(p,q) + Langevin stochastic noise η(t,x) + reaction-diffusion melanin production (∂M/∂t = D_M∇²M + α_M·N_RadioF·R); symplectic integration preserves energy/momentum over long simulation windows
- Modeled ionizing radiation decay (I = I_γ·exp(−κx)) and UV oscillatory fields; species fitness Fs(t,x) driven by phase-locking synchronization with radiation gradients
- Applied k-means clustering and Hamiltonian decision trees (kNN variant weighted by phase-locked kernel Γ) to classify extremophile survival strategies; Boltzmann path integral formalism for fitness landscape traversal
- Applications: bioremediation of nuclear contaminants (Th, Am, Cm, Np), radiation-resistant bioengineering; published CC0-1.0

### prose-craft (Claude Code Plugin)
**github.com/aurascoper** | 2026

- Built a Claude Code plugin that extracts user writing voice and generates text matching it
- Dual review gate (parallel agents): AI pattern detection + craft depth evaluation
- Includes a Rust CLI pre-screener (`pcr`) for fast banned-phrase and structural pattern detection
- Learning loop accumulates observations across sessions and promotes them to rule changes

---

## Education

**Master of Arts in Teaching and Learning** — Washington University in St. Louis, MO

**Bachelor of Arts in Biology** — University of Missouri, Columbia, MO (December 2014)

---

## Skills

**Programming:** Python, R, Julia, SQL, Rust, Git/Bash, JuMP/Cbc

**Data & Visualization:** pandas, numpy, matplotlib, Tableau, Jupyter, ggplot2, PlotlyJS, jamovi, OpenRefine

**Bio-Process Analytics:** HPLC, IC, SEC, Microbial Analysis, Flow Cytometry, GMP/GLP compliance

**Statistical Methods:** Statistical Process Control (SPC), experimental design, linear mixed models, k-means clustering, formative/summative assessment analysis

**GIS / Spatial:** Google Earth Engine (service-account auth, S2/S1 exports), Sentinel-2 L2A NDVI, Sentinel-1 C-band SAR (VV dB), Daymet 1-km gridded weather, rioxarray, geopandas, ArcGIS, Leaflet, raster tiling + TIF→PNG rendering

**ML / AI:** Neuroevolution, MCTS, DSL design, Python ML pipelines, scikit-learn, JAX, PyTorch, Keras, TensorFlow, PySpark, Claude API, Docker, Kafka, FastAPI, Langevin dynamics/SDEs, market microstructure

**Teaching:** Curriculum design, 5-12 STEM instruction, formative assessment, Missouri DESE certified

---

## Professional Certificates

5-9 Science Initial Certificate — Missouri DESE (August 2023)
High School Biology Certificate — Missouri DESE (August 2025)

---

## Interests

Games: strategy, sports, and game theory
Outdoors: exploring nature, foraging, hiking, bikepacking, fishing, kayaking
Music: jazz, heavy music, experimental music, playing instruments
Philosophy: Buddhism, linguistics, neuroscience/mind, evolutionary theory, theology

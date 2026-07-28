# Alley 21 Asset Inventory & Replacement Manifest

This manifest tracks all image assets used across Alley 21 Enterprises.

- **Web Delivery (`public/assets/images/`)**: All site image references use optimized WebP format (quality ~82–85) plus the vector/transparent PNG logo, reducing total deployed image weight from **10.85 MB to ~2.8 MB**.
- **Master Archives (`assets-master/`)**: All original full-resolution master JPEGs and heavy PNGs are moved to `assets-master/` at repo root. They remain safely version-controlled in Git without being publicly served or deployed in static site builds.

| Asset | Status | Deployed Format | Master File (in `assets-master/`) | Original Source | Used in | Priority |
|---|---|---|---|---|---|---|
| `home-hero-background` | `real` | `.webp` (170KB) | `.jpg` (462KB) | User Uploaded Alley 21 Sunlit Path | `src/pages/index.tsx:75` | High |
| `home-channel-ai-consulting` | `real` | `.webp` | `.png` (1.4MB) | GoDaddy Original Upload | `src/pages/index.tsx:8` | Medium |
| `home-channel-vintage` | `real` | `.webp` | `.jpg` (463KB) | `https://img1.wsimg.com/isteam/getty/2220517489` | `src/pages/index.tsx:9` | Medium |
| `home-channel-insight` | `real` | `.webp` | `.png` (1.2MB) | GoDaddy Original Upload | `src/pages/index.tsx:10` | Medium |
| `ai-tech-hero` | `real` | `.webp` | `.jpg` (583KB) | `https://img1.wsimg.com/isteam/getty/2170889984` | `src/pages/ai-tech.tsx:59` | High |
| `vintage-category-fashion` | `real` | `.webp` | `.jpg` (489KB) | `https://img1.wsimg.com/isteam/getty/1492999039` | `src/pages/vintage.tsx:20` | Medium |
| `vintage-category-art` | `real` | `.webp` | `.jpg` (334KB) | `https://img1.wsimg.com/isteam/getty/808618008` | `src/pages/vintage.tsx:21` | Medium |
| `vintage-category-accessories` | `real` | `.webp` | `.jpg` (220KB) | `https://img1.wsimg.com/isteam/getty/1441376285` | `src/pages/vintage.tsx:22` | Medium |
| `vintage-category-collectibles` | `real` | `.webp` | `.jpg` (285KB) | `https://img1.wsimg.com/isteam/getty/172173701` | `src/pages/vintage.tsx:23` | Medium |
| `vintage-hero` | `real` | `.webp` | `.jpg` (291KB) | `https://img1.wsimg.com/isteam/getty/2193243617` | `src/pages/vintage.tsx:58` | High |
| `furniture-process` | `real` | `.webp` | `.jpg` (217KB) | `https://img1.wsimg.com/isteam/getty/978993080` | `src/pages/vintage.tsx:259` | Medium |
| `vintage-sourcing` | `real` | `.webp` | `.jpg` (511KB) | `https://img1.wsimg.com/isteam/getty/2201366283` | `src/pages/vintage.tsx:312` | Medium |
| `self-discovery-hero` | `real` | `.webp` | `.jpg` (137KB) | `https://img1.wsimg.com/isteam/getty/1338220788` | `src/pages/self-discovery.tsx:49` | High |
| `logo-alley21-transparent` | `real` | `.png` (182KB) | `.png` (182KB) | GoDaddy Original Logo Upload | `src/layouts/parts/Header.tsx:27`, `src/layouts/parts/Footer.tsx:23` | High |

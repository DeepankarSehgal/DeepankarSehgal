# Deepankar Sehgal · 3D Coastal Workbench Portfolio

An interactive, photorealistic 3D studio portfolio built with **Three.js (WebGL)**, featuring a modern coastal architecture room, an animated ocean vista with dynamic sun and wave shaders, and an interactive developer workbench.

## ✨ Highlights & Architecture

- **🌊 Coastal Studio with Panoramic Ocean Vista**:
  - Custom GLSL water wave and specular glint shader for realistic sea reflections.
  - Distant rocky headlands, an animated sailboat, and a working lighthouse beacon.
  - Multi-pane architectural picture window framing the sea.
- **☀️ Real-Time Lighting Presets**:
  - **Midday (☀️)**: Brilliant azure waters, shimmering sun reflection, airy coastal room.
  - **Sunset (🌅)**: Golden hour horizon, amber wave glints, warm ambient desk lighting.
  - **Night (🌙)**: Starry indigo ocean, moonlit sea path, task desk spotlight, and screen glow.
- **🎮 Interactive 3D Developer Workbench**:
  - **Meta Quest 3 VR Headset & Stereo Display**: Explores industrial VR simulations (Simulanis), vocational tool training (Roof Installation VR), driving trainers, and spatial hand-tracking physics.
  - **Desktop Monitor Rig**: Explores PC and Steam AA titles (*Crimson Tactics: The White Banner*), dual-target VR/PC simulations, and combat AI engines.
  - **Modern Smartphone on Dock**: Explores high-concurrency multiplayer (*YungAlgo* 5M+ players), turn-based netcode (*Cuban Domino* with Photon Fusion), and mobile casino slot mechanics (*ZVKY Design Studio*).
  - **Dev Field Journal**: Engineering notes, architecture teardowns (Event Bus, Service Locator, Finite State Machines, and scaling to 5M players).
- **📱 Responsive & Accessible**:
  - Frosted glassmorphism HUD and sliding dock panel (`backdrop-filter: blur(24px)`).
  - Screen-reader accessible navigation fallback (`nav.sr`).
  - Supports mouse drag, touch controls on mobile, and keyboard shortcuts (`Escape` to close).

## 🚀 Local Development & Deployment

To view locally:
```bash
# Using Node
npx serve .
# Or open index.html directly in any modern WebGL-compatible browser
```

Deployable to GitHub Pages, Cloudflare Pages, or Vercel.

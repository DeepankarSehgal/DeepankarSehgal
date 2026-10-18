/**
 * Deepankar Sehgal · 3D Coastal Studio & Interactive Workbench
 * Three.js (r128) WebGL Scene with Coastal Ocean Vista, Real-time Sun, & Interactive Devices
 */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     PORTFOLIO DATA: PROJECTS, NOTES, APPROACH & BIO
     ========================================================================== */

  var GROUPS = {
    vr: {
      label: 'Meta Quest · VR & XR',
      platform: 'Virtual & Augmented Reality',
      projects: [
        {
          id: 'simulanis',
          name: 'Simulanis Industrial XR Simulator',
          kind: 'Enterprise VR Training',
          thumb: 'assets/xr_simulation_thumb_1785661051268.jpg',
          blurb: 'Enterprise-grade procedural safety simulations built for industrial personnel on Meta Quest 2 & 3. Trainees execute high-voltage lockout-tagout (LOTO), chemical valve sequences, and hazardous material drills with real-time hazard detection.',
          note: 'Built with Unity XR Interaction Toolkit and custom spatial physics. Every procedure is tracked against strict safety compliance standards with instant error reporting.',
          teardown: [
            "Industrial safety training cannot afford abstractions. If a worker fails to discharge stored pressure before turning a chemical valve, the simulation triggers a simulated catastrophic breach immediately.",
            "I engineered the core interaction layer using custom XR grab interactors and spatial constraints rather than standard triggers. The user must use tactile wrist rotation and multi-step latch mechanisms identical to physical machinery.",
            "To hit solid 72/90 FPS on standalone Quest 2 hardware, I built a custom shader batching pipeline and aggressive mesh combination routine that keeps draw calls under 85 across extensive factory environments."
          ],
          tags: ['Unity 3D', 'Meta Quest 2/3', 'XR Interaction Toolkit', 'Enterprise Safety', 'C#']
        },
        {
          id: 'roof',
          name: 'Roof Installation VR',
          kind: 'Vocational Training',
          thumb: 'assets/curved_vr_ui_thumb.jpg',
          blurb: 'Roof installation procedure training across four distinct environments in both single-player and multiplayer modes. Trainees operate realistic vocational tools (pneumatic nail gun, tape measure, chalk line, hammer) while the session logs tolerance errors.',
          note: 'Architected with a decoupled Event Bus, Service Locator, ScriptableObject configuration, and a robust Finite State Machine under active client delivery.',
          teardown: [
            "When I took over this UK client delivery, the codebase was a tangled web of FindObjectOfType calls and race conditions between MonoBehaviours. The client was shipping weekly, so an offline rewrite was impossible.",
            "I refactored the foundations underneath running features: first an Event Bus so actions (placing tile, misnailing, hazard alerts) became clean broadcast events. Next, ScriptableObjects were introduced so course tolerances and nail depth rules could be tuned by non-programmers without recompiling code.",
            "The biggest breakthrough was a formal Finite State Machine (Briefing, Inspection, In-Progress, Debrief). Unrecorded edge cases vanished overnight because the state transitions were strictly enforced."
          ],
          tags: ['Unity', 'Photon PUN2', 'State Machine', 'Event Bus', 'Architecture']
        },
        {
          id: 'drive',
          name: 'VR Driving Simulator',
          kind: 'Driver Training',
          thumb: 'assets/xr_simulation_thumb_1785661051268.jpg',
          blurb: 'High-fidelity vehicle driving trainer featuring scenario generation: tight parking bays, rainy highway driving, sudden pedestrian crossings, and intersection hazards with an end-of-run analytics debrief.',
          note: 'Configurable scenario data layers let instructors spin up customized road conditions on demand.',
          teardown: [
            "Real-world lessons cannot guarantee a wet road or an erratic driver pulling out at a roundabout on a Tuesday morning. This trainer bridges that critical training gap.",
            "I designed the scenario architecture around modular ScriptableObject presets defining traffic density, road surface friction coefficient, and rain intensity. Adding a new lesson scenario requires zero new code."
          ],
          tags: ['Unity', 'Vehicle Physics', 'Meta Quest', 'Telemetry Analytics']
        },
        {
          id: 'xr-physics',
          name: 'Interactive VR Gameplay & Spatial Physics',
          kind: 'Spatial Computing',
          thumb: 'assets/curved_vr_ui_thumb.jpg',
          blurb: 'Natural spatial hand-tracking sandbox featuring tactile physics interactions, curved floating VR canvases, two-handed object manipulation, and kinetic feedback.',
          note: 'Fine-tuned haptic triggers and low-latency physics sub-stepping for zero perceptible input lag.',
          tags: ['Hand Tracking', 'Spatial Audio', 'Curved VR UI', 'Oculus SDK']
        },
        {
          id: 'irusu',
          name: 'Irusu VR Cinema & Human Anatomy XR',
          kind: 'Mobile VR App',
          thumb: 'assets/irusu_vr_cinema_thumb.jpg',
          blurb: 'Commercial VR application suite published on the Google Play Store. Features an immersive multi-environment 3D cinema and an interactive medical 3D human anatomy inspection tool.',
          note: 'Optimized for high-framerate mobile rendering across diverse Android hardware configurations.',
          tags: ['Google Play Store', 'Mobile VR', 'Performance Profiling', 'Spatial Cinema']
        }
      ]
    },

    pc: {
      label: 'Desktop · PC & Steam AA',
      platform: 'Windows PC · AA Title Releases',
      projects: [
        {
          id: 'crimson',
          name: 'Crimson Tactics: The White Banner',
          kind: 'AA Turn-Based Tactical RPG',
          thumb: 'https://img.youtube.com/vi/jB3Dg2dtQW0/hqdefault.jpg',
          blurb: 'A commercial AA tactical turn-based RPG released on Steam PC by Black March Studios. Features a grid battle system, elevation-based tactical advantages, complex spell mechanics, and responsive enemy AI.',
          note: 'Engineered battle grid pathfinding, turn initiative queues, inventory management, and tactical combat AI.',
          teardown: [
            "Crimson Tactics required deep algorithmic precision. Combat takes place on a high-resolution 3D grid where elevation, terrain friction, facing direction, and weapon range govern hit probability and critical damage.",
            "I developed the tactical AI decision tree. Instead of brute-forcing every potential move on the board, the AI calculates heatmaps based on threat ranges, unit squishiness, and elemental affinities, making battles feel punishingly intelligent without stuttering the framerate.",
            "Integrated Steamworks SDK for Cloud Saves, Achievements, and Steam Deck controller mapping."
          ],
          tags: ['Unity', 'Steam AA Release', 'Tactical AI', 'Grid Pathfinding', 'C#']
        },
        {
          id: 'stadium-pc',
          name: 'Stadium Safety & Crowd Management (PC)',
          kind: 'Desktop Simulation',
          thumb: 'https://img.youtube.com/vi/mf6ibnYrnAU/hqdefault.jpg',
          blurb: 'Enterprise venue management and crowd egress inspection simulation. Shipped as a desktop PC release built from the identical codebase as its VR counterpart.',
          note: 'Shares 95% of underlying simulation logic with a NavMesh third-person avatar rig replacing VR head-tracking.',
          teardown: [
            "Forking codebases to support PC and VR leads to duplicate bug fixes and synchronization nightmare. I kept one project and drew a strict architectural line between the Simulation Rule Layer and the Interaction Rig Layer.",
            "The training logic only queries an IInteractionRig interface ('UserInspectedObject', 'TriggerEgressAlarm'). Whether the trigger originated from an Oculus controller grab or an avatar raycast keypress is completely decoupled."
          ],
          tags: ['Unity', 'NavMesh Crowd AI', 'Dual-Target Rig', 'Shared Codebase']
        },
        {
          id: 'combat-ai',
          name: 'Combat AI & Weapon Recoil Engine',
          kind: 'Gameplay Systems Engine',
          thumb: 'https://img.youtube.com/vi/jrj3QT4mOyM/hqdefault.jpg',
          blurb: 'Dynamic first-person and third-person weapon handling mechanics featuring procedurally calculated recoil patterns, ballistics projectile simulation, and hierarchical state-machine enemy combatants.',
          note: 'Procedural weapon sway, realistic spread bloom, and modular enemy AI squad tactics.',
          tags: ['Combat AI', 'Ballistics Physics', 'FSM', 'Weapon Handling']
        },
        {
          id: 'teleporto',
          name: 'Teleporto: Cosmic Grid Puzzler',
          kind: 'Puzzle Game',
          thumb: 'https://img.youtube.com/vi/dj_jWsqDBSA/hqdefault.jpg',
          blurb: 'Grid-based cosmic puzzle game with move-counting constraints, teleport portals, undo/redo state stacks, and built-in level-testing tools.',
          note: 'PC release featuring full controller remapping, V-Sync, graphics presets, and Steam wishlist flow.',
          tags: ['Puzzle Mechanics', 'Undo/Redo Stack', 'Steam Release', 'Level Design']
        }
      ]
    },

    phone: {
      label: 'Mobile · Multiplayer & Web3',
      platform: 'iOS · Android · Multiplayer',
      projects: [
        {
          id: 'yungalgo',
          name: 'YungAlgo Web3 Multiplayer Suite',
          kind: 'Massive Multiplayer Gaming',
          thumb: 'assets/web3_game_thumb_1785661093835.jpg',
          orient: 'land',
          blurb: 'A suite of 5 multiplayer game titles built on Photon PUN2 & PlayFab, scaling to 5,000,000+ active players during the Linea Park campaign with wallet connect and blockchain inventory hooks.',
          note: 'Architected real-time matchmaking lobbies, authoritative room management, and PlayFab server validation under massive viral traffic.',
          teardown: [
            "Scaling to 5M+ players taught us ruthless backend discipline. Client devices can never be trusted with win conditions or currency awards.",
            "I structured the multiplayer loop with Photon room authority: game actions are submitted as timestamped requests, validated against room state by the master client/server, and then synced via RPCs to prevent race conditions.",
            "Built automatic reconnect flows and graceful state catch-up for mobile players experiencing sudden packet drops or Wi-Fi to cellular transitions."
          ],
          tags: ['Photon PUN2', 'PlayFab', '5M+ Players', 'Multiplayer Sync', 'Web3 / Linea']
        },
        {
          id: 'domino',
          name: 'Cuban Domino Online',
          kind: 'Turn-Based Multiplayer',
          thumb: 'assets/slot_game_thumb_1785661066132.jpg',
          orient: 'land',
          blurb: 'Four-player online competitive dominoes in two-person teams. Built on Photon Fusion with strict authoritative server logic, turn countdown timers, and scored round summaries.',
          note: 'Zero-trust client architecture: every tile placement is validated centrally before the move is broadcasted to the table.',
          teardown: [
            "Turn-based games seem simple until you consider latency and dropped mobile connections. If two players on flaky cellular connections simultaneously think time expired, the match desyncs.",
            "I anchored the turn timer to the server authority. The phones merely render the authoritative countdown tick. Disconnected players get a 15-second grace window to reconnect without forfeiting."
          ],
          tags: ['Photon Fusion', 'Authoritative Netcode', 'Latency Testing', 'Mobile']
        },
        {
          id: 'slots',
          name: 'ZVKY Casino Slot Game Engine',
          kind: 'Casino & Mobile Mechanics',
          thumb: 'assets/slot_game_thumb_1785661066132.jpg',
          orient: 'port',
          blurb: 'High-performance slot machine game engine built at ZVKY Design Studio. Features customizable paylines, cascade reel physics, bonus mini-games, and 60 FPS mobile particle effects.',
          note: 'Mathematical paytable parser coupled with dynamic sprite sheet batching for fast load times on low-end smartphones.',
          tags: ['Mobile Casino', 'Slot Math Engine', 'High FPS', 'ZVKY Studio']
        },
        {
          id: 'ar-plane',
          name: 'Mobile AR Surface Placement',
          kind: 'AR Foundation',
          thumb: 'assets/ar_experience_thumb_1785661079833.jpg',
          orient: 'port',
          blurb: 'Augmented reality plane detection application built with Unity AR Foundation (ARCore & ARKit). Enables real-time floor mapping, surface raycasting, and interactive 3D model manipulation.',
          note: 'Smooth feathering plane boundary visualization and real-world shadow estimation.',
          tags: ['AR Foundation', 'ARCore', 'ARKit', 'Plane Tracking']
        }
      ]
    }
  };

  var NOTES = [
    {
      title: 'Rescuing a Unity codebase without stopping live delivery',
      kind: 'Architecture',
      read: '5 min read',
      body:
        '<p>When I took technical ownership of a vocational training simulator for a UK client, the project was already live with paying enterprise users. It had single-player, Photon multiplayer, multiple complex environments, and a relentless weekly delivery cycle. What it did not have was an architecture.</p>' +
        '<p>Scripts communicated through FindObjectOfType searches at runtime, session states were claimed by whichever MonoBehaviour happened to execute first in the script execution order, and game rules and tolerances were hardcoded straight into C# methods.</p>' +
        '<p>A multi-month rewrite was out of the question—clients pay for progress, not internal cleanups. The task was replacing the foundation while the building remained fully occupied.</p>' +
        '<h3>1. Identify the Seams First</h3>' +
        '<p>I spent the first week auditing the call graph. The fatal pattern was obvious: systems reached directly into each other. If the audio manager broke, the scoring script threw a NullReferenceException and halted the entire training session.</p>' +
        '<h3>2. Four Strategic Patterns</h3><ul>' +
        '<li><b>Decoupled Event Bus:</b> Systems stopped calling each other directly. When a user nails a roof tile or fails a safety rule, an event is dispatched. Scoring, audio, and network loggers listen independently. Removing a system never breaks its neighbors.</li>' +
        '<li><b>Service Locator:</b> Shared managers (Audio, Networking, Diagnostics) register centrally on startup. Lookups became O(1) and dependency injection made mock testing straightforward.</li>' +
        '<li><b>ScriptableObject Configurations:</b> All magic numbers, distance tolerances, and physics thresholds were migrated into ScriptableObject asset containers. Design adjustments can now be applied live without touching code.</li>' +
        '<li><b>Finite State Machine:</b> Session phases (Briefing, Procedure Active, Error Review, Debrief) were bound to strict states. If a trainee pulls off their headset mid-session, the system cleans up gracefully into a known reset state.</li></ul>' +
        '<h3>The Golden Production Rule</h3>' +
        '<p>Every refactor was slipped quietly behind a customer-facing feature. We never made a branch named "refactor". We migrated one subsystem per sprint, purged the legacy code path, and shipped builds continuously.</p>'
    },
    {
      title: 'Designing VR for someone who has never touched a headset',
      kind: 'Spatial UX',
      read: '4 min read',
      body:
        '<p>Most people using my vocational VR simulations are not gamers. They are industrial technicians, electricians, and construction crews putting on a VR headset for the very first time in a company training room. If their first sixty seconds feel confusing or nauseating, the training has failed before it begins.</p>' +
        '<h3>Guiding Principles for Enterprise XR</h3><ul>' +
        '<li><b>The first minute defines success:</b> Let the trainee look around their virtual hands and succeed at one natural physical interaction (picking up a mug or pressing a big button) before throwing procedures at them.</li>' +
        '<li><b>The real tool is the controller:</b> In our roof trainer, holding the VR controller feels like gripping a real nail gun. The worker relies on their existing real-world muscle memory instead of learning arbitrary button mappings.</li>' +
        '<li><b>Never wrest camera control:</b> The virtual camera must never move without the user’s physical head movement. Unprompted acceleration is the fastest ticket to motion sickness.</li>' +
        '<li><b>Contextual in-world feedback:</b> Flashing 2D pop-up dialogs in VR breaks immersion and gets reflexively dismissed. Instead, render error highlights directly on the misaligned physical pipe or missing bolt.</li>' +
        '<li><b>Dual-Screen Instructor Cast:</b> Instructors need to guide trainees. Providing a clean external monitor broadcast turns an isolated headset session into a shared classroom teaching moment.</li></ul>'
    },
    {
      title: 'Scaling a multiplayer Unity game to 5,000,000 players',
      kind: 'Networking',
      read: '4 min read',
      body:
        '<p>During the Linea Park campaign with YungAlgo, our games experienced viral adoption, quickly scaling past 5 million active players. Operating at that scale exposed every weakness in real-time networking.</p>' +
        '<h3>Lessons from High-Concurrency Netcode</h3><ul>' +
        '<li><b>Pick an authoritative truth:</b> Clients submit intentions, not outcomes. The server (or host authority) decides whether a move is valid and updates the shared state.</li>' +
        '<li><b>Bandwidth budgeting:</b> Never serialize whole GameObjects. Compress coordinate data into half-floats and send deltas rather than absolute values every tick.</li>' +
        '<li><b>Plan for dropped connections:</b> Mobile networks dip in elevators, tunnels, and subways. Build an automatic 15-second reconnect buffer so temporary latency spikes don’t forfeit the player’s hard-earned progress.</li></ul>'
    },
    {
      title: 'One training simulation, two platforms: VR and PC from one codebase',
      kind: 'Engineering',
      read: '3 min read',
      body:
        '<p>Our stadium safety simulator had to operate on Meta Quest headsets for trainees and on standard corporate Windows laptops for remote evaluators. Forking into two projects would double every maintenance cycle.</p>' +
        '<p>We maintained a single Unity project by decoupling the <b>Procedure Layer</b> from the <b>Interaction Rig Layer</b>. The procedure code handles crowd congestion, gate checks, and alarm triggers. The VR rig handles tracked hand controllers, while the PC rig drives a third-person NavMesh avatar. Both rigs implement the same minimal C# interface, guaranteeing feature parity across both platforms.</p>'
    }
  ];

  var APPROACH_HTML =
    '<div class="article">' +
    '<p>I am at my best when complex systems need to be engineered reliably and user feedback is immediate. These are the core principles that govern how I develop games and XR applications:</p>' +
    '<ol class="principles">' +
    '<li><div><h4>Start from the person holding the controller</h4><p>Before coding mechanics, I study who will use this system—whether an industrial technician wearing a headset for the first time or a competitive gamer on Steam. The input ergonomics must feel immediate and natural.</p></div></li>' +
    '<li><div><h4>Diagnose the root cause before touching code</h4><p>Most persistent bugs aren’t bad lines of code—they are faulty architectural assumptions. I reproduce issues, trace event flow, and understand the problem before refactoring.</p></div></li>' +
    '<li><div><h4>Small, safe, reversible deployments</h4><p>I choose ten incremental safe changes over one heroic, risky refactor. This disciplined approach is how I rebuilt production codebases while shipping client updates each week.</p></div></li>' +
    '<li><div><h4>Make the invisible state visible</h4><p>Runtime debug visualizers, in-world telemetry markers, and clean console logging. If a state machine is misbehaving, visual feedback isolates the fault immediately.</p></div></li>' +
    '<li><div><h4>Stress-test on the lowest-spec target</h4><p>The standalone Quest 2, the budget Android phone, or high-latency throttled 3G connections. If performance holds steady on constrained devices, it flies everywhere else.</p></div></li>' +
    '<li><div><h4>Technical leadership by unblocking others</h4><p>As a senior developer, my goal is accelerating the entire team: establishing solid architecture, conducting constructive code reviews, and writing reusable tools that make colleagues faster.</p></div></li>' +
    '</ol>' +
    '<p>When faced with a daunting problem, I break it down into modular, testable components until the solution is clear.</p>' +
    '</div>';

  var ABOUT_HTML =
    '<div class="detail">' +
    '<p>I am <strong>Deepankar Sehgal</strong>, a Senior Unity & XR Developer with <strong>5+ years of hands-on experience</strong> engineering high-performance games, enterprise AR/VR simulations, and scalable multiplayer systems.</p>' +
    '<p>Throughout my career, I have shipped <strong>25+ games</strong> across PC, Mobile, and XR. Key career milestones include developing industrial VR training for <strong>Simulanis</strong> on Meta Quest headsets, shipping commercial AA tactical title <strong>Crimson Tactics: The White Banner</strong> on Steam PC with Black March Studios, and scaling multiplayer Web3 titles to <strong>5,000,000+ players</strong> with YungAlgo. Currently, I work on casino slot game engines at <strong>ZVKY Design Studio</strong>.</p>' +
    '<div class="timeline">' +
    '<div class="timeline-item"><h4>ZVKY Design Studio</h4><div class="timeline-role">Game Developer · Casino & Slot Engines</div><div class="timeline-date">Nov 2025 – Present</div><p>Developing high-performance casino slot games, paytable mechanics, dynamic reel mathematics, and 60 FPS mobile particle effects.</p></div>' +
    '<div class="timeline-item"><h4>Simulanis</h4><div class="timeline-role">XR Developer · Enterprise VR & Safety</div><div class="timeline-date">Oct 2024 – Jul 2025</div><p>Engineered enterprise-grade AR & VR procedural training simulations for industrial safety, optimized for standalone Meta Quest 2 and 3 headsets.</p></div>' +
    '<div class="timeline-item"><h4>Hapz Software Solution</h4><div class="timeline-role">Unity Game Developer</div><div class="timeline-date">Jan 2022 – Dec 2023</div><p>Delivered over 20+ games spanning 2D, 3D, AR/VR, and multiplayer genres. Built custom gameplay mechanics, shaders, and live-ops hooks.</p></div>' +
    '<div class="timeline-item"><h4>Irusu Technologies</h4><div class="timeline-role">Unity Game Developer</div><div class="timeline-date">Oct 2021 – Dec 2021</div><p>Built multiplayer educational applications and VR Cinema published on the Google Play Store.</p></div>' +
    '</div>' +
    '<div class="tags"><span>Unity 3D</span><span>C# Programming</span><span>Meta Quest 2/3</span><span>XR Interaction Toolkit</span><span>Photon Fusion / PUN2</span><span>PlayFab Backend</span><span>Steamworks SDK</span><span>AR Foundation</span><span>Performance Profiling</span><span>Slot Engines</span></div>' +
    '</div>';

  var CONTACT_HTML =
    '<div class="detail">' +
    '<p>Open to Senior Unity Developer, Lead XR Engineer, and Contract opportunities worldwide. Code walkthroughs and custom build demonstrations available on request.</p>' +
    '<div class="contact-box">' +
    '<div class="contact-item"><i class="fa-solid fa-envelope"></i> <a href="mailto:deepankarsehgal3@gmail.com">deepankarsehgal3@gmail.com</a></div>' +
    '<div class="contact-item"><i class="fa-brands fa-whatsapp"></i> <a href="tel:+918968457228">+91 8968457228</a></div>' +
    '<div class="contact-item"><i class="fa-solid fa-location-dot"></i> Coastal Studio · India · UTC+5:30</div>' +
    '</div>' +
    '<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;">' +
    '<a class="linkbtn" href="https://www.linkedin.com/in/deepankar-sehgal/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i> LinkedIn Profile ↗</a>' +
    '<a class="linkbtn" href="assets/Deepankar_UnityDeveloper_CV.pdf" target="_blank" rel="noopener noreferrer" style="background:#0284c7;"><i class="fa-solid fa-download"></i> Download CV (PDF)</a>' +
    '</div>' +
    '</div>';

  /* ==========================================================================
     THREE.JS WEBGL RENDERER & SCENE SETUP
     ========================================================================== */

  var stage = document.getElementById('stage');
  var renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  stage.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.05, 5000);

  function srgb(hex) {
    return new THREE.Color(hex).convertSRGBToLinear();
  }

  /* Helper for rounded beveled boxes */
  function roundedBox(w, h, d, r, seg) {
    r = Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4);
    var s = new THREE.Shape(), x = w / 2, y = h / 2;
    s.moveTo(-x + r, -y); s.lineTo(x - r, -y); s.quadraticCurveTo(x, -y, x, -y + r);
    s.lineTo(x, y - r); s.quadraticCurveTo(x, y, x - r, y); s.lineTo(-x + r, y);
    s.quadraticCurveTo(-x, y, -x, y - r); s.lineTo(-x, -y + r); s.quadraticCurveTo(-x, -y, -x + r, -y);
    var bev = Math.min(r * 0.6, d * 0.45);
    var g = new THREE.ExtrudeGeometry(s, {
      depth: Math.max(d - bev * 2, 1e-4),
      bevelEnabled: true,
      bevelThickness: bev,
      bevelSize: bev * 0.9,
      bevelSegments: seg || 3,
      curveSegments: 8
    });
    g.translate(0, 0, -(d / 2 - bev));
    g.computeVertexNormals();
    return g;
  }

  /* ==========================================================================
     LIGHTING & ENVIRONMENT (COASTAL SUN & OCEAN REFLECTIONS)
     ========================================================================== */

  var hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x334155, 0.65);
  scene.add(hemiLight);

  var sunLight = new THREE.DirectionalLight(0xfff7ed, 4.5);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 30;
  sunLight.shadow.camera.left = -4;
  sunLight.shadow.camera.right = 4;
  sunLight.shadow.camera.top = 4;
  sunLight.shadow.camera.bottom = -4;
  sunLight.shadow.bias = -0.0004;
  sunLight.shadow.normalBias = 0.02;
  scene.add(sunLight);

  var sunTarget = new THREE.Object3D();
  sunTarget.position.set(0, 0.9, 0);
  scene.add(sunTarget);
  sunLight.target = sunTarget;

  /* Desk Task Lamp & Monitor Glow */
  var deskSpot = new THREE.SpotLight(0xffedd5, 0, 3.8, 0.75, 0.6, 2);
  deskSpot.position.set(-0.7, 1.25, -0.05);
  deskSpot.target.position.set(-0.4, 0.75, 0.1);
  scene.add(deskSpot);
  scene.add(deskSpot.target);

  var monGlow = new THREE.PointLight(0x38bdf8, 0, 2.0, 2);
  monGlow.position.set(0.32, 1.05, 0.02);
  scene.add(monGlow);

  var roomCeilLight = new THREE.PointLight(0xfff1e6, 0, 8.0, 2);
  roomCeilLight.position.set(0, 2.6, 1.0);
  scene.add(roomCeilLight);

  /* ==========================================================================
     MODERN COASTAL STUDIO ROOM
     ========================================================================== */

  var ROOM = { l: -1.8, r: 2.1, f: 3.2, h: 2.85 };
  var WALL_Z = -0.48;
  var DESK_Y = 0.75;

  /* Walls */
  var wallMat = new THREE.MeshStandardMaterial({
    color: srgb(0xf3f6f1),
    roughness: 0.88,
    metalness: 0.02
  });

  /* Floor: Light coastal Scandinavian oak planks */
  var floorGeo = new THREE.PlaneGeometry(ROOM.r - ROOM.l, ROOM.f - WALL_Z);
  var floorMat = new THREE.MeshStandardMaterial({
    color: srgb(0xecdccb),
    roughness: 0.45,
    metalness: 0.05
  });
  var floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set((ROOM.l + ROOM.r) / 2, 0, (WALL_Z + ROOM.f) / 2);
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  /* Ceiling */
  var ceilGeo = new THREE.PlaneGeometry(ROOM.r - ROOM.l, ROOM.f - WALL_Z);
  var ceilMat = new THREE.MeshStandardMaterial({ color: srgb(0xfcfdfb), roughness: 0.95 });
  var ceilMesh = new THREE.Mesh(ceilGeo, ceilMat);
  ceilMesh.rotation.x = Math.PI / 2;
  ceilMesh.position.set((ROOM.l + ROOM.r) / 2, ROOM.h, (WALL_Z + ROOM.f) / 2);
  scene.add(ceilMesh);

  /* Side Walls (Solid Left & Right) */
  var leftWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM.f - WALL_Z, ROOM.h), wallMat);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(ROOM.l, ROOM.h / 2, (WALL_Z + ROOM.f) / 2);
  leftWall.receiveShadow = true;
  scene.add(leftWall);

  var rightWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM.f - WALL_Z, ROOM.h), wallMat);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(ROOM.r, ROOM.h / 2, (WALL_Z + ROOM.f) / 2);
  rightWall.receiveShadow = true;
  scene.add(rightWall);

  /* Back Wall with Panoramic Coastal Picture Window */
  var WIN = { x0: -1.3, x1: 1.85, y0: 0.78, y1: 2.65 };
  var backWallGroup = new THREE.Group();
  backWallGroup.position.set(0, 0, WALL_Z);
  scene.add(backWallGroup);

  // Wall around the large panoramic window
  var backShape = new THREE.Shape();
  backShape.moveTo(ROOM.l, 0);
  backShape.lineTo(ROOM.r, 0);
  backShape.lineTo(ROOM.r, ROOM.h);
  backShape.lineTo(ROOM.l, ROOM.h);
  backShape.lineTo(ROOM.l, 0);

  var winHole = new THREE.Path();
  winHole.moveTo(WIN.x0, WIN.y0);
  winHole.lineTo(WIN.x1, WIN.y0);
  winHole.lineTo(WIN.x1, WIN.y1);
  winHole.lineTo(WIN.x0, WIN.y1);
  winHole.lineTo(WIN.x0, WIN.y0);
  backShape.holes.push(winHole);

  var backWallMesh = new THREE.Mesh(new THREE.ShapeGeometry(backShape), wallMat);
  backWallMesh.receiveShadow = true;
  backWallMesh.castShadow = true;
  backWallGroup.add(backWallMesh);

  // Modern Minimal Window Frame & Mullions
  var winFrameMat = new THREE.MeshStandardMaterial({
    color: srgb(0x232726),
    roughness: 0.35,
    metalness: 0.7
  });

  var winW = WIN.x1 - WIN.x0;
  var winH = WIN.y1 - WIN.y0;
  var winCenter = { x: (WIN.x0 + WIN.x1) / 2, y: (WIN.y0 + WIN.y1) / 2 };

  function addFrameBar(w, h, d, x, y, z) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), winFrameMat);
    b.position.set(x, y, z);
    b.castShadow = true;
    b.receiveShadow = true;
    backWallGroup.add(b);
  }

  // Outer frame
  addFrameBar(winW + 0.06, 0.045, 0.14, winCenter.x, WIN.y1 + 0.02, -0.04);
  addFrameBar(winW + 0.06, 0.055, 0.18, winCenter.x, WIN.y0 - 0.025, -0.04); // Window sill
  addFrameBar(0.045, winH + 0.04, 0.14, WIN.x0 - 0.02, winCenter.y, -0.04);
  addFrameBar(0.045, winH + 0.04, 0.14, WIN.x1 + 0.02, winCenter.y, -0.04);

  // Vertical Mullions (3-pane layout)
  addFrameBar(0.035, winH, 0.08, WIN.x0 + winW * 0.333, winCenter.y, -0.04);
  addFrameBar(0.035, winH, 0.08, WIN.x0 + winW * 0.666, winCenter.y, -0.04);

  // Window Glass
  var glassMat = new THREE.MeshStandardMaterial({
    color: 0xc8e6f0,
    transparent: true,
    opacity: 0.08,
    roughness: 0.03,
    metalness: 0.1,
    depthWrite: false
  });
  var glassMesh = new THREE.Mesh(new THREE.PlaneGeometry(winW, winH), glassMat);
  glassMesh.position.set(winCenter.x, winCenter.y, -0.04);
  backWallGroup.add(glassMesh);

  /* ==========================================================================
     THE OCEAN VISTA (SEA VIEW SHADER & HORIZON)
     ========================================================================== */

  // Sky Dome
  var skyUniforms = {
    topColor: { value: new THREE.Color(0x38bdf8) },
    bottomColor: { value: new THREE.Color(0xdbeafe) },
    sunDir: { value: new THREE.Vector3(0, 0.6, -1).normalize() },
    sunColor: { value: new THREE.Color(0xfff7ed) },
    sunIntensity: { value: 1.0 }
  };

  var skyGeo = new THREE.SphereGeometry(2500, 32, 16);
  var skyMat = new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: [
      'varying vec3 vWorldPosition;',
      'void main() {',
      '  vec4 worldPosition = modelMatrix * vec4(position, 1.0);',
      '  vWorldPosition = worldPosition.xyz;',
      '  gl_Position = projectionMatrix * viewMatrix * worldPosition;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform vec3 topColor;',
      'uniform vec3 bottomColor;',
      'uniform vec3 sunDir;',
      'uniform vec3 sunColor;',
      'uniform float sunIntensity;',
      'varying vec3 vWorldPosition;',
      'void main() {',
      '  vec3 dir = normalize(vWorldPosition);',
      '  float h = max(dir.y, 0.0);',
      '  vec3 sky = mix(bottomColor, topColor, pow(h, 0.45));',
      '  float sunCos = max(dot(dir, sunDir), 0.0);',
      '  float sunGlow = pow(sunCos, 4.0) * 0.35 + pow(sunCos, 128.0) * 0.85;',
      '  sky += sunColor * sunGlow * sunIntensity;',
      '  gl_FragColor = vec4(sky, 1.0);',
      '}'
    ].join('\n')
  });
  var skyMesh = new THREE.Mesh(skyGeo, skyMat);
  scene.add(skyMesh);

  // Animated Ocean Shader Plane
  var oceanUniforms = {
    time: { value: 0 },
    waterDeep: { value: new THREE.Color(0x0a3654) },
    waterShallow: { value: new THREE.Color(0x1479a6) },
    sunDir: { value: skyUniforms.sunDir.value },
    sunColor: { value: new THREE.Color(0xffedd5) },
    sunShininess: { value: 65.0 },
    skyHorColor: { value: skyUniforms.bottomColor.value }
  };

  var oceanGeo = new THREE.PlaneGeometry(4000, 3000, 96, 96);
  var oceanMat = new THREE.ShaderMaterial({
    uniforms: oceanUniforms,
    vertexShader: [
      'uniform float time;',
      'varying vec3 vWorldPos;',
      'varying vec3 vNormal;',
      'varying vec2 vUv;',
      'void main() {',
      '  vUv = uv;',
      '  vec3 pos = position;',
      '  float w1 = sin(pos.x * 0.02 + time * 1.5) * 1.8;',
      '  float w2 = cos(pos.y * 0.025 + time * 1.8) * 1.6;',
      '  float w3 = sin((pos.x + pos.y) * 0.04 + time * 2.2) * 1.1;',
      '  pos.z += w1 + w2 + w3;',
      '  vec4 worldPos = modelMatrix * vec4(pos, 1.0);',
      '  vWorldPos = worldPos.xyz;',
      '  float dx = 0.036 * cos(pos.x * 0.02 + time * 1.5) + 0.044 * cos((pos.x + pos.y) * 0.04 + time * 2.2);',
      '  float dy = -0.04 * sin(pos.y * 0.025 + time * 1.8) + 0.044 * cos((pos.x + pos.y) * 0.04 + time * 2.2);',
      '  vNormal = normalize(vec3(-dx, 1.0, -dy));',
      '  gl_Position = projectionMatrix * viewMatrix * worldPos;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform vec3 waterDeep;',
      'uniform vec3 waterShallow;',
      'uniform vec3 sunDir;',
      'uniform vec3 sunColor;',
      'uniform float sunShininess;',
      'uniform vec3 skyHorColor;',
      'varying vec3 vWorldPos;',
      'varying vec3 vNormal;',
      'varying vec2 vUv;',
      'void main() {',
      '  vec3 viewDir = normalize(cameraPosition - vWorldPos);',
      '  vec3 norm = normalize(vNormal);',
      '  float fresnel = pow(1.0 - max(dot(viewDir, norm), 0.0), 3.0);',
      '  vec3 baseWater = mix(waterDeep, waterShallow, fresnel * 0.7);',
      '  vec3 refDir = reflect(-sunDir, norm);',
      '  float spec = pow(max(dot(viewDir, refDir), 0.0), sunShininess);',
      '  vec3 specular = sunColor * spec * 2.2;',
      '  float dist = length(vWorldPos.xz);',
      '  float fog = smoothstep(600.0, 2400.0, dist);',
      '  vec3 finalColor = mix(baseWater + specular, skyHorColor, fog);',
      '  gl_FragColor = vec4(finalColor, 1.0);',
      '}'
    ].join('\n')
  });

  var oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
  oceanMesh.rotation.x = -Math.PI / 2;
  oceanMesh.position.set(0, -6.5, -1200);
  scene.add(oceanMesh);

  /* Distant Headlands / Coastal Cliffs on Horizon */
  var cliffMat = new THREE.MeshLambertMaterial({ color: srgb(0x3e5248) });
  function makeCliff(x, z, scaleX, scaleY, scaleZ) {
    var cGeo = new THREE.ConeGeometry(scaleX, scaleY, 6);
    var cMesh = new THREE.Mesh(cGeo, cliffMat);
    cMesh.position.set(x, -6.5 + scaleY / 2, z);
    cMesh.scale.set(1.4, 0.45, 1.2);
    scene.add(cMesh);
    return cMesh;
  }
  makeCliff(-380, -900, 220, 95, 180);
  makeCliff(460, -1100, 280, 110, 210);

  /* Distant Lighthouse on Promontory with Pulsing Beacon */
  var lhGroup = new THREE.Group();
  lhGroup.position.set(-260, 26, -850);
  scene.add(lhGroup);

  var lhTower = new THREE.Mesh(
    new THREE.CylinderGeometry(2.5, 4.2, 28, 8),
    new THREE.MeshLambertMaterial({ color: srgb(0xf4f4f0) })
  );
  lhGroup.add(lhTower);

  var lhTop = new THREE.Mesh(
    new THREE.CylinderGeometry(3.0, 3.0, 4.0, 8),
    new THREE.MeshLambertMaterial({ color: srgb(0x991b1b) })
  );
  lhTop.position.y = 15;
  lhGroup.add(lhTop);

  var lhBeacon = new THREE.PointLight(0xffedd5, 1.5, 300);
  lhBeacon.position.set(0, 16.5, 0);
  lhGroup.add(lhBeacon);

  /* Distant Sailboat Silhouette */
  var boatGroup = new THREE.Group();
  boatGroup.position.set(120, -5.8, -480);
  scene.add(boatGroup);

  var boatHull = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 1.2, 12),
    new THREE.MeshLambertMaterial({ color: srgb(0xffffff) })
  );
  boatGroup.add(boatHull);

  var sailGeo = new THREE.BufferGeometry();
  var sailVerts = new Float32Array([
    0, 0, -4,
    0, 14, -4,
    0, 0, 4
  ]);
  sailGeo.setAttribute('position', new THREE.BufferAttribute(sailVerts, 3));
  sailGeo.computeVertexNormals();
  var sailMesh = new THREE.Mesh(sailGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
  boatGroup.add(sailMesh);

  /* ==========================================================================
     THE WORKBENCH (DESK) & SCENIC PROPS
     ========================================================================== */

  var deskMat = new THREE.MeshStandardMaterial({
    color: srgb(0xf2e1cf), // Bleached Scandinavian oak
    roughness: 0.65,
    metalness: 0.05
  });

  var deskTop = new THREE.Mesh(roundedBox(2.1, 0.88, 0.038, 0.02), deskMat);
  deskTop.rotation.x = -Math.PI / 2;
  deskTop.position.set(0.05, DESK_Y - 0.019, 0.02);
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  scene.add(deskTop);

  // Modern Matte White / Steel Legs
  var legMat = new THREE.MeshStandardMaterial({
    color: srgb(0x323a36),
    roughness: 0.35,
    metalness: 0.8
  });

  [[-0.92, 0.36], [0.98, 0.36], [-0.92, -0.36], [0.98, -0.36]].forEach(function (pt) {
    var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, DESK_Y - 0.038, 12), legMat);
    leg.position.set(pt[0], (DESK_Y - 0.038) / 2, pt[1]);
    leg.castShadow = true;
    leg.receiveShadow = true;
    scene.add(leg);
  });

  /* Modern Task Desk Lamp */
  var lampGroup = new THREE.Group();
  lampGroup.position.set(-0.74, DESK_Y, -0.22);
  scene.add(lampGroup);

  var lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.015, 24), legMat);
  lampBase.castShadow = true;
  lampGroup.add(lampBase);

  var lampArm = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 12), legMat);
  lampArm.position.set(0.05, 0.25, 0.05);
  lampArm.rotation.z = -0.25;
  lampArm.castShadow = true;
  lampGroup.add(lampArm);

  var lampHead = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.12, 16), legMat);
  lampHead.rotation.z = Math.PI / 3;
  lampHead.position.set(0.16, 0.48, 0.08);
  lampHead.castShadow = true;
  lampGroup.add(lampHead);

  /* Potted Coastal Succulent / Plant */
  var plantGroup = new THREE.Group();
  plantGroup.position.set(0.92, DESK_Y, -0.22);
  scene.add(plantGroup);

  var potMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.05, 0.13, 16),
    new THREE.MeshStandardMaterial({ color: srgb(0xe2d6c7), roughness: 0.85 })
  );
  potMesh.position.y = 0.065;
  potMesh.castShadow = true;
  plantGroup.add(potMesh);

  var leafMat = new THREE.MeshStandardMaterial({ color: srgb(0x406d51), roughness: 0.45 });
  for (var lp = 0; lp < 9; lp++) {
    var leaf = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), leafMat);
    var ang = (lp / 9) * Math.PI * 2;
    leaf.scale.set(0.5, 1.4, 0.5);
    leaf.rotation.x = Math.cos(ang) * 0.4;
    leaf.rotation.z = Math.sin(ang) * 0.4;
    leaf.position.set(Math.cos(ang) * 0.05, 0.15 + (lp % 3) * 0.02, Math.sin(ang) * 0.05);
    leaf.castShadow = true;
    plantGroup.add(leaf);
  }

  /* Ceramic Coffee Mug */
  var mugMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.038, 0.09, 16),
    new THREE.MeshStandardMaterial({ color: srgb(0x2d3a33), roughness: 0.3 })
  );
  mugMesh.position.set(-0.38, DESK_Y + 0.045, 0.28);
  mugMesh.castShadow = true;
  scene.add(mugMesh);

  /* ==========================================================================
     INTERACTIVE 3D PROPS & GIZMOS
     ========================================================================== */

  var pickables = [];
  function registerPickable(obj, key) {
    obj.userData.key = key;
    pickables.push(obj);
    obj.traverse(function (child) {
      if (child.isMesh) child.userData.key = key;
    });
    return obj;
  }

  /* 1. VR HEADSET & STEREO WALL DISPLAY (Group: 'vr') */
  var gVR = registerPickable(new THREE.Group(), 'vr');
  gVR.position.set(-0.46, DESK_Y + 0.06, -0.06);
  scene.add(gVR);

  // Visor body
  var vrBodyMat = new THREE.MeshStandardMaterial({
    color: srgb(0xf2f4ef),
    roughness: 0.3,
    metalness: 0.08
  });
  var vrVisor = new THREE.Mesh(roundedBox(0.18, 0.095, 0.09, 0.03, 4), vrBodyMat);
  vrVisor.castShadow = true;
  gVR.add(vrVisor);

  // Front camera sensors
  var sensorMat = new THREE.MeshStandardMaterial({ color: srgb(0x111614), roughness: 0.1, metalness: 0.8 });
  [-0.055, 0.0, 0.055].forEach(function (sx) {
    var camPill = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.004, 16), sensorMat);
    camPill.rotation.x = Math.PI / 2;
    camPill.position.set(sx, 0, 0.046);
    gVR.add(camPill);
  });

  // Headstrap ring
  var strapMat = new THREE.MeshStandardMaterial({ color: srgb(0x27302b), roughness: 0.85 });
  var strapMesh = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.012, 8, 24), strapMat);
  strapMesh.rotation.x = Math.PI / 2;
  strapMesh.position.set(0, 0.01, -0.08);
  strapMesh.castShadow = true;
  gVR.add(strapMesh);

  // Wall-mounted VR Stereo Stream Monitor
  var vrWallScreenGroup = registerPickable(new THREE.Group(), 'vr');
  vrWallScreenGroup.position.set(-0.52, 1.48, WALL_Z + 0.03);
  scene.add(vrWallScreenGroup);

  var vrTvFrame = new THREE.Mesh(roundedBox(0.68, 0.42, 0.024, 0.01), legMat);
  vrTvFrame.castShadow = true;
  vrWallScreenGroup.add(vrTvFrame);

  var vrScreenCanvas = document.createElement('canvas');
  vrScreenCanvas.width = 512;
  vrScreenCanvas.height = 316;
  var vrScreenCtx = vrScreenCanvas.getContext('2d');
  var vrScreenTex = new THREE.CanvasTexture(vrScreenCanvas);
  vrScreenTex.encoding = THREE.sRGBEncoding;

  function renderVRStereoDisplay(caption) {
    vrScreenCtx.fillStyle = '#080d0a';
    vrScreenCtx.fillRect(0, 0, 512, 316);
    // Draw stereo dual-eye circles
    ['#0284c7', '#38bdf8'].forEach(function (col, i) {
      var cx = i === 0 ? 140 : 372, cy = 158;
      var grad = vrScreenCtx.createRadialGradient(cx, cy, 10, cx, cy, 110);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
      grad.addColorStop(1, 'rgba(10, 20, 16, 0.95)');
      vrScreenCtx.fillStyle = grad;
      vrScreenCtx.beginPath();
      vrScreenCtx.arc(cx, cy, 110, 0, Math.PI * 2);
      vrScreenCtx.fill();
      vrScreenCtx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      vrScreenCtx.lineWidth = 3;
      vrScreenCtx.stroke();
    });
    vrScreenCtx.font = 'bold 16px "JetBrains Mono", monospace';
    vrScreenCtx.fillStyle = '#ffffff';
    vrScreenCtx.textAlign = 'center';
    vrScreenCtx.fillText('META QUEST 3 · STEREO STREAM', 256, 44);
    vrScreenCtx.font = '14px "Figtree", sans-serif';
    vrScreenCtx.fillStyle = '#94a3b8';
    vrScreenCtx.fillText(caption || 'Simulanis Industrial XR Simulator · 90 FPS', 256, 292);
    vrScreenTex.needsUpdate = true;
  }
  renderVRStereoDisplay();

  var vrDisplayPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.65, 0.39),
    new THREE.MeshBasicMaterial({ map: vrScreenTex })
  );
  vrDisplayPlane.position.z = 0.013;
  vrWallScreenGroup.add(vrDisplayPlane);

  /* 2. DESKTOP RIG & ULTRAWIDE MONITOR (Group: 'pc') */
  var gPC = registerPickable(new THREE.Group(), 'pc');
  gPC.position.set(0.35, DESK_Y + 0.28, -0.04);
  scene.add(gPC);

  var monStand = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.28, 16), legMat);
  monStand.position.y = -0.14;
  monStand.castShadow = true;
  gPC.add(monStand);

  var monBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.01, 24), legMat);
  monBase.position.y = -0.275;
  monBase.castShadow = true;
  gPC.add(monBase);

  var monChassis = new THREE.Mesh(roundedBox(0.86, 0.48, 0.024, 0.012), legMat);
  monChassis.castShadow = true;
  gPC.add(monChassis);

  var pcScreenCanvas = document.createElement('canvas');
  pcScreenCanvas.width = 720;
  pcScreenCanvas.height = 400;
  var pcScreenCtx = pcScreenCanvas.getContext('2d');
  var pcScreenTex = new THREE.CanvasTexture(pcScreenCanvas);
  pcScreenTex.encoding = THREE.sRGBEncoding;

  function renderPCScreen(title, sub) {
    pcScreenCtx.fillStyle = '#0f1713';
    pcScreenCtx.fillRect(0, 0, 720, 400);

    // Accent header
    pcScreenCtx.fillStyle = '#0284c7';
    pcScreenCtx.fillRect(0, 0, 720, 4);

    pcScreenCtx.font = 'bold 28px "Bricolage Grotesque", sans-serif';
    pcScreenCtx.fillStyle = '#ffffff';
    pcScreenCtx.textAlign = 'center';
    pcScreenCtx.fillText(title || 'CRIMSON TACTICS', 360, 160);

    pcScreenCtx.font = '16px "JetBrains Mono", monospace';
    pcScreenCtx.fillStyle = '#38bdf8';
    pcScreenCtx.fillText(sub || 'STEAM AA TITLE · TURN-BASED RPG', 360, 205);

    pcScreenCtx.fillStyle = '#475569';
    pcScreenCtx.fillRect(260, 240, 200, 28);
    pcScreenCtx.font = '13px "JetBrains Mono", monospace';
    pcScreenCtx.fillStyle = '#f8fafc';
    pcScreenCtx.fillText('CLICK TO INSPECT PC SUITE', 360, 259);

    pcScreenTex.needsUpdate = true;
  }
  renderPCScreen();

  var pcDisplayPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.83, 0.45),
    new THREE.MeshBasicMaterial({ map: pcScreenTex })
  );
  pcDisplayPlane.position.z = 0.013;
  gPC.add(pcDisplayPlane);

  // Mechanical Keyboard & Mouse on Desk
  var kbMat = new THREE.MeshStandardMaterial({ color: srgb(0x1f2723), roughness: 0.6 });
  var keyboard = new THREE.Mesh(roundedBox(0.36, 0.12, 0.012, 0.006), kbMat);
  keyboard.rotation.x = -Math.PI / 2;
  keyboard.position.set(0.32, DESK_Y + 0.007, 0.22);
  keyboard.castShadow = true;
  scene.add(keyboard);

  var mouseMesh = new THREE.Mesh(roundedBox(0.065, 0.095, 0.02, 0.01), kbMat);
  mouseMesh.rotation.x = -Math.PI / 2;
  mouseMesh.position.set(0.62, DESK_Y + 0.01, 0.22);
  mouseMesh.castShadow = true;
  scene.add(mouseMesh);

  /* 3. SMARTPHONE ON CHARGING DOCK (Group: 'phone') */
  var gPhone = registerPickable(new THREE.Group(), 'phone');
  gPhone.position.set(0.72, DESK_Y + 0.05, 0.02);
  gPhone.rotation.y = -0.32;
  scene.add(gPhone);

  var phoneBody = new THREE.Mesh(
    roundedBox(0.082, 0.165, 0.008, 0.012),
    new THREE.MeshStandardMaterial({ color: srgb(0x18201b), roughness: 0.25, metalness: 0.85 })
  );
  phoneBody.rotation.x = -0.35;
  phoneBody.castShadow = true;
  gPhone.add(phoneBody);

  var phoneScreenCanvas = document.createElement('canvas');
  phoneScreenCanvas.width = 300;
  phoneScreenCanvas.height = 600;
  var phoneScreenCtx = phoneScreenCanvas.getContext('2d');
  var phoneScreenTex = new THREE.CanvasTexture(phoneScreenCanvas);
  phoneScreenTex.encoding = THREE.sRGBEncoding;

  function renderPhoneScreen(name, tag) {
    phoneScreenCtx.fillStyle = '#0f1714';
    phoneScreenCtx.fillRect(0, 0, 300, 600);

    // Header bar
    phoneScreenCtx.fillStyle = '#10b981';
    phoneScreenCtx.fillRect(20, 40, 260, 4);

    phoneScreenCtx.font = 'bold 22px "Bricolage Grotesque", sans-serif';
    phoneScreenCtx.fillStyle = '#ffffff';
    phoneScreenCtx.textAlign = 'center';
    phoneScreenCtx.fillText(name || 'YUNGALGO', 150, 250);

    phoneScreenCtx.font = '14px "JetBrains Mono", monospace';
    phoneScreenCtx.fillStyle = '#10b981';
    phoneScreenCtx.fillText(tag || '5M+ PLAYERS', 150, 290);

    phoneScreenCtx.fillStyle = '#334155';
    phoneScreenCtx.fillRect(40, 360, 220, 36);
    phoneScreenCtx.font = '13px "JetBrains Mono", monospace';
    phoneScreenCtx.fillStyle = '#ffffff';
    phoneScreenCtx.fillText('OPEN MOBILE WORK', 150, 383);

    phoneScreenTex.needsUpdate = true;
  }
  renderPhoneScreen();

  var phoneScreenPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.076, 0.155),
    new THREE.MeshBasicMaterial({ map: phoneScreenTex })
  );
  phoneScreenPlane.position.z = 0.0045;
  phoneBody.add(phoneScreenPlane);

  /* 4. ARCHITECTURAL DEV FIELD NOTEBOOK (Group: 'notes') */
  var gNotes = registerPickable(new THREE.Group(), 'notes');
  gNotes.position.set(-0.06, DESK_Y + 0.008, 0.22);
  gNotes.rotation.y = 0.08;
  scene.add(gNotes);

  var bookCover = new THREE.Mesh(
    roundedBox(0.24, 0.17, 0.014, 0.008),
    new THREE.MeshStandardMaterial({ color: srgb(0x354039), roughness: 0.9 })
  );
  bookCover.rotation.x = -Math.PI / 2;
  bookCover.castShadow = true;
  gNotes.add(bookCover);

  var bookPages = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.012, 0.15),
    new THREE.MeshStandardMaterial({ color: srgb(0xf4f1e8), roughness: 0.95 })
  );
  bookPages.position.y = 0.007;
  gNotes.add(bookPages);

  // Stylus / Pen
  var penMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.004, 0.004, 0.16, 12),
    new THREE.MeshStandardMaterial({ color: srgb(0xd95b26), roughness: 0.3, metalness: 0.7 })
  );
  penMesh.rotation.z = Math.PI / 2;
  penMesh.position.set(0, 0.018, 0.09);
  gNotes.add(penMesh);

  /* ==========================================================================
     LIGHTING MODES (DAY, SUNSET, NIGHT)
     ========================================================================== */

  var ENV_PRESETS = {
    day: {
      sunDir: new THREE.Vector3(0.35, 0.75, -0.6).normalize(),
      sunColor: 0xfff8ee,
      sunIntensity: 4.8,
      hemiSky: 0xdbeafe,
      hemiGround: 0x475569,
      hemiIntensity: 0.65,
      topSky: 0x38bdf8,
      botSky: 0xdbeafe,
      waterDeep: 0x07314d,
      waterShallow: 0x1479a6,
      lampIntensity: 0,
      ceilIntensity: 0,
      monGlowIntensity: 0.3,
      wallColor: 0xd9e3dc,
      dusk: false
    },
    sunset: {
      sunDir: new THREE.Vector3(0.05, 0.18, -1.0).normalize(),
      sunColor: 0xf97316,
      sunIntensity: 6.2,
      hemiSky: 0xfdba74,
      hemiGround: 0x78350f,
      hemiIntensity: 0.75,
      topSky: 0x475569,
      botSky: 0xf97316,
      waterDeep: 0x1e293b,
      waterShallow: 0xe06d2d,
      lampIntensity: 2.5,
      ceilIntensity: 0.5,
      monGlowIntensity: 0.6,
      wallColor: 0xd6c6b8,
      dusk: false
    },
    night: {
      sunDir: new THREE.Vector3(-0.2, 0.65, -0.7).normalize(),
      sunColor: 0x93c5fd, // Moonlit cold beam
      sunIntensity: 1.2,
      hemiSky: 0x0f172a,
      hemiGround: 0x020617,
      hemiIntensity: 0.25,
      topSky: 0x020617,
      botSky: 0x0f172a,
      waterDeep: 0x020617,
      waterShallow: 0x0f172a,
      lampIntensity: 12.0,
      ceilIntensity: 2.4,
      monGlowIntensity: 1.6,
      wallColor: 0x16201b,
      dusk: true
    }
  };

  var currentMode = 'day';

  function applyEnvironment(modeName) {
    var p = ENV_PRESETS[modeName] || ENV_PRESETS.day;
    currentMode = modeName;

    sunLight.position.copy(p.sunDir).multiplyScalar(15).add(sunTarget.position);
    sunLight.color.setHex(p.sunColor);
    sunLight.intensity = p.sunIntensity;

    hemiLight.color.setHex(p.hemiSky);
    hemiLight.groundColor.setHex(p.hemiGround);
    hemiLight.intensity = p.hemiIntensity;

    skyUniforms.topColor.value.setHex(p.topSky);
    skyUniforms.bottomColor.value.setHex(p.botSky);
    skyUniforms.sunDir.value.copy(p.sunDir);
    skyUniforms.sunColor.value.setHex(p.sunColor);

    oceanUniforms.sunDir.value.copy(p.sunDir);
    oceanUniforms.sunColor.value.setHex(p.sunColor);
    oceanUniforms.waterDeep.value.setHex(p.waterDeep);
    oceanUniforms.waterShallow.value.setHex(p.waterShallow);
    oceanUniforms.skyHorColor.value.setHex(p.botSky);

    deskSpot.intensity = p.lampIntensity;
    roomCeilLight.intensity = p.ceilIntensity;
    monGlow.intensity = p.monGlowIntensity;

    document.body.classList.toggle('dusk', p.dusk);
    document.documentElement.style.setProperty('--wall', '#' + new THREE.Color(p.wallColor).getHexString());

    document.querySelectorAll('.env-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === modeName);
    });
  }

  /* ==========================================================================
     CAMERA VIEWS & INTERACTIVE DRAG NAVIGATION
     ========================================================================== */

  var VIEWS = {
    overview: { pos: [0.08, 1.48, 2.2], tgt: [0.08, 1.15, -0.15] },
    vr:       { pos: [-0.46, 1.18, 0.95], tgt: [-0.48, 1.12, -0.2] },
    pc:       { pos: [0.32, 1.16, 0.85], tgt: [0.35, 1.08, -0.15] },
    phone:    { pos: [0.68, 0.98, 0.65], tgt: [0.72, 0.84, 0.05] },
    notes:    { pos: [-0.08, 1.06, 0.82], tgt: [-0.06, 0.78, 0.22] },
    approach: { pos: [-0.85, 1.46, 0.85], tgt: [-0.98, 1.46, -0.3] },
    about:    { pos: [0.15, 1.52, 0.75], tgt: [0.12, 1.49, -0.45] }
  };

  var camPos = new THREE.Vector3().fromArray(VIEWS.overview.pos);
  var camTgt = new THREE.Vector3().fromArray(VIEWS.overview.tgt);
  var wantPos = camPos.clone();
  var wantTgt = camTgt.clone();

  var yaw = 0, pitch = 0, targetYaw = 0, targetPitch = 0;
  var isDragging = false, dragStart = { x: 0, y: 0 };

  function setView(viewKey) {
    var v = VIEWS[viewKey] || VIEWS.overview;
    wantPos.fromArray(v.pos);
    wantTgt.fromArray(v.tgt);

    // Responsive camera zoom adjustment for narrow screens
    var aspect = window.innerWidth / Math.max(window.innerHeight, 1);
    if (aspect < 1.0) {
      wantPos.z += (1.0 - aspect) * 1.3;
      wantPos.y += 0.2;
    }
  }

  /* Drag Orbit Handlers */
  stage.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    isDragging = true;
    dragStart.x = e.clientX;
    dragStart.y = e.clientY;
    stage.querySelector('canvas').classList.add('grabbing');
  });

  window.addEventListener('pointermove', function (e) {
    if (!isDragging) return;
    var dx = e.clientX - dragStart.x;
    var dy = e.clientY - dragStart.y;
    dragStart.x = e.clientX;
    dragStart.y = e.clientY;

    targetYaw += dx * 0.0022;
    targetPitch += dy * 0.0018;

    // Strict boundary clamps so user stays immersed inside the room
    targetYaw = THREE.MathUtils.clamp(targetYaw, -0.55, 0.55);
    targetPitch = THREE.MathUtils.clamp(targetPitch, -0.3, 0.3);
  });

  window.addEventListener('pointerup', function () {
    isDragging = false;
    stage.querySelector('canvas').classList.remove('grabbing');
  });

  /* ==========================================================================
     RAYCASTING & CLICK SELECTION
     ========================================================================== */

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(-99, -99);
  var hoveredObj = null;

  var HOVER_DESCRIPTIONS = {
    vr: 'Meta Quest 3 · 5 VR & XR Simulation Projects',
    pc: 'Desktop Rig · Steam AA Titles & PC Systems',
    phone: 'Mobile Device · 5M+ Players Multiplayer & Web3 Suite',
    notes: 'Dev Field Journal · Architecture Notes & Teardowns'
  };

  var hintText = document.getElementById('hint-text');

  stage.addEventListener('mousemove', function (e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  stage.addEventListener('click', function () {
    if (hoveredObj && hoveredObj.userData.key) {
      var k = hoveredObj.userData.key;
      if (k === 'vr') showGroup('vr');
      else if (k === 'pc') showGroup('pc');
      else if (k === 'phone') showGroup('phone');
      else if (k === 'notes') showNotes();
    }
  });

  /* ==========================================================================
     SLIDING DOCK PANEL CONTROLLER
     ========================================================================== */

  var currentPanel = null;
  var panel = document.getElementById('panel');
  var pEyebrow = document.getElementById('panel-eyebrow');
  var pTitle = document.getElementById('panel-title');
  var pBody = document.getElementById('panel-body');
  var hint = document.getElementById('hint');

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function openPanel(wide) {
    panel.classList.toggle('wide', !!wide);
    panel.classList.add('open');
    document.body.classList.add('panel-open');
    hint.style.opacity = '0';
    targetYaw = 0;
    targetPitch = 0;
  }

  function closePanel() {
    panel.classList.remove('open');
    document.body.classList.remove('panel-open');
    currentPanel = null;
    setView('overview');
    hint.style.opacity = '1';
    renderPCScreen();
    renderPhoneScreen();
    renderVRStereoDisplay();
  }

  function setPanelHeader(eyebrow, title) {
    pEyebrow.textContent = eyebrow;
    pTitle.textContent = title;
    pBody.scrollTop = 0;
  }

  function showGroup(groupKey) {
    var gr = GROUPS[groupKey];
    if (!gr) return;
    currentPanel = groupKey;
    setView(groupKey);
    setPanelHeader(gr.platform, gr.label);

    var html = '<ul class="plist">';
    gr.projects.forEach(function (p, i) {
      html +=
        '<li><button class="prow" type="button" data-proj="' + i + '">' +
        '<span class="thumb"><img src="' + p.thumb + '" alt="' + esc(p.name) + '" loading="lazy"></span>' +
        '<span><span class="t">' + esc(p.name) + '</span><span class="k">' + esc(p.kind) + '</span></span>' +
        '</button></li>';
    });
    html += '</ul>';

    pBody.innerHTML = html;
    openPanel(false);
  }

  function showProjectDetail(index) {
    var gr = GROUPS[currentPanel];
    if (!gr) return;
    var p = gr.projects[index];
    setPanelHeader(gr.label + ' · ' + p.kind, p.name);

    // Update screen in 3D scene
    if (currentPanel === 'pc') renderPCScreen(p.name, p.kind);
    else if (currentPanel === 'phone') renderPhoneScreen(p.name, p.kind);
    else if (currentPanel === 'vr') renderVRStereoDisplay(p.name);

    var teardownHtml = '';
    if (p.teardown && p.teardown.length) {
      teardownHtml =
        '<details class="teardown" open><summary>Engineering Teardown & Architecture</summary>' +
        p.teardown.map(function (txt) { return '<p>' + esc(txt) + '</p>'; }).join('') +
        '</details>';
    }

    var tagsHtml =
      '<div class="tags">' +
      p.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') +
      '</div>';

    pBody.innerHTML =
      '<div class="detail">' +
      '<div class="capture"><img src="' + p.thumb + '" alt="' + esc(p.name) + '"></div>' +
      '<p>' + esc(p.blurb) + '</p>' +
      '<p class="dim">' + esc(p.note) + '</p>' +
      teardownHtml +
      tagsHtml +
      '<button class="backbtn" type="button" data-back="group">← All ' + esc(gr.label) + ' Work</button>' +
      '</div>';
  }

  function showNotes() {
    currentPanel = 'notes';
    setView('notes');
    setPanelHeader('Engineering Notes', 'Architectural Lessons from Production');

    var html = '<ul class="plist">';
    NOTES.forEach(function (n, i) {
      html +=
        '<li><button class="prow text" type="button" data-note="' + i + '">' +
        '<span><span class="t">' + esc(n.title) + '</span><span class="k">' + esc(n.kind) + ' · ' + esc(n.read) + '</span></span>' +
        '</button></li>';
    });
    html += '</ul>';

    pBody.innerHTML = html;
    openPanel(true);
  }

  function showNoteDetail(index) {
    var n = NOTES[index];
    setPanelHeader('Notes · ' + n.kind, n.title);
    pBody.innerHTML =
      '<div class="article">' +
      '<div class="meta">' + esc(n.read) + '</div>' +
      n.body +
      '<button class="backbtn" type="button" data-back="notes">← All Engineering Notes</button>' +
      '</div>';
  }

  function showApproach() {
    currentPanel = 'approach';
    setView('approach');
    setPanelHeader('Approach', 'How I Work & Build');
    pBody.innerHTML = APPROACH_HTML;
    openPanel(true);
  }

  function showAbout() {
    currentPanel = 'about';
    setView('about');
    setPanelHeader('Developer Bio', 'Deepankar Sehgal');
    pBody.innerHTML = ABOUT_HTML;
    openPanel(false);
  }

  function showContact() {
    currentPanel = 'contact';
    setView('overview');
    setPanelHeader('Transmission', 'Get in Touch');
    pBody.innerHTML = CONTACT_HTML;
    openPanel(false);
  }

  // Panel event listeners
  pBody.addEventListener('click', function (e) {
    var projBtn = e.target.closest('[data-proj]');
    if (projBtn) {
      showProjectDetail(parseInt(projBtn.getAttribute('data-proj'), 10));
      return;
    }
    var noteBtn = e.target.closest('[data-note]');
    if (noteBtn) {
      showNoteDetail(parseInt(noteBtn.getAttribute('data-note'), 10));
      return;
    }
    var backBtn = e.target.closest('[data-back]');
    if (backBtn) {
      if (backBtn.getAttribute('data-back') === 'notes') showNotes();
      else showGroup(currentPanel);
    }
  });

  document.getElementById('panel-close').addEventListener('click', closePanel);
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
  });

  // Top Nav Buttons
  document.getElementById('btn-vr').addEventListener('click', function () { showGroup('vr'); });
  document.getElementById('btn-pc').addEventListener('click', function () { showGroup('pc'); });
  document.getElementById('btn-phone').addEventListener('click', function () { showGroup('phone'); });
  document.getElementById('btn-notes').addEventListener('click', showNotes);
  document.getElementById('btn-approach').addEventListener('click', showApproach);
  document.getElementById('btn-about').addEventListener('click', showAbout);
  document.getElementById('btn-contact').addEventListener('click', showContact);

  // Environment Lighting Buttons
  document.querySelectorAll('.env-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyEnvironment(btn.getAttribute('data-mode'));
    });
  });

  // Screen-reader accessible fallback navigation
  var srList = document.getElementById('sr-list');
  if (srList) {
    Object.keys(GROUPS).forEach(function (k) {
      GROUPS[k].projects.forEach(function (p, i) {
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = GROUPS[k].label + ': ' + p.name;
        b.addEventListener('click', function () {
          showGroup(k);
          showProjectDetail(i);
        });
        li.appendChild(b);
        srList.appendChild(li);
      });
    });
  }

  /* ==========================================================================
     LOCAL & VISITOR CLOCK SYNC
     ========================================================================== */

  var timeLabel = document.getElementById('time-label');
  var visitorLabel = document.getElementById('visitor-label');

  function updateClock() {
    var now = new Date();
    // Indian Standard Time (UTC + 5:30)
    var istHours = String(now.getUTCHours() + 5 + Math.floor((now.getUTCMinutes() + 30) / 60)).padStart(2, '0');
    var istMinutes = String((now.getUTCMinutes() + 30) % 60).padStart(2, '0');

    if (timeLabel) {
      timeLabel.textContent = 'Coastal Studio · ' + istHours + ':' + istMinutes + ' IST';
    }

    // Visitor comparison if timezone detected
    if (visitorLabel) {
      try {
        var userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (userTz && userTz !== 'Asia/Kolkata') {
          var userTimeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          visitorLabel.textContent = "It's " + userTimeStr + " for you (" + userTz.split('/')[1] + "), " + istHours + ":" + istMinutes + " IST here";
          visitorLabel.hidden = false;
        }
      } catch (err) {}
    }
  }
  updateClock();
  setInterval(updateClock, 30000);

  /* Auto-determine time of day */
  var initialHour = (new Date().getUTCHours() + 5) % 24;
  if (initialHour >= 6 && initialHour < 17) applyEnvironment('day');
  else if (initialHour >= 17 && initialHour < 19) applyEnvironment('sunset');
  else applyEnvironment('night');

  /* ==========================================================================
     MAIN ANIMATION & RENDER LOOP
     ========================================================================== */

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    var dt = clock.getDelta();
    var elapsed = clock.getElapsedTime();

    // Ocean waves animation
    oceanUniforms.time.value = elapsed;

    // Distant boat gentle rocking
    boatGroup.rotation.z = Math.sin(elapsed * 1.2) * 0.04;
    boatGroup.position.y = -5.8 + Math.sin(elapsed * 1.5) * 0.2;

    // Lighthouse beacon sweep
    lhBeacon.intensity = 0.8 + Math.sin(elapsed * 2.8) * 0.6;

    // Smooth Camera Lerp
    var speed = reduceMotion ? 1.0 : dt * 3.8;
    camPos.lerp(wantPos, speed);
    camTgt.lerp(wantTgt, speed);

    yaw = THREE.MathUtils.lerp(yaw, targetYaw, speed);
    pitch = THREE.MathUtils.lerp(pitch, targetPitch, speed);

    camera.position.copy(camPos);
    camera.lookAt(camTgt);

    // Apply look-around offset around current orientation
    camera.rotation.y += yaw;
    camera.rotation.x += pitch;

    // Raycast hover check
    if (!isDragging && !panel.classList.contains('open')) {
      raycaster.setFromCamera(mouse, camera);
      var hits = raycaster.intersectObjects(pickables, true);
      if (hits.length > 0) {
        var topHit = hits[0].object;
        while (topHit && !topHit.userData.key && topHit.parent) {
          topHit = topHit.parent;
        }
        if (topHit && topHit.userData.key) {
          hoveredObj = topHit;
          stage.querySelector('canvas').classList.add('grab');
          if (hintText) {
            hintText.innerHTML = '<b>Inspect:</b> ' + (HOVER_DESCRIPTIONS[topHit.userData.key] || 'Click to view');
          }
        }
      } else {
        hoveredObj = null;
        stage.querySelector('canvas').classList.remove('grab');
        if (hintText) {
          hintText.innerHTML = '<b>Click</b> any device on the desk. <b>Drag</b> to look around.';
        }
      }
    }

    renderer.render(scene, camera);
  }

  // Window Resize Handler
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    setView(currentPanel || 'overview');
  });

  // Remove loader once ready
  setTimeout(function () {
    var loader = document.getElementById('loader');
    if (loader) loader.classList.add('done');
  }, 450);

  animate();
})();

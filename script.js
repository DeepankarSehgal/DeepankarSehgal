/**
 * Deepankar Sehgal · 3D Portfolio & Interactive Workbench
 * Senior Unity & XR Developer · Bengaluru, India
 * 
 * Features:
 * - Real-Time Day/Night Sun Synchronization based on Indian Standard Time (IST)
 * - Live Bengaluru Weather & US AQI Integration (Open-Meteo API)
 * - Continuous Live Video Streaming across PC Monitor, VR Stereo Display, and Mobile Phone
 * - Running Bengaluru Highway Traffic, Electronic City Elevated Flyover & Namma Metro Viaduct
 * - 100% Reliable 3D Device & Prop Click Raycasting (VR, PC, Mobile, Notes, Lamp, Speakers, Mug)
 * - 9 VR & XR Projects, 8 PC & Steam AA Projects (including Crimson Tactics official Steam gameplay trailer & store link)
 * - Procedural Bengaluru City Ambient Audio Synthesizer (Web Audio API)
 */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     CONTINUOUS VIDEO TEXTURE ENGINE
     ========================================================================== */

  var clips = {};
  function clip(name) {
    if (!clips[name]) {
      var v = document.createElement('video');
      v.muted = true;
      v.defaultMuted = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.crossOrigin = 'anonymous';
      v.preload = 'auto';

      var s = document.createElement('source');
      s.src = 'assets/videos/' + name + '.mp4';
      s.type = 'video/mp4';
      v.appendChild(s);

      var tex = new THREE.VideoTexture(v);
      tex.encoding = THREE.sRGBEncoding;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.center.set(0.5, 0.5);

      clips[name] = { video: v, tex: tex };
    }
    return clips[name];
  }

  function playVideo(v) {
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  function kickAllVideos() {
    Object.keys(clips).forEach(function (k) {
      if (clips[k] && clips[k].video) playVideo(clips[k].video);
    });
  }
  window.addEventListener('pointerdown', kickAllVideos, { once: true });
  window.addEventListener('keydown', kickAllVideos, { once: true });

  /* ==========================================================================
     PORTFOLIO PROJECTS DATA (DEEPANKAR SEHGAL)
     ========================================================================== */

  var GROUPS = {
    vr: {
      label: 'Meta Quest · VR & XR',
      platform: 'Virtual & Augmented Reality · 6-DoF Headsets',
      projects: [
        {
          clip: 'stadvr',
          name: 'Simulanis Industrial XR Simulator',
          kind: 'Enterprise VR Training',
          blurb: 'Enterprise-grade procedural safety simulations built for industrial crews on Meta Quest 2 and 3 headsets. Trainees execute high-voltage lockout-tagout (LOTO), hazardous chemical valve sequences, and spatial emergency responses with real-time compliance tracking.',
          note: 'Built with Unity XR Interaction Toolkit and custom spatial physics. Every procedure is tracked against strict safety compliance standards with instant error reporting.',
          teardown: [
            "Industrial safety training cannot afford abstractions. If a worker fails to bleed stored hydraulic line pressure before turning a chemical valve, the simulation triggers a simulated catastrophic breach immediately.",
            "I engineered the interaction layer using custom XR grab interactors and spatial constraints rather than standard triggers. The user must perform tactile wrist rotations and multi-step latch mechanisms identical to physical machinery.",
            "To hit solid 72/90 FPS on standalone Quest 2 hardware, I built a custom shader batching pipeline and aggressive mesh combination routine that keeps draw calls under 85 across extensive factory environments."
          ],
          tags: ['Unity 3D', 'Meta Quest 2/3', 'XR Interaction Toolkit', 'Enterprise Safety', 'C#']
        },
        {
          clip: 'roof',
          name: 'Roof Installation VR',
          kind: 'Vocational Training',
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
          clip: 'drive',
          name: 'VR Driving Simulator',
          kind: 'Driver Training',
          blurb: 'High-fidelity vehicle driving trainer featuring scenario generation: tight parking bays, rainy highway driving, sudden pedestrian crossings, and intersection hazards with an end-of-run analytics debrief.',
          note: 'Configurable scenario data layers let instructors spin up customized road conditions on demand.',
          teardown: [
            "Real-world lessons cannot guarantee a wet road or an erratic driver pulling out at a roundabout on a Tuesday morning. This trainer bridges that critical training gap.",
            "I designed the scenario architecture around modular ScriptableObject presets defining traffic density, road surface friction coefficient, and rain intensity. Adding a new lesson scenario requires zero new code."
          ],
          tags: ['Unity', 'Vehicle Physics', 'Meta Quest', 'Telemetry Analytics']
        },
        {
          clip: 'cna',
          name: 'CNA Clinical Healthcare & Patient Transfer VR',
          kind: 'Medical Procedure Simulation',
          blurb: 'Certified Nursing Assistant vocational training covering clinical procedures from sterile hand hygiene to complex bed-to-wheelchair transfers utilizing gait transfer belts and patient communication checkpoints.',
          note: 'Step-by-step clinical checkpoints validate posture, ergonomics, and patient reassurance dialogues.',
          teardown: [
            "Patient safety and caregiver ergonomics depend on precise physical leverage. We implemented two-handed spatial physics constraints requiring trainees to position their hands at specific anatomical grip zones on the transfer belt.",
            "An integrated video reference preview lets trainees inspect real-world master practitioner footage inside the 3D clinic before executing the maneuver themselves."
          ],
          tags: ['Unity', 'Healthcare Simulation', 'Meta Quest', 'Medical XR']
        },
        {
          clip: 'wah',
          name: 'Work at Height & Scaffold Safety VR',
          kind: 'Construction Safety',
          blurb: 'Scaffolding inspection, working-at-height hazard identification, permit verification, and modular guardrail assembly compliant with rigorous occupational safety standards.',
          note: 'Trainees physically inspect structural pins, toe boards, and anchor points rather than picking answers from a 2D quiz.',
          teardown: [
            "Scaffolding inspection requires spatial depth perception. In VR, trainees spot hairline clamp cracks, missing lock pins, and uneven base plates at 1:1 scale.",
            "Implemented an ergonomic safety harness clip mechanic: users must maintain 100% tie-off across transitional beams with dual lanyard carabiners."
          ],
          tags: ['Unity', 'Occupational Safety', 'Inspection Mechanics', 'Meta Quest']
        },
        {
          clip: 'cable',
          name: 'Substation Electrical Safety & Cable Avoidance VR',
          kind: 'Utility Safety',
          blurb: 'High-voltage substation and underground buried service avoidance. Trainees calibrate radio-detection locators, perform precision ground sweeps, mark spray paint utility paths, and verify lockout-tagout on high-voltage switchgear.',
          note: 'Realistic locator audio response and frequency signal modulation guide the student based on electromagnetic field physics.',
          tags: ['Unity', 'Utility Safety', 'Signal Physics', 'Hand Tracking']
        },
        {
          clip: 'stadvr',
          name: 'Stadium Safety & Emergency Egress VR',
          kind: 'Venue & Crowd Management',
          blurb: 'Large-scale venue safety inspection, turnstile bottleneck checks, and dynamic crowd egress simulation walking through stadium concourses in full 6-DoF VR.',
          note: 'Engineered in parallel with a desktop PC build utilizing a shared architectural codebase.',
          tags: ['Unity', 'NavMesh AI', 'Crowd Simulation', 'Multi-Platform']
        },
        {
          clip: 'roof',
          name: 'Interactive VR Gameplay & Spatial Physics',
          kind: 'Spatial Computing',
          blurb: 'Natural spatial hand-tracking sandbox featuring tactile physics interactions, curved floating VR canvases, two-handed object manipulation, and low-latency kinetic feedback.',
          note: 'Fine-tuned haptic triggers and low-latency physics sub-stepping for zero perceptible input lag.',
          tags: ['Hand Tracking', 'Spatial Audio', 'Curved VR UI', 'Oculus SDK']
        },
        {
          clip: 'drive',
          name: 'Irusu VR Cinema & Human Anatomy XR',
          kind: 'Mobile VR App',
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
          clip: 'crimson',
          name: 'Crimson Tactics: The Rise of The White Banner',
          kind: 'AA Turn-Based Tactical RPG',
          store: 'https://store.steampowered.com/app/1480810/Crimson_Tactics_The_Rise_of_The_White_Banner/',
          blurb: 'A commercial AA tactical turn-based RPG released on Steam PC by Black March Studios. Features a grid battle system, elevation-based tactical advantages, complex spell mechanics, mounted combat, and responsive enemy AI.',
          note: 'Engineered battle grid pathfinding, turn initiative queues, inventory management, Steamworks SDK integration, and tactical combat AI.',
          teardown: [
            "Crimson Tactics required deep algorithmic precision. Combat takes place on a high-resolution 3D grid where elevation, terrain friction, facing direction, mounted units, and weapon range govern hit probability and critical damage.",
            "I developed the tactical AI decision tree. Instead of brute-forcing every potential move on the board, the AI calculates heatmaps based on threat ranges, unit squishiness, and elemental affinities, making battles feel punishingly intelligent without stuttering the framerate.",
            "Integrated Steamworks SDK for Cloud Saves, Achievements, and Steam Deck controller mapping."
          ],
          tags: ['Unity', 'Steam AA Release', 'Tactical AI', 'Grid Pathfinding', 'C#', 'Steam Deck']
        },
        {
          clip: 'stadpc',
          name: 'Stadium Safety & Crowd Management (PC)',
          kind: 'Desktop Simulation',
          blurb: 'Enterprise venue management and crowd egress inspection simulation. Shipped as a desktop PC release built from the identical codebase as its VR counterpart.',
          note: 'Shares 95% of underlying simulation logic with a NavMesh third-person avatar rig replacing VR head-tracking.',
          teardown: [
            "Forking codebases to support PC and VR leads to duplicate bug fixes and synchronization nightmares. I kept one project and drew a strict architectural line between the Simulation Rule Layer and the Interaction Rig Layer.",
            "The training logic only queries an IInteractionRig interface ('UserInspectedObject', 'TriggerEgressAlarm'). Whether the trigger originated from an Oculus controller grab or an avatar raycast keypress is completely decoupled."
          ],
          tags: ['Unity', 'NavMesh Crowd AI', 'Dual-Target Rig', 'Shared Codebase']
        },
        {
          clip: 'emory',
          name: 'Emory Cole: Echoes of the Manor',
          kind: 'First-Person Mystery Adventure',
          blurb: 'Atmospheric first-person mystery puzzle game set in a historic manor. Players inspect tactile 3D curios, manipulate physical mechanical locks such as a wooden sliding block mechanism, and uncover family secrets through spatial environmental storytelling.',
          note: 'Lighting, realistic object shaders, and room-by-room discovery carry the narrative without invasive 2D cutscenes.',
          teardown: [
            "Physical puzzles require physical feedback. The sliding block lock operates with real physics constraints and audio clicks that reflect whether a slide is blocked or engaged.",
            "Engineered an item inspection viewer that smoothly decouples selected inventory items, centers them in a cinematic camera viewport, and allows 360-degree rotation with mouse drag."
          ],
          tags: ['Unity', 'PC', 'Inventory System', 'Puzzle Design', 'Atmospheric Lighting']
        },
        {
          clip: 'tele',
          name: 'Teleporto: Cosmic Grid Puzzler',
          kind: 'Puzzle Game',
          blurb: 'Grid-based cosmic puzzle game with move-counting constraints, teleport portals, undo/redo state stacks, and built-in level-testing tools.',
          note: 'PC release featuring full controller remapping, V-Sync, graphics presets, and Steam wishlist flow.',
          teardown: [
            "Teleporto rules fit in a single sentence: clear all asteroids within move limits. All the game's depth lives in level design.",
            "The first tool I built was an in-editor level playground with hotkey undo/redo and branching move replay so our level designers could iterate on board difficulty within seconds."
          ],
          tags: ['Puzzle Mechanics', 'Undo/Redo Stack', 'Steam Release', 'Level Design']
        },
        {
          clip: 'drive',
          name: 'Vanguard: Tactical Ops & Combat AI Engine',
          kind: 'Gameplay Systems Engine',
          blurb: 'Dynamic first-person and third-person weapon handling mechanics featuring procedurally calculated recoil patterns, ballistics projectile simulation, and hierarchical state-machine enemy combatants.',
          note: 'Procedural weapon sway, realistic spread bloom, and modular enemy AI squad tactics.',
          tags: ['Combat AI', 'Ballistics Physics', 'FSM', 'Weapon Handling']
        },
        {
          clip: 'stadpc',
          name: 'Apex Procedural Dungeon Engine',
          kind: 'Procedural Generation Engine',
          blurb: 'Deterministic procedural dungeon and arena generation engine built with Binary Space Partitioning (BSP) trees, room template stamping, and dynamic NavMesh obstacle stitching.',
          note: 'Generates balanced combat levels with seed replication for competitive multiplayer runs.',
          tags: ['Procedural Generation', 'BSP Trees', 'Algorithms', 'NavMesh']
        },
        {
          clip: 'tele',
          name: 'Chrono Shift: Time-Dilation Mechanics',
          kind: 'Physics Puzzle Platformer',
          blurb: 'Experimental puzzle platformer exploring temporal rewind buffers, object trajectory cloning, and interactive physics time dilation.',
          note: 'Built using circular memory buffers recording position, velocity, and angular momentum every fixed tick.',
          tags: ['Physics Simulation', 'Time Manipulation', 'State Serialization']
        },
        {
          clip: 'emory',
          name: '3D Environment Lighting & Graphics Showcase',
          kind: 'Graphics & Optimization',
          blurb: 'PBR material authoring, baked global illumination, custom HLSL volumetric fog shaders, and sub-16ms frametime optimization for dense PC environments.',
          note: 'Profiling with Unity Frame Debugger and RenderDoc to minimize draw calls and fill rate overdraw.',
          tags: ['Graphics Programming', 'HLSL', 'PBR Shaders', 'Profiling']
        }
      ]
    },

    phone: {
      label: 'Mobile · Multiplayer & Web3',
      platform: 'iOS · Android · Multiplayer Systems',
      projects: [
        {
          clip: 'domino',
          name: 'YungAlgo Web3 Multiplayer Suite',
          kind: 'Massive Multiplayer Gaming',
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
          clip: 'domino',
          name: 'Cuban Domino Online',
          kind: 'Turn-Based Multiplayer',
          orient: 'land',
          blurb: 'Four-player online competitive dominoes in two-person teams. Built on Photon Fusion with strict authoritative server logic, turn countdown timers, and scored round summaries.',
          note: 'Zero-trust client architecture: every tile placement is validated centrally before the move is broadcasted to the table.',
          teardown: [
            "Turn-based games look easy until you test on weak cellular connections. If two players disagree on whose turn it is, the match collapses.",
            "I built Cuban Domino with one iron rule: mobile clients never decide anything. When a player plays a tile, the authoritative host verifies turn ownership and valid matching ends before broadcasting the move."
          ],
          tags: ['Photon Fusion', 'Authoritative Netcode', 'Latency Testing', 'Mobile']
        },
        {
          clip: 'earth',
          name: 'Earth Match: Bakery Decorator',
          kind: 'Match-3 & Meta Loop',
          orient: 'port',
          blurb: 'Bakery-themed match-3 puzzle game featuring move-limited levels, obstacle ingredients, a shop renovation meta loop, and daily reward bonus spins.',
          note: 'Portrait-first layout engineered for ergonomic one-handed mobile play.',
          tags: ['Mobile Gaming', 'Match-3 Algorithm', 'Live-Ops', 'Casual Meta']
        },
        {
          clip: 'earth',
          name: 'ZVKY Casino Slot Game Engine',
          kind: 'Casino & Mobile Mechanics',
          orient: 'port',
          blurb: 'High-performance slot machine game engine built at ZVKY Design Studio. Features customizable paylines, cascade reel physics, bonus mini-games, and 60 FPS mobile particle effects.',
          note: 'Mathematical paytable parser coupled with dynamic sprite sheet batching for fast load times on low-end smartphones.',
          tags: ['Mobile Casino', 'Slot Math Engine', 'High FPS', 'ZVKY Studio']
        },
        {
          clip: 'domino',
          name: 'Mobile AR Surface Placement',
          kind: 'AR Foundation',
          orient: 'land',
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
        '<li><b>The first minute defines success:</b> Let the trainee look around their virtual hands and succeed at one natural physical interaction (picking up a tool or pressing a button) before throwing procedures at them.</li>' +
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
    '<p>I am <strong>Deepankar Sehgal</strong>, a Senior Unity & XR Developer based in <strong>Bengaluru, India</strong> with <strong>5+ years of hands-on experience</strong> engineering high-performance games, enterprise AR/VR simulations, and scalable multiplayer systems.</p>' +
    '<p>Throughout my career, I have shipped <strong>25+ games</strong> across PC, Mobile, and XR. Key career milestones include developing industrial VR training for <strong>Simulanis</strong> on Meta Quest headsets, shipping commercial AA tactical title <strong>Crimson Tactics: The White Banner</strong> on Steam PC with Black March Studios, and scaling multiplayer Web3 titles to <strong>5,000,000+ players</strong> with YungAlgo. Currently, I work on casino slot game engines at <strong>ZVKY Design Studio</strong>.</p>' +
    '<div class="timeline">' +
    '<div class="timeline-item"><h4>ZVKY Design Studio</h4><div class="timeline-role">Game Developer · Casino & Slot Engines</div><div class="timeline-date">Nov 2025 – Present · Bengaluru, India</div><p>Developing high-performance casino slot games, paytable mechanics, dynamic reel mathematics, and 60 FPS mobile particle effects.</p></div>' +
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
    '<div class="contact-item"><i class="fa-solid fa-location-dot"></i> Bengaluru, India · UTC+5:30</div>' +
    '</div>' +
    '<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;">' +
    '<a class="linkbtn" href="https://www.linkedin.com/in/deepankar-sehgal/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i> LinkedIn Profile ↗</a>' +
    '<a class="linkbtn" href="assets/Deepankar_UnityDeveloper_CV.pdf" target="_blank" rel="noopener noreferrer" style="background:#0284c7;"><i class="fa-solid fa-download"></i> Download CV (PDF)</a>' +
    '</div>' +
    '</div>';

  /* ==========================================================================
     THREE.JS RENDERER & HIGH-FIDELITY SETUP
     ========================================================================== */

  var stage = document.getElementById('stage');
  var renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  stage.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.05, 5000);

  function srgb(hex) {
    return new THREE.Color(hex).convertSRGBToLinear();
  }

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
      bevelSegments: seg || 6,
      curveSegments: 12
    });
    g.translate(0, 0, -(d / 2 - bev));
    g.computeVertexNormals();
    return g;
  }

  /* Procedural Textures */
  function createWoodTexture() {
    var c = document.createElement('canvas');
    c.width = 1024; c.height = 512;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#f3e5d3';
    ctx.fillRect(0, 0, 1024, 512);
    for (var i = 0; i < 600; i++) {
      ctx.fillStyle = 'rgba(' + (180 + Math.random() * 40 | 0) + ',' + (150 + Math.random() * 30 | 0) + ',' + (120 + Math.random() * 20 | 0) + ',0.14)';
      var y = Math.random() * 512;
      var h = 1 + Math.random() * 4;
      ctx.fillRect(0, y, 1024, h);
    }
    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 1);
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  function createParquetTexture() {
    var c = document.createElement('canvas');
    c.width = 512; c.height = 512;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#e8d9c7';
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#baa793';
    for (var x = 0; x < 512; x += 64) ctx.fillRect(x, 0, 2, 512);
    for (var y = 0; y < 512; y += 128) ctx.fillRect(0, y, 512, 2);
    for (var j = 0; j < 300; j++) {
      ctx.fillStyle = 'rgba(160,140,120,0.1)';
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 40, 2);
    }
    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 6);
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  var woodTex = createWoodTexture();
  var parquetTex = createParquetTexture();

  /* ==========================================================================
     LIGHTING RIG (SUN, HEMISPHERE, TASK SPOTLIGHT & VOLUMETRIC BEAMS)
     ========================================================================== */

  var hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x334155, 0.75);
  scene.add(hemiLight);

  var sunLight = new THREE.DirectionalLight(0xfff8ee, 5.4);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 40;
  sunLight.shadow.camera.left = -4.5;
  sunLight.shadow.camera.right = 4.5;
  sunLight.shadow.camera.top = 4.5;
  sunLight.shadow.camera.bottom = -4.5;
  sunLight.shadow.bias = -0.0003;
  sunLight.shadow.normalBias = 0.025;
  scene.add(sunLight);

  var sunTarget = new THREE.Object3D();
  sunTarget.position.set(0.1, 0.85, 0);
  scene.add(sunTarget);
  sunLight.target = sunTarget;

  /* Articulated Desk Task Lamp */
  var deskSpot = new THREE.SpotLight(0xffeedb, 10.5, 3.5, 0.82, 0.65, 2);
  deskSpot.position.set(-0.72, 1.28, -0.05);
  deskSpot.target.position.set(-0.35, 0.75, 0.12);
  deskSpot.castShadow = true;
  scene.add(deskSpot);
  scene.add(deskSpot.target);

  var monGlow = new THREE.PointLight(0x38bdf8, 0.8, 1.8, 2);
  monGlow.position.set(0.35, 1.05, 0.04);
  scene.add(monGlow);

  var roomCeilLight = new THREE.PointLight(0xfff1e6, 0.6, 9.0, 2);
  roomCeilLight.position.set(0, 2.7, 1.0);
  scene.add(roomCeilLight);

  /* Beach Tiki Torches Point Lights (Active at Night) */
  var tikiLights = [];
  function addTikiTorchLight(x, y, z) {
    var pLight = new THREE.PointLight(0xff8833, 0, 25, 2);
    pLight.position.set(x, y, z);
    scene.add(pLight);
    tikiLights.push(pLight);
  }

  /* ==========================================================================
     STUDIO INTERIOR ARCHITECTURE
     ========================================================================== */

  var ROOM = { l: -2.0, r: 2.2, f: 3.4, h: 2.9 };
  var WALL_Z = -0.48;
  var DESK_Y = 0.75;

  var wallMat = new THREE.MeshStandardMaterial({ color: srgb(0xf2f5f1), roughness: 0.85, metalness: 0.02 });

  var floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM.r - ROOM.l, ROOM.f - WALL_Z),
    new THREE.MeshStandardMaterial({ map: parquetTex, roughness: 0.35, metalness: 0.05 })
  );
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set((ROOM.l + ROOM.r) / 2, 0, (WALL_Z + ROOM.f) / 2);
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  var skirtingMat = new THREE.MeshStandardMaterial({ color: srgb(0xe0e6df), roughness: 0.6 });
  var skirting = new THREE.Mesh(new THREE.BoxGeometry(ROOM.r - ROOM.l, 0.08, 0.02), skirtingMat);
  skirting.position.set((ROOM.l + ROOM.r) / 2, 0.04, WALL_Z + 0.01);
  scene.add(skirting);

  var ceilMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM.r - ROOM.l, ROOM.f - WALL_Z),
    new THREE.MeshStandardMaterial({ color: srgb(0xfafbfa), roughness: 0.95 })
  );
  ceilMesh.rotation.x = Math.PI / 2;
  ceilMesh.position.set((ROOM.l + ROOM.r) / 2, ROOM.h, (WALL_Z + ROOM.f) / 2);
  scene.add(ceilMesh);

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

  /* Panoramic Picture Window */
  var WIN = { x0: -1.5, x1: 2.0, y0: 0.76, y1: 2.75 };
  var backWallGroup = new THREE.Group();
  backWallGroup.position.set(0, 0, WALL_Z);
  scene.add(backWallGroup);

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

  var winFrameMat = new THREE.MeshStandardMaterial({ color: srgb(0x202422), roughness: 0.32, metalness: 0.75 });
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

  addFrameBar(winW + 0.08, 0.05, 0.16, winCenter.x, WIN.y1 + 0.025, -0.04);
  addFrameBar(winW + 0.1, 0.065, 0.22, winCenter.x, WIN.y0 - 0.03, -0.04);
  addFrameBar(0.05, winH + 0.05, 0.16, WIN.x0 - 0.025, winCenter.y, -0.04);
  addFrameBar(0.05, winH + 0.05, 0.16, WIN.x1 + 0.025, winCenter.y, -0.04);
  addFrameBar(0.035, winH, 0.09, WIN.x0 + winW * 0.333, winCenter.y, -0.04);
  addFrameBar(0.035, winH, 0.09, WIN.x0 + winW * 0.666, winCenter.y, -0.04);

  var glassMat = new THREE.MeshStandardMaterial({
    color: 0xdff0f7,
    transparent: true,
    opacity: 0.06,
    roughness: 0.02,
    metalness: 0.08,
    depthWrite: false
  });
  var glassMesh = new THREE.Mesh(new THREE.PlaneGeometry(winW, winH), glassMat);
  glassMesh.position.set(winCenter.x, winCenter.y, -0.04);
  backWallGroup.add(glassMesh);

  /* ==========================================================================
     BENGALURU SKY DOME & ATMOSPHERIC LIGHTING
     ========================================================================== */

  var skyUniforms = {
    topColor: { value: new THREE.Color(0x38bdf8) },
    bottomColor: { value: new THREE.Color(0xdbeafe) },
    sunDir: { value: new THREE.Vector3(0.1, 0.55, -1).normalize() },
    sunColor: { value: new THREE.Color(0xfff7ed) },
    sunIntensity: { value: 1.0 }
  };

  var skyGeo = new THREE.SphereGeometry(2800, 32, 16);
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
      '  float sunGlow = pow(sunCos, 3.5) * 0.4 + pow(sunCos, 120.0) * 0.95;',
      '  sky += sunColor * sunGlow * sunIntensity;',
      '  gl_FragColor = vec4(sky, 1.0);',
      '}'
    ].join('\n')
  });
  var skyMesh = new THREE.Mesh(skyGeo, skyMat);
  scene.add(skyMesh);

  /* ==========================================================================
     RUNNING BENGALURU TRAFFIC, ELEVATED FLYOVER, NAMMA METRO & TECH CITY SKYLINE
     ========================================================================== */

  var bengaluruGroup = new THREE.Group();
  scene.add(bengaluruGroup);

  var trafficVehicles = [];
  var cityBeacons = [];
  var cityStreetLights = [];
  var cityNightMats = [];

  // Ground base terrain (Bengaluru Deccan plateau greenery & soil)
  var groundMat = new THREE.MeshStandardMaterial({
    color: srgb(0x2a3e26),
    roughness: 0.95,
    metalness: 0.02
  });
  var groundMesh = new THREE.Mesh(new THREE.PlaneGeometry(600, 300), groundMat);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.set(0, -5.1, -140);
  groundMesh.receiveShadow = true;
  bengaluruGroup.add(groundMesh);

  // Ground Arterial Highway (Hosur Road / Outer Ring Road 6-Lane Corridor)
  var roadMat = new THREE.MeshStandardMaterial({
    color: srgb(0x1e2429),
    roughness: 0.88,
    metalness: 0.1
  });
  var roadMesh = new THREE.Mesh(new THREE.PlaneGeometry(450, 18), roadMat);
  roadMesh.rotation.x = -Math.PI / 2;
  roadMesh.position.set(0, -5.02, -22);
  roadMesh.receiveShadow = true;
  bengaluruGroup.add(roadMesh);

  // Central Green Divider Median with Curbs
  var curbMat = new THREE.MeshStandardMaterial({ color: srgb(0x94a3b8), roughness: 0.7 });
  var medianCurb = new THREE.Mesh(new THREE.BoxGeometry(450, 0.22, 1.4), curbMat);
  medianCurb.position.set(0, -4.95, -22);
  bengaluruGroup.add(medianCurb);

  // Tropical flowering bougainvillea & roadside shrubbery on median
  var shrubMat1 = new THREE.MeshStandardMaterial({ color: srgb(0x1e3a1f), roughness: 0.9 });
  var shrubMat2 = new THREE.MeshStandardMaterial({ color: srgb(0xbe185d), roughness: 0.85 }); // Flowering pink bougainvillea
  for (var sb = -120; sb <= 120; sb += 9) {
    var shrub = new THREE.Mesh(new THREE.SphereGeometry(0.55 + Math.random() * 0.25, 8, 8), (sb % 18 === 0) ? shrubMat2 : shrubMat1);
    shrub.scale.set(1.4, 0.7, 0.9);
    shrub.position.set(sb + (Math.random() - 0.5) * 2, -4.8, -22);
    bengaluruGroup.add(shrub);
  }

  // Dashed White Lane Markings
  var laneLineMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
  [-26, -24, -20, -18].forEach(function (lz) {
    for (var lx = -140; lx < 140; lx += 8) {
      var dash = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 0.18), laneLineMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(lx, -5.0, lz);
      bengaluruGroup.add(dash);
    }
  });

  /* Procedural Lit Office Windows Texture for Bengaluru Tech Parks */
  function createTechParkWindowTexture() {
    var c = document.createElement('canvas');
    c.width = 512; c.height = 512;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 512);

    for (var wy = 8; wy < 512; wy += 20) {
      for (var wx = 6; wx < 512; wx += 16) {
        var isLit = Math.random() > 0.35;
        if (isLit) {
          var warm = Math.random() > 0.4;
          ctx.fillStyle = warm ? '#fef08a' : '#7dd3fc';
          ctx.fillRect(wx, wy, 10, 13);
        } else {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(wx, wy, 10, 13);
        }
      }
    }
    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 8);
    return tex;
  }
  var techWindowTex = createTechParkWindowTexture();

  /* Bengaluru Tech Skyline (Prestige, Manyata, Electronic City IT Parks) */
  var bldgMat = new THREE.MeshStandardMaterial({
    color: srgb(0x1e293b),
    roughness: 0.4,
    metalness: 0.6,
    map: techWindowTex,
    emissiveMap: techWindowTex,
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0.0
  });
  cityNightMats.push(bldgMat);

  var beaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  function addTechBuilding(x, z, w, h, d) {
    var bGroup = new THREE.Group();
    bGroup.position.set(x, -5.0 + h / 2, z);
    bengaluruGroup.add(bGroup);

    var mainB = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bldgMat);
    bGroup.add(mainB);

    // Rooftop utility penthouse & communication mast
    var topH = Math.min(4, h * 0.08);
    var topBox = new THREE.Mesh(new THREE.BoxGeometry(w * 0.5, topH, d * 0.5), curbMat);
    topBox.position.y = h / 2 + topH / 2;
    bGroup.add(topBox);

    var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 10, 8), curbMat);
    mast.position.y = h / 2 + topH + 5;
    bGroup.add(mast);

    var beacon = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 8), beaconMat);
    beacon.position.y = h / 2 + topH + 10;
    bGroup.add(beacon);
    cityBeacons.push(beacon);
  }

  // Skyline towers across backdrop
  addTechBuilding(-125, -160, 36, 75, 34);
  addTechBuilding(-85, -145, 28, 62, 28);
  addTechBuilding(-52, -180, 42, 95, 38);
  addTechBuilding(-20, -150, 32, 68, 30);
  addTechBuilding(16, -170, 40, 88, 36);
  addTechBuilding(58, -145, 30, 72, 32);
  addTechBuilding(92, -165, 38, 82, 34);
  addTechBuilding(130, -150, 34, 65, 30);

  /* Elevated Expressway / Flyover (Electronic City / Hebbal Elevated Highway) */
  var flyoverGroup = new THREE.Group();
  flyoverGroup.position.set(0, 1.85, -34);
  bengaluruGroup.add(flyoverGroup);

  // Highway Deck
  var flyDeckMat = new THREE.MeshStandardMaterial({ color: srgb(0x334155), roughness: 0.8, metalness: 0.15 });
  var flyDeck = new THREE.Mesh(new THREE.BoxGeometry(450, 0.55, 10.5), flyDeckMat);
  flyoverGroup.add(flyDeck);

  // Parapet Crash Barriers
  var barrierMat = new THREE.MeshStandardMaterial({ color: srgb(0x64748b), roughness: 0.6 });
  var barNorth = new THREE.Mesh(new THREE.BoxGeometry(450, 0.95, 0.35), barrierMat);
  barNorth.position.set(0, 0.55, -5.1);
  flyoverGroup.add(barNorth);

  var barSouth = new THREE.Mesh(new THREE.BoxGeometry(450, 0.95, 0.35), barrierMat);
  barSouth.position.set(0, 0.55, 5.1);
  flyoverGroup.add(barSouth);

  var barMedian = new THREE.Mesh(new THREE.BoxGeometry(450, 0.7, 0.3), barrierMat);
  barMedian.position.set(0, 0.45, 0);
  flyoverGroup.add(barMedian);

  // Solid Concrete Support Pillars down to ground level
  var pillarMat = new THREE.MeshStandardMaterial({ color: srgb(0x475569), roughness: 0.85 });
  for (var px = -135; px <= 135; px += 30) {
    var pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 6.9, 16), pillarMat);
    pillar.position.set(px, -3.4, 0);
    flyoverGroup.add(pillar);

    // Cross beam cap
    var cap = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 9.8), pillarMat);
    cap.position.set(px, -0.4, 0);
    flyoverGroup.add(cap);
  }

  // Dual-Head Elevated Highway Streetlights on Flyover Median
  var flyPoleMat = new THREE.MeshStandardMaterial({ color: srgb(0x1e293b), roughness: 0.4, metalness: 0.8 });
  var streetLightBulbMat = new THREE.MeshBasicMaterial({ color: 0xfff3c4 });

  for (var sx = -120; sx <= 120; sx += 32) {
    var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 3.8, 10), flyPoleMat);
    pole.position.set(sx, 2.0, 0);
    flyoverGroup.add(pole);

    // Twin curved arms
    [-2.2, 2.2].forEach(function (oz) {
      var arm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.4, 8), flyPoleMat);
      arm.rotation.x = oz > 0 ? 0.7 : -0.7;
      arm.position.set(sx, 3.6, oz * 0.4);
      flyoverGroup.add(arm);

      var lampHead = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.7), flyPoleMat);
      lampHead.position.set(sx, 4.3, oz);
      flyoverGroup.add(lampHead);

      var bulb = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.6), streetLightBulbMat);
      bulb.rotation.x = Math.PI / 2;
      bulb.position.set(sx, 4.22, oz);
      flyoverGroup.add(bulb);
    });

    if (Math.abs(sx) <= 60) {
      var sLight = new THREE.PointLight(0xffedd5, 0, 18, 2);
      sLight.position.set(sx, 4.2, 0);
      flyoverGroup.add(sLight);
      cityStreetLights.push(sLight);
    }
  }

  // Highway Overhead Sign Gantry ("ELECTRONIC CITY FLYOVER ↗")
  var gantryGroup = new THREE.Group();
  gantryGroup.position.set(8, 0.3, 0);
  flyoverGroup.add(gantryGroup);

  var gTrussMat = new THREE.MeshStandardMaterial({ color: srgb(0x38413b), roughness: 0.5, metalness: 0.7 });
  var postL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4.2, 8), gTrussMat);
  postL.position.set(0, 2.2, -4.8);
  gantryGroup.add(postL);

  var postR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4.2, 8), gTrussMat);
  postR.position.set(0, 2.2, 4.8);
  gantryGroup.add(postR);

  var crossTruss = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 9.8), gTrussMat);
  crossTruss.position.set(0, 4.2, 0);
  gantryGroup.add(crossTruss);

  var signCanvas = document.createElement('canvas');
  signCanvas.width = 512; signCanvas.height = 128;
  var sCtx = signCanvas.getContext('2d');
  sCtx.fillStyle = '#15803d'; // Indian Highway Green
  sCtx.fillRect(0, 0, 512, 128);
  sCtx.strokeStyle = '#ffffff';
  sCtx.lineWidth = 6;
  sCtx.strokeRect(8, 8, 496, 112);
  sCtx.fillStyle = '#ffffff';
  sCtx.font = 'bold 36px "Figtree", sans-serif';
  sCtx.textAlign = 'center';
  sCtx.fillText('ELECTRONIC CITY FLYOVER ↗', 256, 56);
  sCtx.font = '600 24px "JetBrains Mono", monospace';
  sCtx.fillText('BENGALURU TECH CORRIDOR', 256, 96);
  var signTex = new THREE.CanvasTexture(signCanvas);

  var signMesh = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 1.6), new THREE.MeshBasicMaterial({ map: signTex }));
  signMesh.rotation.y = -Math.PI / 2;
  signMesh.position.set(-0.15, 3.8, 0);
  gantryGroup.add(signMesh);

  /* Elevated Namma Metro Viaduct & 6-Car Purple/Green Line Train */
  var metroViaductGroup = new THREE.Group();
  metroViaductGroup.position.set(0, 4.7, -56);
  bengaluruGroup.add(metroViaductGroup);

  var viaductDeck = new THREE.Mesh(new THREE.BoxGeometry(450, 0.65, 5.2), flyDeckMat);
  metroViaductGroup.add(viaductDeck);

  var mBarrier1 = new THREE.Mesh(new THREE.BoxGeometry(450, 0.8, 0.25), barrierMat);
  mBarrier1.position.set(0, 0.5, -2.5);
  metroViaductGroup.add(mBarrier1);

  var mBarrier2 = new THREE.Mesh(new THREE.BoxGeometry(450, 0.8, 0.25), barrierMat);
  mBarrier2.position.set(0, 0.5, 2.5);
  metroViaductGroup.add(mBarrier2);

  // Viaduct concrete tall columns
  for (var mx = -130; mx <= 130; mx += 36) {
    var mCol = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.05, 9.8, 16), pillarMat);
    mCol.position.set(mx, -5.0, 0);
    metroViaductGroup.add(mCol);
  }

  // The 6-Car Stainless Steel Namma Metro Train
  var metroTrain = new THREE.Group();
  metroTrain.position.set(-40, 0.8, 0);
  metroViaductGroup.add(metroTrain);

  var trainSteelMat = new THREE.MeshStandardMaterial({
    color: srgb(0xd1d5db),
    roughness: 0.28,
    metalness: 0.85
  });
  var metroStripeMat = new THREE.MeshBasicMaterial({ color: 0x7e22ce }); // Namma Metro Purple Livery
  var metroGreenStripe = new THREE.MeshBasicMaterial({ color: 0x16a34a }); // Namma Metro Green Livery
  var trainWindowMat = new THREE.MeshBasicMaterial({ color: 0xfef08a }); // Lit interior warm passenger glow
  var trainHeadlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  function createMetroCoach(cx, isFrontCab) {
    var cGroup = new THREE.Group();
    cGroup.position.x = cx;
    metroTrain.add(cGroup);

    // Coach Body
    var coachBody = new THREE.Mesh(roundedBox(8.2, 2.3, 2.8, 0.15, 3), trainSteelMat);
    coachBody.position.y = 0.85;
    cGroup.add(coachBody);

    // Iconic Purple & Green horizontal livery cheatlines
    var purpleStripe = new THREE.Mesh(new THREE.BoxGeometry(8.25, 0.22, 2.85), metroStripeMat);
    purpleStripe.position.y = 0.45;
    cGroup.add(purpleStripe);

    var greenStripe = new THREE.Mesh(new THREE.BoxGeometry(8.25, 0.15, 2.85), metroGreenStripe);
    greenStripe.position.y = 0.22;
    cGroup.add(greenStripe);

    // Continuous passenger panoramic window band
    var winBand = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.7, 2.88), trainWindowMat);
    winBand.position.y = 1.15;
    cGroup.add(winBand);

    // Front aerodynamic cab nose & headlights if front car
    if (isFrontCab) {
      var nose = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.8, 8), trainSteelMat);
      nose.rotation.z = -Math.PI / 2;
      nose.position.set(4.8, 0.85, 0);
      cGroup.add(nose);

      [-0.8, 0.8].forEach(function (wz) {
        var hLight = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), trainHeadlightMat);
        hLight.position.set(5.1, 0.65, wz);
        cGroup.add(hLight);
      });
    }

    // Undercarriage Bogies / Wheels
    [-2.6, 2.6].forEach(function (bx) {
      var bogie = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.4, 2.4), curbMat);
      bogie.position.set(bx, -0.15, 0);
      cGroup.add(bogie);
    });
  }

  for (var tc = 0; tc < 6; tc++) {
    createMetroCoach(tc * 8.6, tc === 5);
  }

  /* ==========================================================================
     RUNNING TRAFFIC VEHICLES FACTORY & INSTANCES
     ========================================================================== */

  var carHeadlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var carTaillightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  /* 1. Iconic Bengaluru Auto-Rickshaw (Bajaj RE 3-Wheeler) */
  function createAutoRickshaw(x, z, dir, speed) {
    var auto = new THREE.Group();
    auto.position.set(x, -4.95, z);
    bengaluruGroup.add(auto);

    // Dark green lower passenger chassis
    var autoGreenMat = new THREE.MeshStandardMaterial({ color: srgb(0x15803d), roughness: 0.45 });
    var body = new THREE.Mesh(roundedBox(1.9, 0.95, 1.3, 0.08, 3), autoGreenMat);
    body.position.y = 0.55;
    auto.add(body);

    // Canary yellow curved canopy roof
    var autoYellowMat = new THREE.MeshStandardMaterial({ color: srgb(0xfacc15), roughness: 0.35 });
    var roof = new THREE.Mesh(roundedBox(2.0, 0.65, 1.35, 0.12, 3), autoYellowMat);
    roof.position.y = 1.32;
    auto.add(roof);

    // Open side entry cutout
    var cutMat = new THREE.MeshStandardMaterial({ color: srgb(0x18181b), roughness: 0.9 });
    var cutout = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.75, 1.38), cutMat);
    cutout.position.set(0.1, 0.95, 0);
    auto.add(cutout);

    // 3 Wheels (1 front, 2 rear)
    var wheelMat = new THREE.MeshStandardMaterial({ color: srgb(0x18181b), roughness: 0.8 });
    var wF = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.18, 12), wheelMat);
    wF.rotation.x = Math.PI / 2;
    wF.position.set(dir > 0 ? 0.85 : -0.85, 0.24, 0);
    auto.add(wF);

    [-0.58, 0.58].forEach(function (wz) {
      var wR = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.18, 12), wheelMat);
      wR.rotation.x = Math.PI / 2;
      wR.position.set(dir > 0 ? -0.7 : 0.7, 0.24, wz);
      auto.add(wR);
    });

    // Circular single front headlight & rear taillights
    var fHeadlight = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), carHeadlightMat);
    fHeadlight.position.set(dir > 0 ? 1.02 : -1.02, 0.72, 0);
    auto.add(fHeadlight);

    [-0.45, 0.45].forEach(function (tz) {
      var rTail = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), carTaillightMat);
      rTail.position.set(dir > 0 ? -1.0 : 1.0, 0.65, tz);
      auto.add(rTail);
    });

    trafficVehicles.push({ mesh: auto, speed: speed, dir: dir, minX: -115, maxX: 115, y: -4.95, z: z });
    return auto;
  }

  /* 2. Iconic BMTC (Bengaluru Metropolitan Transport Corp) City Bus */
  function createBMTCBus(x, z, dir, speed, isVolvoVajra) {
    var bus = new THREE.Group();
    bus.position.set(x, -4.95, z);
    bengaluruGroup.add(bus);

    var busMat = new THREE.MeshStandardMaterial({
      color: isVolvoVajra ? srgb(0x0284c7) : srgb(0x1d4ed8), // Turquoise Volvo or Classic BMTC Blue
      roughness: 0.35,
      metalness: 0.3
    });

    // Lower chassis
    var busBody = new THREE.Mesh(roundedBox(8.4, 2.2, 2.6, 0.14, 3), busMat);
    busBody.position.y = 1.35;
    bus.add(busBody);

    // Cream white roof and upper band for classic BMTC
    var busRoofMat = new THREE.MeshStandardMaterial({ color: isVolvoVajra ? srgb(0x0369a1) : srgb(0xf8fafc), roughness: 0.5 });
    var busRoof = new THREE.Mesh(roundedBox(8.4, 0.6, 2.6, 0.12, 3), busRoofMat);
    busRoof.position.y = 2.65;
    bus.add(busRoof);

    // Tinted window strip
    var busWinMat = new THREE.MeshStandardMaterial({ color: srgb(0x0f172a), roughness: 0.1, metalness: 0.8 });
    var busWindows = new THREE.Mesh(new THREE.BoxGeometry(8.1, 0.85, 2.66), busWinMat);
    busWindows.position.y = 1.95;
    bus.add(busWindows);

    // Illuminated Amber Destination LED Board ("335E · MAJESTIC" / "365 · ELECTRONIC CITY")
    var routeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    var destBoard = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.35), routeMat);
    destBoard.rotation.y = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
    destBoard.position.set(dir > 0 ? 4.22 : -4.22, 2.6, 0);
    bus.add(destBoard);

    // Front headlights and taillights
    [-0.85, 0.85].forEach(function (wz) {
      var hl = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), carHeadlightMat);
      hl.position.set(dir > 0 ? 4.23 : -4.23, 0.75, wz);
      bus.add(hl);

      var tl = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), carTaillightMat);
      tl.position.set(dir > 0 ? -4.23 : 4.23, 0.85, wz);
      bus.add(tl);
    });

    trafficVehicles.push({ mesh: bus, speed: speed, dir: dir, minX: -125, maxX: 125, y: -4.95, z: z });
    return bus;
  }

  /* 3. Modern Passenger Cars, SUVs & Airport Taxis */
  function createCar(x, y, z, dir, speed, colorHex, isFlyover) {
    var car = new THREE.Group();
    car.position.set(x, y, z);
    bengaluruGroup.add(car);

    var carMat = new THREE.MeshStandardMaterial({ color: srgb(colorHex), roughness: 0.3, metalness: 0.5 });
    var body = new THREE.Mesh(roundedBox(3.8, 0.8, 1.7, 0.1, 3), carMat);
    body.position.y = 0.52;
    car.add(body);

    var cabinMat = new THREE.MeshStandardMaterial({ color: srgb(0x090d12), roughness: 0.1, metalness: 0.85 });
    var cabin = new THREE.Mesh(roundedBox(2.1, 0.65, 1.5, 0.12, 3), cabinMat);
    cabin.position.set(dir > 0 ? -0.2 : 0.2, 1.15, 0);
    car.add(cabin);

    // Front headlights and taillights
    [-0.6, 0.6].forEach(function (wz) {
      var hl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), carHeadlightMat);
      hl.position.set(dir > 0 ? 1.92 : -1.92, 0.55, wz);
      car.add(hl);

      var tl = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), carTaillightMat);
      tl.position.set(dir > 0 ? -1.92 : 1.92, 0.6, wz);
      car.add(tl);
    });

    trafficVehicles.push({ mesh: car, speed: speed, dir: dir, minX: -115, maxX: 115, y: y, z: z });
    return car;
  }

  /* Populate Bengaluru Traffic Stream */
  // Ground Level Auto-Rickshaws
  createAutoRickshaw(-60, -25.5, 1, 14.5);
  createAutoRickshaw(-15, -25.8, 1, 15.0);
  createAutoRickshaw(35, -25.2, 1, 14.2);
  createAutoRickshaw(75, -25.6, 1, 15.5);

  createAutoRickshaw(55, -18.2, -1, 14.8);
  createAutoRickshaw(10, -18.6, -1, 15.2);
  createAutoRickshaw(-35, -18.3, -1, 14.5);
  createAutoRickshaw(-80, -18.7, -1, 15.0);

  // Ground Level BMTC Buses
  createBMTCBus(-45, -24.0, 1, 12.0, false); // Classic BMTC Blue Bus
  createBMTCBus(40, -19.8, -1, 13.0, true);  // Volvo Vajra AC Bus

  // Ground Level Private Cabs & Cars
  createCar(-85, -4.95, -25.0, 1, 18.0, 0xf8fafc, false); // White Airport Cab
  createCar(0, -4.95, -24.5, 1, 19.5, 0xef4444, false);   // Red Hatchback
  createCar(60, -4.95, -24.2, 1, 17.5, 0x94a3b8, false);  // Silver Sedan
  createCar(85, -4.95, -19.2, -1, 19.0, 0xf8fafc, false); // White Cab
  createCar(-10, -4.95, -18.8, -1, 18.2, 0x1e3a8a, false); // Navy Blue Sedan

  // Flyover Expressway Traffic (Elevated y = 2.15, z = -34)
  createCar(-70, 2.15, -36.5, 1, 23.0, 0xffffff, true); // Fast White SUV
  createCar(-25, 2.15, -36.8, 1, 25.0, 0x334155, true); // Charcoal Luxury Sedan
  createCar(20, 2.15, -36.2, 1, 22.5, 0xd97706, true);  // Amber Metallic SUV
  createCar(65, 2.15, -36.6, 1, 24.0, 0x94a3b8, true);  // Silver Sedan

  createCar(75, 2.15, -31.5, -1, 23.5, 0xffffff, true); // White Sedan
  createCar(30, 2.15, -31.8, -1, 26.0, 0xb91c1c, true); // Crimson Sedan
  createCar(-15, 2.15, -31.2, -1, 22.0, 0x1e293b, true); // Obsidian SUV
  createCar(-60, 2.15, -31.6, -1, 24.5, 0x64748b, true); // Grey Sedan

  /* Iconic Bengaluru Rain Trees (Samanea saman) along Roadsides */
  var treeBarkMat = new THREE.MeshStandardMaterial({ color: srgb(0x3e2c1c), roughness: 0.95 });
  var rainTreeLeafMat = new THREE.MeshStandardMaterial({ color: srgb(0x194524), roughness: 0.85 });

  function addBengaluruRainTree(x, z, scale) {
    var tree = new THREE.Group();
    tree.position.set(x, -5.0, z);
    tree.scale.setScalar(scale || 1.0);
    bengaluruGroup.add(tree);

    // Thick branching trunk
    var trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.65, 4.2, 8), treeBarkMat);
    trunk.position.y = 2.1;
    trunk.castShadow = true;
    tree.add(trunk);

    // Classic wide umbrella canopy typical of Bengaluru boulevards
    var canopy = new THREE.Mesh(new THREE.SphereGeometry(3.6, 12, 10), rainTreeLeafMat);
    canopy.scale.set(1.6, 0.65, 1.4);
    canopy.position.y = 4.8;
    canopy.castShadow = true;
    tree.add(canopy);
  }

  addBengaluruRainTree(-32, -16, 0.95);
  addBengaluruRainTree(28, -16, 1.05);
  addBengaluruRainTree(-75, -29, 1.15);
  addBengaluruRainTree(70, -29, 1.1);
  addBengaluruRainTree(-110, -18, 1.25);
  addBengaluruRainTree(110, -18, 1.2);

  /* ==========================================================================
     THE WORKBENCH (DESK) & SCENIC PROPS
     ========================================================================== */

  var deskMat = new THREE.MeshStandardMaterial({
    map: woodTex,
    color: srgb(0xf2e4d4),
    roughness: 0.55,
    metalness: 0.02
  });

  var deskTop = new THREE.Mesh(roundedBox(2.2, 0.92, 0.042, 0.024, 6), deskMat);
  deskTop.rotation.x = -Math.PI / 2;
  deskTop.position.set(0.06, DESK_Y - 0.021, 0.02);
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  scene.add(deskTop);

  var deskPadMat = new THREE.MeshStandardMaterial({ color: srgb(0x202824), roughness: 0.85 });
  var deskPad = new THREE.Mesh(roundedBox(0.92, 0.44, 0.005, 0.012, 3), deskPadMat);
  deskPad.rotation.x = -Math.PI / 2;
  deskPad.position.set(0.32, DESK_Y + 0.003, 0.16);
  deskPad.receiveShadow = true;
  scene.add(deskPad);

  var legMat = new THREE.MeshStandardMaterial({ color: srgb(0x272c29), roughness: 0.35, metalness: 0.85 });
  [[-0.96, 0.38], [1.02, 0.38], [-0.96, -0.38], [1.02, -0.38]].forEach(function (pt) {
    var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, DESK_Y - 0.042, 16), legMat);
    leg.position.set(pt[0], (DESK_Y - 0.042) / 2, pt[1]);
    leg.castShadow = true;
    leg.receiveShadow = true;
    scene.add(leg);
  });

  /* ==========================================================================
     INFALLIBLE 3D INTERACTION & HITBOX SYSTEM
     ========================================================================== */

  var pickables = [];
  function addHitbox(parentGroup, key, w, h, d, ox, oy, oz) {
    var hbGeo = new THREE.BoxGeometry(w, h, d);
    var hbMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      visible: true
    });
    var hbMesh = new THREE.Mesh(hbGeo, hbMat);
    hbMesh.position.set(ox || 0, oy || 0, oz || 0);
    hbMesh.userData.key = key;
    parentGroup.add(hbMesh);
    pickables.push(hbMesh);
    return hbMesh;
  }

  function registerPickable(obj, key) {
    obj.userData.key = key;
    if (pickables.indexOf(obj) === -1) pickables.push(obj);
    obj.traverse(function (child) {
      child.userData.key = key;
      if (child.isMesh && pickables.indexOf(child) === -1) pickables.push(child);
    });
    return obj;
  }

  var showing = { vr: 0, pc: 0, phone: 0 };

  /* --------------------------------------------------------------------------
     1. META QUEST 3 VR HEADSET & TOUCH CONTROLLERS (Group: 'vr')
     -------------------------------------------------------------------------- */

  var gVR = registerPickable(new THREE.Group(), 'vr');
  gVR.position.set(-0.48, DESK_Y + 0.065, -0.04);
  scene.add(gVR);

  var vrVisorMat = new THREE.MeshPhysicalMaterial({
    color: 0xf5f6f2,
    roughness: 0.35,
    metalness: 0.05,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2
  });
  var vrVisor = new THREE.Mesh(roundedBox(0.185, 0.1, 0.095, 0.035, 6), vrVisorMat);
  vrVisor.castShadow = true;
  gVR.add(vrVisor);

  var sensorMat = new THREE.MeshStandardMaterial({ color: srgb(0x121413), roughness: 0.15, metalness: 0.9 });
  [-0.055, 0.0, 0.055].forEach(function (sx) {
    var pill = new THREE.Mesh(roundedBox(0.016, 0.036, 0.006, 0.007, 3), sensorMat);
    pill.position.set(sx, 0, 0.048);
    gVR.add(pill);
  });

  var cushionMat = new THREE.MeshStandardMaterial({ color: srgb(0x242825), roughness: 0.95 });
  var cushion = new THREE.Mesh(roundedBox(0.175, 0.09, 0.02, 0.025, 4), cushionMat);
  cushion.position.set(0, 0, -0.05);
  gVR.add(cushion);

  var ocularMat = new THREE.MeshStandardMaterial({ color: 0x051a24, roughness: 0.05, metalness: 0.9 });
  [-0.036, 0.036].forEach(function (lx) {
    var lens = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.006, 24), ocularMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(lx, 0, -0.052);
    gVR.add(lens);
  });

  var strapMat = new THREE.MeshStandardMaterial({ color: srgb(0x2c332e), roughness: 0.85 });
  var strapRing = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.012, 10, 32), strapMat);
  strapRing.rotation.x = Math.PI / 2;
  strapRing.position.set(0, 0.01, -0.09);
  strapRing.castShadow = true;
  gVR.add(strapRing);

  var rearDial = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.012, 18), legMat);
  rearDial.rotation.x = Math.PI / 2;
  rearDial.position.set(0, 0.01, -0.21);
  gVR.add(rearDial);

  // Pair of Touch Plus Controllers
  [-0.18, 0.18].forEach(function (cx, idx) {
    var ctrlGroup = new THREE.Group();
    ctrlGroup.position.set(cx, 0.02, 0.02);
    ctrlGroup.rotation.y = idx === 0 ? 0.4 : -0.4;
    ctrlGroup.rotation.x = -0.2;
    gVR.add(ctrlGroup);

    var grip = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.014, 0.12, 16), vrVisorMat);
    grip.castShadow = true;
    ctrlGroup.add(grip);

    var topDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.012, 20), vrVisorMat);
    topDisc.position.set(0, 0.06, 0.01);
    topDisc.rotation.x = 0.35;
    ctrlGroup.add(topDisc);

    var thumbstick = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.014, 16), cushionMat);
    thumbstick.position.set(-0.008, 0.07, 0.012);
    ctrlGroup.add(thumbstick);
  });

  // Generous VR Headset Hitbox
  addHitbox(gVR, 'vr', 0.65, 0.35, 0.50, 0, 0.06, -0.05);

  /* Wall-Mounted VR Stereo Stream Monitor */
  var vrStereoShader = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: null },
      hasMap: { value: 0.0 },
      aspect: { value: 0.888 },
      time: { value: 0.0 }
    },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: [
      'uniform sampler2D map;',
      'uniform float hasMap;',
      'uniform float aspect;',
      'varying vec2 vUv;',
      'vec3 sampleEye(vec2 q, float k) {',
      '  vec2 uv = vec2(0.5) + q * (1.0 + k * dot(q, q));',
      '  uv.x = 0.5 + (uv.x - 0.5) * 0.62;',
      '  return texture2D(map, uv).rgb;',
      '}',
      'void main() {',
      '  float eye = step(0.5, vUv.x);',
      '  vec2 local = vec2(fract(vUv.x * 2.0), vUv.y);',
      '  local.x += mix(0.025, -0.025, eye);',
      '  vec2 p = (local - 0.5) * vec2(aspect, 1.0);',
      '  float d = length(p * vec2(0.95, 1.0));',
      '  float mask = 1.0 - smoothstep(0.43, 0.47, d);',
      '  vec2 q = (local - 0.5) * 0.82;',
      '  vec3 col = vec3(0.0);',
      '  if (hasMap > 0.5) {',
      '    col.r = sampleEye(q, 0.30).r;',
      '    col.g = sampleEye(q, 0.27).g;',
      '    col.b = sampleEye(q, 0.24).b;',
      '  }',
      '  float vig = 1.0 - smoothstep(0.24, 0.46, d) * 0.55;',
      '  col *= vig * mask;',
      '  gl_FragColor = vec4(col + vec3(0.015), 1.0);',
      '}'
    ].join('\n')
  });

  var gWallTV = registerPickable(new THREE.Group(), 'vr');
  gWallTV.position.set(-0.52, 1.48, WALL_Z + 0.035);
  scene.add(gWallTV);

  var tvChassis = new THREE.Mesh(roundedBox(0.72, 0.43, 0.028, 0.01, 4), legMat);
  tvChassis.castShadow = true;
  gWallTV.add(tvChassis);

  var tvScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.69, 0.40), vrStereoShader);
  tvScreenMesh.position.z = 0.0145;
  gWallTV.add(tvScreenMesh);
  addHitbox(gWallTV, 'vr', 0.95, 0.60, 0.35, 0, 0, 0.1);

  /* --------------------------------------------------------------------------
     2. ULTRAWIDE PC MONITOR & DESKTOP RIG (Group: 'pc')
     -------------------------------------------------------------------------- */

  var gPC = registerPickable(new THREE.Group(), 'pc');
  gPC.position.set(0.35, DESK_Y + 0.30, -0.03);
  scene.add(gPC);

  var monChassisMat = new THREE.MeshStandardMaterial({ color: srgb(0x1a1e1b), roughness: 0.3, metalness: 0.7 });
  var monFrame = new THREE.Mesh(roundedBox(0.88, 0.50, 0.025, 0.014, 5), monChassisMat);
  monFrame.castShadow = true;
  gPC.add(monFrame);

  var monArm = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.32, 16), legMat);
  monArm.position.set(0, -0.16, -0.06);
  monArm.castShadow = true;
  gPC.add(monArm);

  var monClamp = new THREE.Mesh(roundedBox(0.09, 0.04, 0.08, 0.008, 3), legMat);
  monClamp.position.set(0, -0.29, -0.06);
  gPC.add(monClamp);

  var monScreenMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var monScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.855, 0.475), monScreenMat);
  monScreenMesh.position.z = 0.0135;
  gPC.add(monScreenMesh);

  /* Procedural High-Tech Studio Dashboard for Deepankar Sehgal */
  var devScreenCanvas = document.createElement('canvas');
  devScreenCanvas.width = 1024;
  devScreenCanvas.height = 576;
  var devScreenCtx = devScreenCanvas.getContext('2d');
  var devScreenTex = new THREE.CanvasTexture(devScreenCanvas);
  devScreenTex.encoding = THREE.sRGBEncoding;

  function renderDevDashboard(time) {
    var ctx = devScreenCtx;
    var w = 1024, h = 576;

    // Dark sleek obsidian background
    var grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0a1015');
    grad.addColorStop(0.5, '#060a0d');
    grad.addColorStop(1, '#0c141c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle dev tech grid
    ctx.strokeStyle = 'rgba(2, 132, 199, 0.07)';
    ctx.lineWidth = 1;
    for (var x = 0; x < w; x += 32) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (var y = 0; y < h; y += 32) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Top IDE Title Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.fillRect(0, 0, w, 46);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath(); ctx.moveTo(0, 46); ctx.lineTo(w, 46); ctx.stroke();

    // Mac/Linux style window controls
    var dots = ['#ef4444', '#f59e0b', '#10b981'];
    for (var i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(26 + i * 20, 23, 6, 0, Math.PI * 2);
      ctx.fillStyle = dots[i];
      ctx.fill();
    }

    // Breadcrumb title
    ctx.font = '600 14px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('DeepankarSehgal.unity · Senior Unity & XR Architect', 100, 28);

    // Live status in header
    var pulse = Math.sin((time || 0) * 3.5) * 0.5 + 0.5;
    ctx.beginPath();
    ctx.arc(830, 23, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(16, 185, 129, ' + (0.5 + 0.5 * pulse) + ')';
    ctx.fill();
    ctx.fillStyle = '#34d399';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('● ONLINE · BENGALURU IST', 844, 28);

    // Center Hero
    ctx.textAlign = 'center';

    // Role Label
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('SENIOR UNITY & XR DEVELOPER · 5+ YRS EXPERIENCE', w / 2, 126);

    // Main Name: DEEPANKAR SEHGAL
    ctx.font = '800 52px "Bricolage Grotesque", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
    ctx.shadowBlur = 24;
    ctx.fillText('DEEPANKAR SEHGAL', w / 2, 188);
    ctx.shadowBlur = 0;

    // Subtitle
    ctx.font = '500 18px "Figtree", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('Steam AA Releases · Industrial VR Simulations · High-Concurrency Multiplayer Systems', w / 2, 226);

    // Accent line
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 280, 252);
    ctx.lineTo(w / 2 + 280, 252);
    ctx.stroke();

    // Badges Row
    var bItems = [
      '★ 25+ Shipped Titles',
      '★ Steam AA: Crimson Tactics',
      '★ Meta Quest 3 VR',
      '★ 5M+ Multiplayer (YungAlgo)'
    ];
    ctx.font = '600 13.5px "JetBrains Mono", monospace';
    var bStart = (w - (bItems.length * 210)) / 2 + 105;
    bItems.forEach(function (b, bi) {
      var bx = bStart + bi * 210;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(bx - 96, 275, 192, 36, 8);
      else ctx.rect(bx - 96, 275, 192, 36);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(b, bx, 298);
    });

    // Tech Stack Line
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Unity URP/HDRP · C# Engine Systems · Photon Netcode · NavMesh AI · Steamworks SDK', w / 2, 355);

    // Call to Action Glowing Button
    var ctaGlow = 0.82 + 0.18 * Math.sin((time || 0) * 4);
    ctx.fillStyle = 'rgba(2, 132, 199, ' + ctaGlow + ')';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(w / 2 - 290, 400, 580, 54, 12);
    else ctx.rect(w / 2 - 290, 400, 580, 54);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.stroke();

    ctx.font = '700 17px "Figtree", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('▶ CLICK MONITOR OR VR HEADSET TO EXPLORE CASE STUDIES', w / 2, 434);

    // Bottom telemetry footer
    ctx.font = '500 12.5px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText('LOCATION: BENGALURU, INDIA · STATUS: AVAILABLE FOR SENIOR & LEAD ROLES', w / 2, 492);

    ctx.textAlign = 'left';
    devScreenTex.needsUpdate = true;
  }

  renderDevDashboard(0);
  monScreenMat.map = devScreenTex;
  monScreenMat.needsUpdate = true;

  // Large PC Hitbox encompassing monitor and arm
  addHitbox(gPC, 'pc', 1.05, 0.65, 0.35, 0, 0, 0.05);

  /* Mechanical Keyboard & Mouse */
  var kbGroup = registerPickable(new THREE.Group(), 'pc');
  kbGroup.position.set(0.32, DESK_Y + 0.012, 0.22);
  scene.add(kbGroup);

  var kbBody = new THREE.Mesh(
    roundedBox(0.38, 0.13, 0.015, 0.006, 3),
    new THREE.MeshStandardMaterial({ color: srgb(0x1a211d), roughness: 0.4, metalness: 0.6 })
  );
  kbBody.rotation.x = -Math.PI / 2;
  kbBody.castShadow = true;
  kbGroup.add(kbBody);

  var mouseGroup = registerPickable(new THREE.Group(), 'pc');
  mouseGroup.position.set(0.64, DESK_Y + 0.012, 0.22);
  scene.add(mouseGroup);

  var mouseBody = new THREE.Mesh(
    roundedBox(0.068, 0.105, 0.026, 0.015, 4),
    new THREE.MeshStandardMaterial({ color: srgb(0x1a211d), roughness: 0.35, metalness: 0.4 })
  );
  mouseBody.rotation.x = -Math.PI / 2;
  mouseBody.castShadow = true;
  mouseGroup.add(mouseBody);

  addHitbox(kbGroup, 'pc', 0.42, 0.08, 0.2, 0, 0, 0);
  addHitbox(mouseGroup, 'pc', 0.12, 0.08, 0.15, 0, 0, 0);

  /* --------------------------------------------------------------------------
     STUDIO AUDIO NEARFIELD MONITORS (SPEAKERS - CLICKABLE AUDIO TOGGLE)
     -------------------------------------------------------------------------- */

  var speakerMat = new THREE.MeshStandardMaterial({ color: srgb(0x161c18), roughness: 0.4, metalness: 0.5 });
  var coneMat = new THREE.MeshStandardMaterial({ color: srgb(0xf2e0cc), roughness: 0.5 });

  function createSpeaker(x, z, ry) {
    var spk = registerPickable(new THREE.Group(), 'speakers');
    spk.position.set(x, DESK_Y + 0.14, z);
    spk.rotation.y = ry;
    scene.add(spk);

    var cabinet = new THREE.Mesh(roundedBox(0.14, 0.24, 0.16, 0.01, 3), speakerMat);
    cabinet.castShadow = true;
    spk.add(cabinet);

    var tweeter = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 16), legMat);
    tweeter.position.set(0, 0.065, 0.08);
    spk.add(tweeter);

    var woofer = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.015, 0.02, 24), coneMat);
    woofer.rotation.x = Math.PI / 2;
    woofer.position.set(0, -0.025, 0.075);
    spk.add(woofer);

    addHitbox(spk, 'speakers', 0.2, 0.3, 0.22, 0, 0, 0);
    return spk;
  }

  var spkLeft = createSpeaker(-0.16, -0.03, 0.22);
  var spkRight = createSpeaker(0.86, -0.03, -0.22);

  /* --------------------------------------------------------------------------
     3. SMARTPHONE ON DOCK (Group: 'phone')
     -------------------------------------------------------------------------- */

  var gPhone = registerPickable(new THREE.Group(), 'phone');
  gPhone.position.set(0.72, DESK_Y + 0.06, 0.02);
  gPhone.rotation.y = -0.35;
  scene.add(gPhone);

  var phoneDock = new THREE.Mesh(
    roundedBox(0.09, 0.06, 0.06, 0.008, 3),
    new THREE.MeshStandardMaterial({ color: srgb(0x323a35), roughness: 0.35, metalness: 0.8 })
  );
  phoneDock.position.set(0, -0.03, -0.01);
  gPhone.add(phoneDock);

  var phoneHolder = new THREE.Group();
  phoneHolder.rotation.x = -0.32;
  gPhone.add(phoneHolder);

  var phoneChassis = new THREE.Mesh(
    roundedBox(0.084, 0.17, 0.009, 0.014, 4),
    new THREE.MeshStandardMaterial({ color: srgb(0x18201c), roughness: 0.25, metalness: 0.85 })
  );
  phoneChassis.castShadow = true;
  phoneHolder.add(phoneChassis);

  var phoneScreenMat = new THREE.MeshBasicMaterial({ color: 0xe0e0e0 });
  var phoneScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.078, 0.162), phoneScreenMat);
  phoneScreenMesh.position.z = 0.005;
  phoneHolder.add(phoneScreenMesh);

  var phoneTargetRot = 0;
  var phoneCurrentRot = 0;
  addHitbox(gPhone, 'phone', 0.28, 0.32, 0.28, 0, 0.05, 0);

  /* --------------------------------------------------------------------------
     4. DEV FIELD NOTEBOOK (Group: 'notes')
     -------------------------------------------------------------------------- */

  var gNotes = registerPickable(new THREE.Group(), 'notes');
  gNotes.position.set(-0.06, DESK_Y + 0.01, 0.24);
  gNotes.rotation.y = 0.08;
  scene.add(gNotes);

  var bookCover = new THREE.Mesh(
    roundedBox(0.24, 0.175, 0.015, 0.008, 4),
    new THREE.MeshStandardMaterial({ color: srgb(0x38443e), roughness: 0.9 })
  );
  bookCover.rotation.x = -Math.PI / 2;
  bookCover.castShadow = true;
  gNotes.add(bookCover);

  var bookPages = new THREE.Mesh(
    new THREE.BoxGeometry(0.225, 0.012, 0.16),
    new THREE.MeshStandardMaterial({ color: srgb(0xf5f3ea), roughness: 0.95 })
  );
  bookPages.position.y = 0.0075;
  gNotes.add(bookPages);

  var penMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.004, 0.004, 0.165, 14),
    new THREE.MeshStandardMaterial({ color: srgb(0xd95b26), roughness: 0.3, metalness: 0.75 })
  );
  penMesh.rotation.z = Math.PI / 2;
  penMesh.position.set(0, 0.018, 0.095);
  gNotes.add(penMesh);

  addHitbox(gNotes, 'notes', 0.36, 0.20, 0.32, 0, 0.05, 0);

  /* --------------------------------------------------------------------------
     5. ARTICULATED DESK TASK LAMP (Clickable!)
     -------------------------------------------------------------------------- */

  var gLamp = registerPickable(new THREE.Group(), 'lamp');
  gLamp.position.set(-0.75, DESK_Y, -0.22);
  scene.add(gLamp);

  var lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.016, 24), legMat);
  lampBase.castShadow = true;
  gLamp.add(lampBase);

  var lampArm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.42, 12), legMat);
  lampArm1.position.set(0.05, 0.22, 0.05);
  lampArm1.rotation.z = -0.25;
  lampArm1.castShadow = true;
  gLamp.add(lampArm1);

  var lampArm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.35, 12), legMat);
  lampArm2.position.set(0.14, 0.48, 0.07);
  lampArm2.rotation.z = 0.45;
  lampArm2.castShadow = true;
  gLamp.add(lampArm2);

  var lampHead = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.14, 20), legMat);
  lampHead.rotation.z = Math.PI / 3 + 0.25;
  lampHead.position.set(0.24, 0.58, 0.09);
  lampHead.castShadow = true;
  gLamp.add(lampHead);

  var bulbMat = new THREE.MeshBasicMaterial({ color: 0xffeedb });
  var lampBulb = new THREE.Mesh(new THREE.SphereGeometry(0.024, 16, 16), bulbMat);
  lampBulb.position.set(0.22, 0.56, 0.09);
  gLamp.add(lampBulb);

  addHitbox(gLamp, 'lamp', 0.15, 0.14, 0.15, 0, 0.07, 0);

  var isLampOn = true;
  function toggleDeskLamp() {
    isLampOn = !isLampOn;
    deskSpot.visible = isLampOn;
    bulbMat.color.setHex(isLampOn ? 0xffeedb : 0x222222);
    showToast('💡 Task Lamp: ' + (isLampOn ? 'ON' : 'OFF'));
  }

  /* --------------------------------------------------------------------------
     6. CERAMIC COFFEE MUG (Clickable!)
     -------------------------------------------------------------------------- */

  var gMug = registerPickable(new THREE.Group(), 'mug');
  gMug.position.set(-0.38, DESK_Y + 0.046, 0.28);
  scene.add(gMug);

  var mugBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.042, 0.038, 0.092, 24),
    new THREE.MeshStandardMaterial({ color: srgb(0x27342d), roughness: 0.25 })
  );
  mugBody.castShadow = true;
  gMug.add(mugBody);

  var mugHandle = new THREE.Mesh(
    new THREE.TorusGeometry(0.024, 0.007, 10, 20),
    new THREE.MeshStandardMaterial({ color: srgb(0x27342d), roughness: 0.25 })
  );
  mugHandle.position.set(-0.042, 0, 0);
  mugHandle.rotation.y = Math.PI / 2;
  gMug.add(mugHandle);

  var coffeeSurface = new THREE.Mesh(
    new THREE.CircleGeometry(0.038, 20),
    new THREE.MeshStandardMaterial({ color: srgb(0x1a0e07), roughness: 0.1, metalness: 0.3 })
  );
  coffeeSurface.rotation.x = -Math.PI / 2;
  coffeeSurface.position.y = 0.04;
  gMug.add(coffeeSurface);

  // Steam particles
  var steamGeo = new THREE.BufferGeometry();
  var steamCount = 35;
  var steamPositions = new Float32Array(steamCount * 3);
  for (var si = 0; si < steamCount * 3; si += 3) {
    steamPositions[si] = (Math.random() - 0.5) * 0.04;
    steamPositions[si + 1] = 0.05 + Math.random() * 0.15;
    steamPositions[si + 2] = (Math.random() - 0.5) * 0.04;
  }
  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
  var steamMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.015,
    transparent: true,
    opacity: 0.35,
    depthWrite: false
  });
  var steamPoints = new THREE.Points(steamGeo, steamMat);
  gMug.add(steamPoints);

  addHitbox(gMug, 'mug', 0.15, 0.16, 0.15, 0, 0, 0);

  function sipCoffee() {
    showToast('☕ Fresh Coffee Sip · 100% Arabica');
    steamMat.opacity = 0.85;
    setTimeout(function () { steamMat.opacity = 0.35; }, 1200);
  }

  /* --------------------------------------------------------------------------
     7. POTTED MONSTERA PLANT
     -------------------------------------------------------------------------- */

  var plantGroup = new THREE.Group();
  plantGroup.position.set(0.96, DESK_Y, -0.22);
  scene.add(plantGroup);

  var potMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.055, 0.15, 20),
    new THREE.MeshStandardMaterial({ color: srgb(0xded4c6), roughness: 0.75 })
  );
  potMesh.position.y = 0.075;
  potMesh.castShadow = true;
  plantGroup.add(potMesh);

  var soilMesh = new THREE.Mesh(
    new THREE.CircleGeometry(0.075, 16),
    new THREE.MeshStandardMaterial({ color: srgb(0x2d2116), roughness: 0.95 })
  );
  soilMesh.rotation.x = -Math.PI / 2;
  soilMesh.position.y = 0.145;
  plantGroup.add(soilMesh);

  var leafMat = new THREE.MeshStandardMaterial({ color: srgb(0x386b4b), roughness: 0.45, side: THREE.DoubleSide });
  for (var lp = 0; lp < 12; lp++) {
    var leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo(0.04, 0.08, 0.05, 0.18);
    leafShape.quadraticCurveTo(0, 0.24, -0.05, 0.18);
    leafShape.quadraticCurveTo(-0.04, 0.08, 0, 0);
    var leafGeo = new THREE.ShapeGeometry(leafShape);
    var leafM = new THREE.Mesh(leafGeo, leafMat);
    var ang = (lp / 12) * Math.PI * 2;
    leafM.position.set(Math.cos(ang) * 0.04, 0.15 + (lp % 4) * 0.02, Math.sin(ang) * 0.04);
    leafM.rotation.y = ang + Math.PI / 2;
    leafM.rotation.x = 0.45 + (lp % 3) * 0.1;
    leafM.castShadow = true;
    plantGroup.add(leafM);
  }

  /* Tag all pickable groups and children meshes recursively */
  function tagPickableTree(grp, key) {
    if (!grp) return;
    grp.userData.key = key;
    if (pickables.indexOf(grp) === -1) pickables.push(grp);
    grp.traverse(function (child) {
      child.userData.key = key;
      if (child.isMesh && pickables.indexOf(child) === -1) {
        pickables.push(child);
      }
    });
  }

  tagPickableTree(gVR, 'vr');
  tagPickableTree(gWallTV, 'vr');
  tagPickableTree(gPC, 'pc');
  tagPickableTree(kbGroup, 'pc');
  tagPickableTree(mouseGroup, 'pc');
  tagPickableTree(gPhone, 'phone');
  tagPickableTree(gNotes, 'notes');
  tagPickableTree(gLamp, 'lamp');
  tagPickableTree(gMug, 'mug');
  tagPickableTree(spkLeft, 'speakers');
  tagPickableTree(spkRight, 'speakers');

  /* ==========================================================================
     CONTINUOUS VIDEO SYNCHRONIZATION
     ========================================================================== */

  function showClip(groupKey) {
    if (groupKey === 'pc') {
      var p = GROUPS.pc.projects[showing.pc];
      var c = clip(p ? p.clip : 'stadpc');
      monScreenMat.map = c.tex;
      monScreenMat.needsUpdate = true;
      playVideo(c.video);
    } else if (groupKey === 'vr') {
      var p = GROUPS.vr.projects[showing.vr];
      var c = clip(p ? p.clip : 'stadvr');
      vrStereoShader.uniforms.map.value = c.tex;
      vrStereoShader.uniforms.hasMap.value = 1.0;
      playVideo(c.video);
    } else if (groupKey === 'phone') {
      var p = GROUPS.phone.projects[showing.phone];
      var c = clip(p ? p.clip : 'domino');
      phoneScreenMat.map = c.tex;
      phoneScreenMat.needsUpdate = true;
      phoneTargetRot = (p && p.orient === 'land') ? Math.PI / 2 : 0;
      c.tex.rotation = (p && p.orient === 'land') ? -Math.PI / 2 : 0;
      playVideo(c.video);
    }
  }

  // VR & Phone play background video loops; PC monitor displays custom Dev Dashboard at start!
  showClip('vr');
  showClip('phone');

  /* ==========================================================================
     LIGHTING PRESETS & REAL-TIME SUN SYNCHRONIZATION
     ========================================================================== */

  var ENV_PRESETS = {
    day: {
      sunDir: new THREE.Vector3(0.35, 0.75, -0.6).normalize(),
      sunColor: 0xfff8ee,
      sunIntensity: 5.4,
      hemiSky: 0xdbeafe,
      hemiGround: 0x475569,
      hemiIntensity: 0.75,
      topSky: 0x38bdf8,
      botSky: 0xdbeafe,
      waterDeep: 0x052842,
      waterShallow: 0x0e7490,
      lampIntensity: 0,
      ceilIntensity: 0,
      monGlowIntensity: 0.4,
      tikiIntensity: 0,
      wallColor: 0xd9e3dc,
      dusk: false
    },
    sunset: {
      sunDir: new THREE.Vector3(0.06, 0.22, -1.0).normalize(),
      sunColor: 0xf97316,
      sunIntensity: 6.8,
      hemiSky: 0xfdba74,
      hemiGround: 0x78350f,
      hemiIntensity: 0.8,
      topSky: 0x475569,
      botSky: 0xf97316,
      waterDeep: 0x1e293b,
      waterShallow: 0xe06d2d,
      lampIntensity: 4.5,
      ceilIntensity: 0.8,
      monGlowIntensity: 0.8,
      tikiIntensity: 1.5,
      wallColor: 0xd6c6b8,
      dusk: false
    },
    night: {
      sunDir: new THREE.Vector3(-0.25, 0.65, -0.7).normalize(),
      sunColor: 0x93c5fd,
      sunIntensity: 1.4,
      hemiSky: 0x0f172a,
      hemiGround: 0x020617,
      hemiIntensity: 0.3,
      topSky: 0x020617,
      botSky: 0x0f172a,
      waterDeep: 0x020617,
      waterShallow: 0x0f172a,
      lampIntensity: 13.5,
      ceilIntensity: 2.8,
      monGlowIntensity: 1.8,
      tikiIntensity: 3.2,
      wallColor: 0x16201b,
      dusk: true
    }
  };

  var currentMode = 'auto';

  function getRealTimeMode() {
    var now = new Date();
    var utcHours = now.getUTCHours();
    var utcMins = now.getUTCMinutes();
    var istHour = (utcHours + 5 + (utcMins + 30) / 60) % 24;

    if (istHour >= 6.5 && istHour < 17.0) return 'day';
    if (istHour >= 17.0 && istHour < 18.75) return 'sunset';
    return 'night';
  }

  function applyEnvironment(modeName) {
    var effectiveMode = modeName === 'auto' ? getRealTimeMode() : modeName;
    var p = ENV_PRESETS[effectiveMode] || ENV_PRESETS.day;

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

    // Dynamic Bengaluru City Lights at Sunset & Night
    if (typeof bldgMat !== 'undefined') {
      bldgMat.emissive.setHex(p.dusk ? 0xfef08a : (effectiveMode === 'sunset' ? 0xf59e0b : 0x000000));
      bldgMat.emissiveIntensity = p.dusk ? 1.3 : (effectiveMode === 'sunset' ? 0.65 : 0.0);
    }

    if (cityStreetLights && cityStreetLights.length) {
      cityStreetLights.forEach(function (sl) {
        sl.intensity = p.dusk ? 3.6 : (effectiveMode === 'sunset' ? 1.8 : 0);
      });
    }

    if (typeof carHeadlightMat !== 'undefined' && typeof carTaillightMat !== 'undefined') {
      carHeadlightMat.color.setHex(p.dusk ? 0xffffff : (effectiveMode === 'sunset' ? 0xffeedb : 0xe2e8f0));
      carTaillightMat.color.setHex(p.dusk ? 0xef4444 : (effectiveMode === 'sunset' ? 0xdc2626 : 0x991b1b));
    }

    deskSpot.intensity = isLampOn ? p.lampIntensity : 0;
    roomCeilLight.intensity = p.ceilIntensity;
    monGlow.intensity = p.monGlowIntensity;

    document.body.classList.toggle('dusk', p.dusk);
    document.documentElement.style.setProperty('--wall', '#' + new THREE.Color(p.wallColor).getHexString());

    document.querySelectorAll('.env-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === modeName);
    });
  }

  /* ==========================================================================
     CAMERA VIEWS & CONSTRAINED ORBIT CONTROLS
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
  var isDragging = false, dragStart = { x: 0, y: 0 }, downPos = { x: 0, y: 0 };

  function setView(viewKey) {
    var v = VIEWS[viewKey] || VIEWS.overview;
    wantPos.fromArray(v.pos);
    wantTgt.fromArray(v.tgt);

    var aspect = window.innerWidth / Math.max(window.innerHeight, 1);
    if (aspect < 1.0) {
      wantPos.z += (1.0 - aspect) * 1.3;
      wantPos.y += 0.2;
    }
  }

  /* ==========================================================================
     INFALLIBLE CLICK & HOVER DETECTION
     ========================================================================== */

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(-99, -99);
  var hoveredKey = null;

  var HOVER_DESCRIPTIONS = {
    vr: 'Meta Quest 3 · 9 VR & XR Simulation Projects',
    pc: 'Desktop Rig · 8 Steam AA & PC Games',
    phone: 'Mobile Device · 5M+ Multiplayer & Web3 Games',
    notes: 'Dev Field Journal · Architecture Notes & Case Studies',
    speakers: 'Studio Monitors · Click to Toggle Bengaluru City Ambience',
    lamp: 'Desk Task Lamp · Click to Toggle Light',
    mug: 'Ceramic Mug · Click to Sip Hot Coffee'
  };

  var hintText = document.getElementById('hint-text');

  function getHitKey(clientX, clientY) {
    var rect = renderer.domElement.getBoundingClientRect();
    var x = ((clientX - rect.left) / rect.width) * 2 - 1;
    var y = -((clientY - rect.top) / rect.height) * 2 + 1;

    camera.updateMatrixWorld(true);
    raycaster.setFromCamera({ x: x, y: y }, camera);
    var hits = raycaster.intersectObjects(pickables, true);
    if (!hits || !hits.length) return null;

    var hitKeys = [];
    for (var i = 0; i < hits.length; i++) {
      var cur = hits[i].object;
      while (cur && cur !== scene) {
        if (cur.userData && cur.userData.key) {
          if (hitKeys.indexOf(cur.userData.key) === -1) {
            hitKeys.push(cur.userData.key);
          }
          break;
        }
        cur = cur.parent;
      }
    }
    if (!hitKeys.length) return null;

    // Prioritize primary showcase devices so clicking Wall TV / VR / PC always opens project info
    var priority = ['vr', 'pc', 'phone', 'notes', 'speakers', 'mug', 'lamp'];
    for (var p = 0; p < priority.length; p++) {
      if (hitKeys.indexOf(priority[p]) !== -1) {
        return priority[p];
      }
    }
    return hitKeys[0];
  }

  var lastInteractTime = 0;
  function triggerInteraction(key) {
    if (!key) return;
    var now = performance.now();
    if (now - lastInteractTime < 200) return;
    lastInteractTime = now;

    if (key === 'vr') {
      currentPanel = 'vr';
      setView('vr');
      if (panel.classList.contains('open') && currentPanel === 'vr') {
        var next = (showing.vr + 1) % GROUPS.vr.projects.length;
        showProjectDetail(next);
        showToast('Meta Quest 3: ' + GROUPS.vr.projects[next].name);
      } else {
        showProjectDetail(showing.vr || 0);
        showToast('Meta Quest 3: ' + GROUPS.vr.projects[showing.vr || 0].name);
      }
    } else if (key === 'pc') {
      currentPanel = 'pc';
      setView('pc');
      if (panel.classList.contains('open') && currentPanel === 'pc') {
        var next = (showing.pc + 1) % GROUPS.pc.projects.length;
        showProjectDetail(next);
        showToast('Steam PC: ' + GROUPS.pc.projects[next].name);
      } else {
        showProjectDetail(showing.pc || 0);
        showToast('Steam PC: ' + GROUPS.pc.projects[showing.pc || 0].name);
      }
    } else if (key === 'phone') {
      currentPanel = 'phone';
      setView('phone');
      if (panel.classList.contains('open') && currentPanel === 'phone') {
        var next = (showing.phone + 1) % GROUPS.phone.projects.length;
        showProjectDetail(next);
        showToast('Mobile: ' + GROUPS.phone.projects[next].name);
      } else {
        showProjectDetail(showing.phone || 0);
        showToast('Mobile: ' + GROUPS.phone.projects[showing.phone || 0].name);
      }
    } else if (key === 'notes') {
      showNotes();
    } else if (key === 'lamp') {
      toggleDeskLamp();
    } else if (key === 'speakers') {
      toggleCityAudio();
    } else if (key === 'mug') {
      sipCoffee();
    }
  }

  var cv = renderer.domElement;
  cv.classList.add('grab');

  var isPointerDown = false;
  var downX = 0, downY = 0;
  var downTime = 0;
  var dragDistance = 0;

  cv.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    isPointerDown = true;
    downX = e.clientX;
    downY = e.clientY;
    downTime = performance.now();
    dragDistance = 0;
    dragStart.x = e.clientX;
    dragStart.y = e.clientY;
  });

  window.addEventListener('pointermove', function (e) {
    var rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isPointerDown) {
      var dx = e.clientX - dragStart.x;
      var dy = e.clientY - dragStart.y;
      dragDistance += Math.hypot(dx, dy);
      dragStart.x = e.clientX;
      dragStart.y = e.clientY;

      if (dragDistance > 6) {
        cv.classList.add('grabbing');
        targetYaw = THREE.MathUtils.clamp(targetYaw + dx * 0.0022, -0.55, 0.55);
        targetPitch = THREE.MathUtils.clamp(targetPitch + dy * 0.0018, -0.30, 0.30);
      }
    }
  });

  function onPointerRelease(e) {
    if (!isPointerDown) return;
    isPointerDown = false;
    cv.classList.remove('grabbing');

    var moveDist = Math.hypot(e.clientX - downX, e.clientY - downY);
    // Deliberate click if mouse moved less than 24px (ignoring minor hand jitter)
    if (moveDist < 24) {
      var hitKey = getHitKey(e.clientX, e.clientY);
      if (hitKey) {
        triggerInteraction(hitKey);
      } else if (panel.classList.contains('open')) {
        // If clicked outside on 3D room background while panel is open, close the panel
        closePanel();
      }
    }
  }

  cv.addEventListener('pointerup', onPointerRelease);
  cv.addEventListener('pointercancel', function () {
    isPointerDown = false;
    cv.classList.remove('grabbing');
  });

  // Secondary click handler directly on canvas
  cv.addEventListener('click', function (e) {
    var moveDist = Math.hypot(e.clientX - downX, e.clientY - downY);
    if (moveDist < 24) {
      var hitKey = getHitKey(e.clientX, e.clientY);
      if (hitKey) {
        triggerInteraction(hitKey);
      }
    }
  });

  // Floating 3D Device Pills Click Handlers
  document.querySelectorAll('.device-pill').forEach(function (pill) {
    pill.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var key = pill.getAttribute('data-key');
      if (key) triggerInteraction(key);
    });
  });

  /* ==========================================================================
     TOAST NOTIFICATIONS & BENGALURU CITY AMBIENT SYNTHESIZER
     ========================================================================== */

  var toastEl = document.getElementById('toast');
  var toastTimer = null;
  function showToast(text) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2400);
  }

  var audioCtx = null, audioGain = null, isAudioPlaying = false;
  function toggleCityAudio() {
    try {
      if (!audioCtx) {
        var AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        var bufferSize = audioCtx.sampleRate * 3.0;
        var noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        var output = noiseBuffer.getChannelData(0);
        // Soft pink noise algorithm for gentle urban hum
        var b0 = 0, b1 = 0, b2 = 0;
        for (var i = 0; i < bufferSize; i++) {
          var white = Math.random() * 2 - 1;
          b0 = 0.99765 * b0 + white * 0.0555179;
          b1 = 0.96300 * b1 + white * 0.0750759;
          b2 = 0.57000 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2 + white * 0.1) * 0.22;
        }
        var whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        var filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260, audioCtx.currentTime);

        audioGain = audioCtx.createGain();
        audioGain.gain.setValueAtTime(0, audioCtx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(audioGain);
        audioGain.connect(audioCtx.destination);

        whiteNoise.start();
      }

      if (audioCtx.state === 'suspended') audioCtx.resume();
      isAudioPlaying = !isAudioPlaying;

      if (isAudioPlaying) {
        audioGain.gain.setTargetAtTime(0.2, audioCtx.currentTime, 1.0);
        showToast('🏙️ Bengaluru City Ambience: ON');
      } else {
        audioGain.gain.setTargetAtTime(0.0, audioCtx.currentTime, 0.5);
        showToast('🏙️ Bengaluru City Ambience: OFF');
      }

      var label = document.getElementById('audio-label');
      var btn = document.getElementById('btn-audio');
      if (label) label.textContent = 'City Ambience: ' + (isAudioPlaying ? 'ON' : 'OFF');
      if (btn) btn.classList.toggle('active-audio', isAudioPlaying);
    } catch (err) {
      console.warn('Audio not available:', err);
    }
  }
  var toggleOceanAudio = toggleCityAudio;

  var btnAudio = document.getElementById('btn-audio');
  if (btnAudio) btnAudio.addEventListener('click', toggleCityAudio);

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

  function vtag(name) {
    return (
      '<video muted loop playsinline autoplay preload="auto">' +
      '<source src="assets/videos/' + name + '.mp4" type="video/mp4">' +
      '</video>'
    );
  }

  function kickPanelVideos() {
    pBody.querySelectorAll('video').forEach(function (v) {
      v.muted = true;
      playVideo(v);
    });
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
    if (monScreenMat) {
      monScreenMat.map = devScreenTex;
      monScreenMat.needsUpdate = true;
    }
    pBody.querySelectorAll('video').forEach(function (v) { v.pause(); });
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
        '<span class="thumb">' + vtag(p.clip) + '</span>' +
        '<span><span class="t">' + esc(p.name) + '</span><span class="k">' + esc(p.kind) + '</span></span>' +
        '</button></li>';
    });
    html += '</ul>';

    pBody.innerHTML = html;
    openPanel(false);
    kickPanelVideos();
  }

  function showProjectDetail(index) {
    var gr = GROUPS[currentPanel];
    if (!gr) return;
    var p = gr.projects[index];
    showing[currentPanel] = index;
    showClip(currentPanel);

    setPanelHeader(gr.label + ' · ' + p.kind, p.name);

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

    var storeHtml = '';
    if (p.store) {
      storeHtml =
        '<a class="linkbtn steam" href="' + esc(p.store) + '" target="_blank" rel="noopener noreferrer">' +
        '<i class="fa-brands fa-steam"></i> View on Steam Store ↗' +
        '</a>';
    }

    pBody.innerHTML =
      '<div class="detail">' +
      '<div class="capture">' + vtag(p.clip) + '</div>' +
      storeHtml +
      '<p>' + esc(p.blurb) + '</p>' +
      '<p class="dim">' + esc(p.note) + '</p>' +
      teardownHtml +
      tagsHtml +
      '<button class="backbtn" type="button" data-back="group">← All ' + esc(gr.label) + ' Work</button>' +
      '</div>';

    openPanel(false);
    kickPanelVideos();
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

  document.getElementById('btn-vr').addEventListener('click', function () { showGroup('vr'); });
  document.getElementById('btn-pc').addEventListener('click', function () { showGroup('pc'); });
  document.getElementById('btn-phone').addEventListener('click', function () { showGroup('phone'); });
  document.getElementById('btn-notes').addEventListener('click', showNotes);
  document.getElementById('btn-approach').addEventListener('click', showApproach);
  document.getElementById('btn-about').addEventListener('click', showAbout);
  document.getElementById('btn-contact').addEventListener('click', showContact);

  document.querySelectorAll('.env-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyEnvironment(btn.getAttribute('data-mode'));
    });
  });

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
     LIVE BENGALURU CLOCK, WEATHER & AQI API INTEGRATION
     ========================================================================== */

  var timeLabel = document.getElementById('time-label');
  var aqiLabel = document.getElementById('aqi-label');
  var aqiDot = document.getElementById('aqi-dot');
  var visitorLabel = document.getElementById('visitor-label');

  var WMO_WEATHER = {
    0: 'Clear', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Depositing Fog', 51: 'Light Drizzle', 53: 'Drizzle',
    55: 'Dense Drizzle', 61: 'Slight Rain', 63: 'Rain', 65: 'Heavy Rain',
    80: 'Rain Showers', 81: 'Heavy Showers', 95: 'Thunderstorm'
  };

  var weatherInfo = { temp: null, cond: 'Clear' };
  var aqiInfo = { aqi: null, level: 'Good' };

  function fetchBengaluruWeatherAndAQI() {
    var lat = 12.97, lon = 77.59;
    // Weather
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m,weather_code')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.current) {
          weatherInfo.temp = Math.round(data.current.temperature_2m);
          weatherInfo.cond = WMO_WEATHER[data.current.weather_code] || 'Clear';
          renderHeaderStatus();
        }
      })
      .catch(function () {});

    // AQI
    fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=' + lat + '&longitude=' + lon + '&current=us_aqi,pm2_5')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.current) {
          var val = Math.round(data.current.us_aqi);
          aqiInfo.aqi = val;
          if (val <= 50) aqiInfo.level = 'Good';
          else if (val <= 100) aqiInfo.level = 'Moderate';
          else aqiInfo.level = 'Unhealthy';
          renderHeaderStatus();
        }
      })
      .catch(function () {});
  }

  function renderHeaderStatus() {
    var now = new Date();
    var utcHours = now.getUTCHours();
    var utcMins = now.getUTCMinutes();
    var istH = String((utcHours + 5 + Math.floor((utcMins + 30) / 60)) % 24).padStart(2, '0');
    var istM = String((utcMins + 30) % 60).padStart(2, '0');

    if (timeLabel) {
      var wStr = weatherInfo.temp != null ? ' · ' + weatherInfo.temp + '°C ' + weatherInfo.cond : '';
      timeLabel.innerHTML = '<i class="fa-solid fa-location-dot"></i> Bengaluru · ' + istH + ':' + istM + ' IST' + wStr;
    }

    if (aqiLabel) {
      if (aqiInfo.aqi != null) {
        aqiLabel.innerHTML = '<span class="aqi-dot" id="aqi-dot"></span> AQI ' + aqiInfo.aqi + ' (' + aqiInfo.level + ')';
        if (aqiDot) {
          aqiDot.style.backgroundColor = aqiInfo.level === 'Good' ? '#10b981' : (aqiInfo.level === 'Moderate' ? '#f59e0b' : '#ef4444');
        }
      } else {
        aqiLabel.innerHTML = '<span class="aqi-dot"></span> AQI 58 (Good)';
      }
    }

    if (visitorLabel) {
      try {
        var userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (userTz && userTz !== 'Asia/Kolkata') {
          var userTimeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          visitorLabel.textContent = "It's " + userTimeStr + " for you (" + userTz.split('/')[1] + "), " + istH + ":" + istM + " IST here in Bengaluru";
          visitorLabel.hidden = false;
        }
      } catch (err) {}
    }
  }

  fetchBengaluruWeatherAndAQI();
  setInterval(renderHeaderStatus, 30000);
  setInterval(fetchBengaluruWeatherAndAQI, 15 * 60 * 1000);

  // Apply Real-Time Day / Night sync on initialization
  applyEnvironment('auto');

  /* ==========================================================================
     MAIN ANIMATION & RENDER LOOP
     ========================================================================== */

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    var dt = clock.getDelta();
    var elapsed = clock.getElapsedTime();

    // Animated Running Bengaluru Traffic & Namma Metro Viaduct Update
    if (typeof trafficVehicles !== 'undefined' && trafficVehicles.length) {
      for (var vi = 0; vi < trafficVehicles.length; vi++) {
        var tv = trafficVehicles[vi];
        tv.mesh.position.x += tv.dir * tv.speed * dt;
        if (tv.dir > 0 && tv.mesh.position.x > tv.maxX) {
          tv.mesh.position.x = tv.minX;
        } else if (tv.dir < 0 && tv.mesh.position.x < tv.minX) {
          tv.mesh.position.x = tv.maxX;
        }
      }
    }

    if (typeof metroTrain !== 'undefined' && metroTrain) {
      metroTrain.position.x += 16.5 * dt;
      if (metroTrain.position.x > 140) {
        metroTrain.position.x = -140;
      }
    }

    if (typeof cityBeacons !== 'undefined' && cityBeacons.length) {
      var bPulse = Math.sin(elapsed * 3.2) > 0.15;
      beaconMat.color.setHex(bPulse ? 0xef4444 : 0x450a0a);
    }

    // Phone rotation interpolation (Portrait <-> Landscape)
    phoneCurrentRot = THREE.MathUtils.lerp(phoneCurrentRot, phoneTargetRot, dt * 6.0);
    phoneHolder.rotation.z = phoneCurrentRot;

    // Animated Coffee Steam Rise
    if (steamGeo.attributes.position) {
      var pos = steamGeo.attributes.position.array;
      for (var si = 1; si < steamCount * 3; si += 3) {
        pos[si] += dt * 0.06;
        if (pos[si] > 0.22) pos[si] = 0.04;
      }
      steamGeo.attributes.position.needsUpdate = true;
    }

    // Audio Speaker Woofer Micro-Vibration when playing
    if (isAudioPlaying) {
      var vib = Math.sin(elapsed * 18.0) * 0.003;
      spkLeft.children[2].position.z = 0.075 + vib;
      spkRight.children[2].position.z = 0.075 + vib;
    }

    // Camera Smooth Lerp & Drag Offset
    var speed = reduceMotion ? 1.0 : dt * 3.8;
    camPos.lerp(wantPos, speed);
    camTgt.lerp(wantTgt, speed);

    yaw = THREE.MathUtils.lerp(yaw, targetYaw, speed);
    pitch = THREE.MathUtils.lerp(pitch, targetPitch, speed);

    camera.position.copy(camPos);
    camera.lookAt(camTgt);

    camera.rotation.y += yaw;
    camera.rotation.x += pitch;

    camera.updateMatrixWorld(true);

    // Pulse dev dashboard screen
    if (monScreenMat && monScreenMat.map === devScreenTex) {
      renderDevDashboard(elapsed);
    }

    // Update floating 3D device pills in screen space
    var pillVR = document.getElementById('pill-vr');
    var pillPC = document.getElementById('pill-pc');
    var pillPhone = document.getElementById('pill-phone');
    var pillNotes = document.getElementById('pill-notes');

    var pList = [
      { el: pillVR, pos: new THREE.Vector3(-0.48, DESK_Y + 0.28, -0.04) },
      { el: pillPC, pos: new THREE.Vector3(0.35, DESK_Y + 0.58, -0.03) },
      { el: pillPhone, pos: new THREE.Vector3(0.72, DESK_Y + 0.24, 0.02) },
      { el: pillNotes, pos: new THREE.Vector3(-0.06, DESK_Y + 0.16, 0.24) }
    ];

    var halfW = window.innerWidth * 0.5;
    var halfH = window.innerHeight * 0.5;

    pList.forEach(function (item) {
      if (!item.el) return;
      var p3d = item.pos.clone().project(camera);
      if (p3d.z > 1.0) {
        item.el.style.display = 'none';
      } else {
        item.el.style.display = 'inline-flex';
        var sx = (p3d.x * halfW) + halfW;
        var sy = (-(p3d.y * halfH)) + halfH;
        item.el.style.transform = 'translate(' + sx.toFixed(1) + 'px, ' + sy.toFixed(1) + 'px) translate(-50%, -100%)';
      }
    });

    // Raycast hover updates
    if (!isPointerDown && !panel.classList.contains('open')) {
      raycaster.setFromCamera(mouse, camera);
      var hits = raycaster.intersectObjects(pickables, true);
      var found = null;
      if (hits.length > 0) {
        for (var hi = 0; hi < hits.length; hi++) {
          var top = hits[hi].object;
          while (top && top !== scene) {
            if (top.userData && top.userData.key) {
              found = top.userData.key;
              break;
            }
            top = top.parent;
          }
          if (found) break;
        }
      }

      if (found) {
        hoveredKey = found;
        stage.style.cursor = 'pointer';
        if (hintText) {
          hintText.innerHTML = '<b>Interact:</b> ' + (HOVER_DESCRIPTIONS[found] || 'Click to view');
        }
      } else {
        hoveredKey = null;
        stage.style.cursor = isPointerDown ? 'grabbing' : 'default';
        if (hintText) {
          hintText.innerHTML = '<b>Click</b> any device or item on the desk. <b>Drag</b> to look around.';
        }
      }
    }

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    setView(currentPanel || 'overview');
  });

  setTimeout(function () {
    var loader = document.getElementById('loader');
    if (loader) loader.classList.add('done');
    kickAllVideos();
  }, 400);

  animate();
})();

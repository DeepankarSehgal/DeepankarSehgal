/**
 * Deepankar Sehgal · 3D Portfolio & Interactive Workbench
 * Senior Unity & XR Developer · Bengaluru, India
 * 
 * Features:
 * - Real-Time Day/Night Sun Synchronization based on Indian Standard Time (IST)
 * - Live Bengaluru Weather & US AQI Integration (Open-Meteo API)
 * - Continuous Live Video Streaming across PC Monitor, VR Stereo Display, and Mobile Phone
 * - Tropical Beach Shoreline with Animated Beach Volleyball, Players, Umbrellas & Palm Trees
 * - 100% Reliable 3D Device & Prop Click Raycasting (VR, PC, Mobile, Notes, Lamp, Speakers, Mug)
 * - 9 VR & XR Projects, 8 PC & Steam AA Projects, 5 Mobile & Web3 Projects
 * - Procedural Ocean Surf Audio Synthesizer (Web Audio API)
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
          clip: 'trailer',
          name: 'Crimson Tactics: The White Banner',
          kind: 'AA Turn-Based Tactical RPG',
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
          clip: 'trailer',
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
     BEACH SHORELINE, ANIMATED VOLLEYBALL, PEOPLE & OCEAN VISTA
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

  /* Golden Sand Beach Terrain outside the window */
  var sandMat = new THREE.MeshStandardMaterial({
    color: srgb(0xe8d2b0), // Warm golden sand
    roughness: 0.96,
    metalness: 0.02
  });

  var beachGeo = new THREE.PlaneGeometry(800, 180, 48, 48);
  var beachMesh = new THREE.Mesh(beachGeo, sandMat);
  beachMesh.rotation.x = -Math.PI / 2 + 0.03; // Gentle slope toward sea
  beachMesh.position.set(0, -6.1, -85);
  beachMesh.receiveShadow = true;
  scene.add(beachMesh);

  /* Shoreline Wave Foam Line (Advances and retreats) */
  var foamMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide
  });
  var foamRibbon = new THREE.Mesh(new THREE.PlaneGeometry(800, 4.5), foamMat);
  foamRibbon.rotation.x = -Math.PI / 2;
  foamRibbon.position.set(0, -6.45, -165);
  scene.add(foamRibbon);

  /* Gerstner Waves Real-Time Water Shader beyond the beach */
  var oceanUniforms = {
    time: { value: 0 },
    waterDeep: { value: new THREE.Color(0x052842) },
    waterShallow: { value: new THREE.Color(0x0e7490) },
    sunDir: { value: skyUniforms.sunDir.value },
    sunColor: { value: new THREE.Color(0xffedd5) },
    skyHorColor: { value: skyUniforms.bottomColor.value }
  };

  var oceanGeo = new THREE.PlaneGeometry(4500, 2600, 128, 128);
  var oceanMat = new THREE.ShaderMaterial({
    uniforms: oceanUniforms,
    vertexShader: [
      'uniform float time;',
      'varying vec3 vWorldPos;',
      'varying vec3 vNormal;',
      'varying float vWaveHeight;',
      'vec3 gerstnerWave(vec2 dir, float steepness, float wavelength, vec2 pos, inout vec3 tangent, inout vec3 binormal) {',
      '  float k = 2.0 * 3.14159 / wavelength;',
      '  float c = sqrt(9.8 / k);',
      '  vec2 d = normalize(dir);',
      '  float f = k * (dot(d, pos) - c * time * 0.8);',
      '  float a = steepness / k;',
      '  tangent += vec3(-d.x * d.x * (steepness * sin(f)), d.x * (steepness * cos(f)), -d.x * d.y * (steepness * sin(f)));',
      '  binormal += vec3(-d.x * d.y * (steepness * sin(f)), d.y * (steepness * cos(f)), -d.y * d.y * (steepness * sin(f)));',
      '  return vec3(d.x * (a * cos(f)), a * sin(f), d.y * (a * cos(f)));',
      '}',
      'void main() {',
      '  vec3 pos = position;',
      '  vec3 tangent = vec3(1.0, 0.0, 0.0);',
      '  vec3 binormal = vec3(0.0, 0.0, 1.0);',
      '  vec3 p = pos;',
      '  p += gerstnerWave(vec2(1.0, 0.3), 0.22, 60.0, pos.xy, tangent, binormal);',
      '  p += gerstnerWave(vec2(0.7, 0.7), 0.18, 35.0, pos.xy, tangent, binormal);',
      '  p += gerstnerWave(vec2(-0.2, 1.0), 0.12, 18.0, pos.xy, tangent, binormal);',
      '  vec3 norm = normalize(cross(binormal, tangent));',
      '  vWaveHeight = p.z - pos.z;',
      '  vec4 worldPos = modelMatrix * vec4(p, 1.0);',
      '  vWorldPos = worldPos.xyz;',
      '  vNormal = normalize((modelMatrix * vec4(norm, 0.0)).xyz);',
      '  gl_Position = projectionMatrix * viewMatrix * worldPos;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform vec3 waterDeep;',
      'uniform vec3 waterShallow;',
      'uniform vec3 sunDir;',
      'uniform vec3 sunColor;',
      'uniform vec3 skyHorColor;',
      'varying vec3 vWorldPos;',
      'varying vec3 vNormal;',
      'varying float vWaveHeight;',
      'void main() {',
      '  vec3 viewDir = normalize(cameraPosition - vWorldPos);',
      '  vec3 norm = normalize(vNormal);',
      '  float fresnel = pow(1.0 - max(dot(viewDir, norm), 0.0), 3.5);',
      '  vec3 baseWater = mix(waterDeep, waterShallow, fresnel * 0.75 + smoothstep(-1.0, 2.0, vWaveHeight) * 0.25);',
      '  vec3 refDir = reflect(-sunDir, norm);',
      '  float specSharp = pow(max(dot(viewDir, refDir), 0.0), 110.0);',
      '  float specBroad = pow(max(dot(viewDir, refDir), 0.0), 16.0);',
      '  vec3 specular = sunColor * (specSharp * 3.2 + specBroad * 0.4);',
      '  float foam = smoothstep(1.3, 2.2, vWaveHeight);',
      '  vec3 oceanColor = mix(baseWater + specular, vec3(0.92, 0.96, 0.98), foam * 0.4);',
      '  float dist = length(vWorldPos.xz);',
      '  float fog = smoothstep(700.0, 2600.0, dist);',
      '  gl_FragColor = vec4(mix(oceanColor, skyHorColor, fog), 1.0);',
      '}'
    ].join('\n')
  });

  var oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
  oceanMesh.rotation.x = -Math.PI / 2;
  oceanMesh.position.set(0, -6.6, -1450);
  scene.add(oceanMesh);

  /* Tropical Coconut Palm Trees along the Beach */
  var palmMat = new THREE.MeshStandardMaterial({ color: srgb(0x4a3a2d), roughness: 0.9 });
  var palmFrondMat = new THREE.MeshStandardMaterial({ color: srgb(0x2d6b38), roughness: 0.5, side: THREE.DoubleSide });

  function addPalmTree(x, z, scale) {
    var palm = new THREE.Group();
    palm.position.set(x, -6.0, z);
    palm.scale.setScalar(scale || 1.0);
    scene.add(palm);

    // Curved Trunk
    var curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.5, 7, 0.5),
      new THREE.Vector3(2.5, 15, 1.2)
    );
    var trunkGeo = new THREE.TubeGeometry(curve, 16, 0.45, 8, false);
    var trunk = new THREE.Mesh(trunkGeo, palmMat);
    trunk.castShadow = true;
    palm.add(trunk);

    // Arching Fronds
    for (var f = 0; f < 8; f++) {
      var frondShape = new THREE.Shape();
      frondShape.moveTo(0, 0);
      frondShape.quadraticCurveTo(0.6, 2.5, 0.8, 5.0);
      frondShape.quadraticCurveTo(0, 6.5, -0.8, 5.0);
      frondShape.quadraticCurveTo(-0.6, 2.5, 0, 0);
      var frondGeo = new THREE.ShapeGeometry(frondShape);
      var frond = new THREE.Mesh(frondGeo, palmFrondMat);
      var ang = (f / 8) * Math.PI * 2;
      frond.position.set(2.5, 15, 1.2);
      frond.rotation.y = ang;
      frond.rotation.x = 0.55;
      frond.castShadow = true;
      palm.add(frond);
    }
  }

  addPalmTree(-22, -45, 0.95);
  addPalmTree(-28, -60, 1.15);
  addPalmTree(24, -50, 1.05);
  addPalmTree(32, -70, 1.2);

  /* Animated Beach Volleyball Scene with People Playing */
  var vCourtGroup = new THREE.Group();
  vCourtGroup.position.set(-6, -6.0, -55);
  scene.add(vCourtGroup);

  // Volleyball Net
  var poleMat = new THREE.MeshStandardMaterial({ color: srgb(0x38413b), roughness: 0.4, metalness: 0.7 });
  var poleL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 12), poleMat);
  poleL.position.set(-5.5, 1.6, 0);
  vCourtGroup.add(poleL);

  var poleR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 12), poleMat);
  poleR.position.set(5.5, 1.6, 0);
  vCourtGroup.add(poleR);

  var netMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.7,
    roughness: 0.3
  });
  var netMesh = new THREE.Mesh(new THREE.PlaneGeometry(11, 1.1), netMat);
  netMesh.position.set(0, 2.4, 0);
  vCourtGroup.add(netMesh);

  // Court boundary ribbon
  var courtLine = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 16),
    new THREE.MeshBasicMaterial({ color: 0x0284c7, wireframe: true })
  );
  courtLine.rotation.x = -Math.PI / 2;
  courtLine.position.y = 0.02;
  vCourtGroup.add(courtLine);

  // Volleyball Players (Stylized Beach Athletes in Beachwear)
  function createVolleyballPlayer(colorHex, x, z, ry) {
    var p = new THREE.Group();
    p.position.set(x, 0, z);
    p.rotation.y = ry;
    vCourtGroup.add(p);

    var skinMat = new THREE.MeshStandardMaterial({ color: srgb(0xd29d72), roughness: 0.6 });
    var clothesMat = new THREE.MeshStandardMaterial({ color: srgb(colorHex), roughness: 0.5 });

    // Legs / shorts
    var shorts = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.55, 10), clothesMat);
    shorts.position.y = 0.8;
    p.add(shorts);

    // Torso (Jersey)
    var torso = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.7, 10), clothesMat);
    torso.position.y = 1.4;
    torso.castShadow = true;
    p.add(torso);

    // Head
    var head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), skinMat);
    head.position.y = 1.95;
    p.add(head);

    // Raised Arms
    [-0.32, 0.32].forEach(function (ax) {
      var arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.65, 8), skinMat);
      arm.position.set(ax, 1.6, 0.2);
      arm.rotation.x = 0.8;
      p.add(arm);
    });

    return p;
  }

  var vPlayer1 = createVolleyballPlayer(0xd95b26, -2.5, 4.5, Math.PI); // Team A Near Net
  var vPlayer2 = createVolleyballPlayer(0x0284c7, 2.8, 5.5, Math.PI - 0.2); // Team A Back
  var vPlayer3 = createVolleyballPlayer(0x10b981, -1.8, -4.5, 0); // Team B Near Net
  var vPlayer4 = createVolleyballPlayer(0xf59e0b, 2.2, -5.8, 0.2); // Team B Back

  // The Flying Volleyball
  var vBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xfff275, roughness: 0.3 })
  );
  vBall.castShadow = true;
  vCourtGroup.add(vBall);

  // Beach Umbrellas & Loungers
  function addBeachUmbrella(x, z, col1, col2) {
    var u = new THREE.Group();
    u.position.set(x, -5.9, z);
    scene.add(u);

    var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8), poleMat);
    pole.position.y = 1.6;
    pole.rotation.z = -0.12;
    u.add(pole);

    var canopy = new THREE.Mesh(
      new THREE.ConeGeometry(2.4, 0.9, 16),
      new THREE.MeshStandardMaterial({ color: srgb(col1), roughness: 0.4, side: THREE.DoubleSide })
    );
    canopy.position.set(-0.2, 3.0, 0);
    canopy.rotation.z = -0.12;
    canopy.castShadow = true;
    u.add(canopy);

    // Reclining Beach Lounger
    var lounger = new THREE.Mesh(
      roundedBox(0.9, 0.35, 2.2, 0.04, 3),
      new THREE.MeshStandardMaterial({ color: srgb(0xfaf3e0), roughness: 0.7 })
    );
    lounger.position.set(0.6, 0.2, 0.4);
    lounger.rotation.y = 0.3;
    u.add(lounger);
  }

  addBeachUmbrella(12, -42, 0xef4444, 0xffffff);
  addBeachUmbrella(18, -48, 0x0284c7, 0xffffff);

  // Shoreline Walking Beachgoers
  var walkerGroup = new THREE.Group();
  walkerGroup.position.set(2, -6.3, -150);
  scene.add(walkerGroup);

  var walker1 = createVolleyballPlayer(0xec4899, 0, 0, Math.PI / 2);
  walker1.scale.setScalar(0.85);
  walkerGroup.add(walker1);

  var walker2 = createVolleyballPlayer(0x3b82f6, 1.5, 0.5, Math.PI / 2);
  walker2.scale.setScalar(0.85);
  walkerGroup.add(walker2);

  // Tiki Torches (Beach lighting at night)
  function addTikiTorch(x, z) {
    var torch = new THREE.Group();
    torch.position.set(x, -6.0, z);
    scene.add(torch);

    var bamboo = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 2.6, 8), palmMat);
    bamboo.position.y = 1.3;
    torch.add(bamboo);

    var flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.35, 12),
      new THREE.MeshBasicMaterial({ color: 0xff6600 })
    );
    flame.position.y = 2.7;
    torch.add(flame);

    addTikiTorchLight(x, -3.3, z);
  }

  addTikiTorch(-14, -40);
  addTikiTorch(4, -40);
  addTikiTorch(-14, -72);
  addTikiTorch(4, -72);

  /* Distant Headlands, Lighthouse & Sailboat */
  var cliffMat = new THREE.MeshStandardMaterial({ color: srgb(0x32463e), roughness: 0.9, metalness: 0.05 });
  function makeCliff(x, z, scaleX, scaleY, scaleZ) {
    var cGeo = new THREE.ConeGeometry(scaleX, scaleY, 8);
    var cMesh = new THREE.Mesh(cGeo, cliffMat);
    cMesh.position.set(x, -6.0 + scaleY / 2, z);
    cMesh.scale.set(1.5, 0.5, 1.3);
    scene.add(cMesh);
  }
  makeCliff(-460, -980, 260, 110, 200);
  makeCliff(540, -1180, 310, 125, 230);

  var lhGroup = new THREE.Group();
  lhGroup.position.set(-290, 28, -920);
  scene.add(lhGroup);

  var lhTower = new THREE.Mesh(
    new THREE.CylinderGeometry(2.8, 4.8, 32, 12),
    new THREE.MeshStandardMaterial({ color: srgb(0xf4f4f0), roughness: 0.6 })
  );
  lhGroup.add(lhTower);

  var lhTop = new THREE.Mesh(
    new THREE.CylinderGeometry(3.4, 3.4, 4.5, 12),
    new THREE.MeshStandardMaterial({ color: srgb(0x991b1b), roughness: 0.4 })
  );
  lhTop.position.y = 17.5;
  lhGroup.add(lhTop);

  var lhBeacon = new THREE.PointLight(0xffedd5, 1.8, 450);
  lhBeacon.position.set(0, 19, 0);
  lhGroup.add(lhBeacon);

  var beamGeo = new THREE.ConeGeometry(35, 180, 16, 1, true);
  beamGeo.translate(0, 90, 0);
  beamGeo.rotateX(Math.PI / 2);
  var beamMat = new THREE.MeshBasicMaterial({
    color: 0xffedd5,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  var lhBeam = new THREE.Mesh(beamGeo, beamMat);
  lhBeam.position.set(0, 19, 0);
  lhGroup.add(lhBeam);

  var boatGroup = new THREE.Group();
  boatGroup.position.set(140, -5.5, -520);
  scene.add(boatGroup);

  var boatHull = new THREE.Mesh(roundedBox(5.0, 1.4, 14, 0.3, 3), new THREE.MeshStandardMaterial({ color: srgb(0xffffff), roughness: 0.4 }));
  boatGroup.add(boatHull);

  var mastMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 16, 8), new THREE.MeshStandardMaterial({ color: srgb(0x3a3f42), roughness: 0.5 }));
  mastMesh.position.set(0, 8, 1);
  boatGroup.add(mastMesh);

  var sailGeo = new THREE.BufferGeometry();
  var sailVerts = new Float32Array([0, 1.5, -4.5, 0, 15.5, 0.8, 0, 1.5, 4.5]);
  sailGeo.setAttribute('position', new THREE.BufferAttribute(sailVerts, 3));
  sailGeo.computeVertexNormals();
  var sailMesh = new THREE.Mesh(sailGeo, new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
  boatGroup.add(sailMesh);

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
    var hbMat = new THREE.MeshBasicMaterial({ visible: false, wireframe: true });
    var hbMesh = new THREE.Mesh(hbGeo, hbMat);
    hbMesh.position.set(ox || 0, oy || 0, oz || 0);
    hbMesh.userData.key = key;
    parentGroup.add(hbMesh);
    pickables.push(hbMesh);
    return hbMesh;
  }

  function registerPickable(obj, key) {
    obj.userData.key = key;
    pickables.push(obj);
    obj.traverse(function (child) {
      if (child.isMesh) child.userData.key = key;
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
  addHitbox(gVR, 'vr', 0.55, 0.28, 0.42, 0, 0.05, -0.05);

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
  addHitbox(gWallTV, 'vr', 0.74, 0.45, 0.1, 0, 0, 0);

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

  var monScreenMat = new THREE.MeshBasicMaterial({ color: 0xe0e0e0 });
  var monScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.855, 0.475), monScreenMat);
  monScreenMesh.position.z = 0.0135;
  gPC.add(monScreenMesh);

  // Large PC Hitbox encompassing monitor and arm
  addHitbox(gPC, 'pc', 0.94, 0.56, 0.25, 0, 0, 0);

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
  addHitbox(gPhone, 'phone', 0.22, 0.26, 0.22, 0, 0.05, 0);

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

  addHitbox(gNotes, 'notes', 0.32, 0.15, 0.28, 0, 0.05, 0);

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

  addHitbox(gLamp, 'lamp', 0.36, 0.72, 0.36, 0.1, 0.35, 0);

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

  /* ==========================================================================
     CONTINUOUS VIDEO SYNCHRONIZATION
     ========================================================================== */

  function showClip(groupKey) {
    if (groupKey === 'pc') {
      var p = GROUPS.pc.projects[showing.pc];
      var c = clip(p ? p.clip : 'trailer');
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

  showClip('pc');
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

    oceanUniforms.sunDir.value.copy(p.sunDir);
    oceanUniforms.sunColor.value.setHex(p.sunColor);
    oceanUniforms.waterDeep.value.setHex(p.waterDeep);
    oceanUniforms.waterShallow.value.setHex(p.waterShallow);
    oceanUniforms.skyHorColor.value.setHex(p.botSky);

    deskSpot.intensity = isLampOn ? p.lampIntensity : 0;
    roomCeilLight.intensity = p.ceilIntensity;
    monGlow.intensity = p.monGlowIntensity;

    tikiLights.forEach(function (tl) { tl.intensity = p.tikiIntensity; });

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
    speakers: 'Studio Monitors · Click to Toggle Ocean Waves Audio',
    lamp: 'Desk Task Lamp · Click to Toggle Light',
    mug: 'Ceramic Mug · Click to Sip Hot Coffee'
  };

  var hintText = document.getElementById('hint-text');

  function triggerInteraction(key) {
    if (key === 'vr') showGroup('vr');
    else if (key === 'pc') showGroup('pc');
    else if (key === 'phone') showGroup('phone');
    else if (key === 'notes') showNotes();
    else if (key === 'lamp') toggleDeskLamp();
    else if (key === 'speakers') toggleOceanAudio();
    else if (key === 'mug') sipCoffee();
  }

  stage.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    isDragging = true;
    dragStart.x = e.clientX;
    dragStart.y = e.clientY;
    downPos.x = e.clientX;
    downPos.y = e.clientY;
  });

  window.addEventListener('pointermove', function (e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (isDragging) {
      var dx = e.clientX - dragStart.x;
      var dy = e.clientY - dragStart.y;
      dragStart.x = e.clientX;
      dragStart.y = e.clientY;

      targetYaw += dx * 0.0022;
      targetPitch += dy * 0.0018;

      targetYaw = THREE.MathUtils.clamp(targetYaw, -0.55, 0.55);
      targetPitch = THREE.MathUtils.clamp(targetPitch, -0.3, 0.3);
    }
  });

  window.addEventListener('pointerup', function (e) {
    isDragging = false;
    var moved = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);

    // If mouse didn't drag, treat as deliberate click
    if (moved < 8 && !panel.classList.contains('open')) {
      var clickNDC = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(clickNDC, camera);
      var hits = raycaster.intersectObjects(pickables, true);
      for (var i = 0; i < hits.length; i++) {
        var obj = hits[i].object;
        while (obj) {
          if (obj.userData && obj.userData.key) {
            triggerInteraction(obj.userData.key);
            return;
          }
          obj = obj.parent;
        }
      }
    }
  });

  /* ==========================================================================
     TOAST NOTIFICATIONS & OCEAN SURF SYNTHESIZER
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
  function toggleOceanAudio() {
    try {
      if (!audioCtx) {
        var AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        var bufferSize = audioCtx.sampleRate * 2.5;
        var noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        var output = noiseBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        var whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        var filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, audioCtx.currentTime);

        var lfo = audioCtx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime);
        var lfoGain = audioCtx.createGain();
        lfoGain.gain.setValueAtTime(240, audioCtx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        audioGain = audioCtx.createGain();
        audioGain.gain.setValueAtTime(0, audioCtx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(audioGain);
        audioGain.connect(audioCtx.destination);

        whiteNoise.start();
        lfo.start();
      }

      if (audioCtx.state === 'suspended') audioCtx.resume();
      isAudioPlaying = !isAudioPlaying;

      if (isAudioPlaying) {
        audioGain.gain.setTargetAtTime(0.25, audioCtx.currentTime, 1.2);
        showToast('🌊 Ocean Surf: ON');
      } else {
        audioGain.gain.setTargetAtTime(0.0, audioCtx.currentTime, 0.6);
        showToast('🌊 Ocean Surf: OFF');
      }

      var label = document.getElementById('audio-label');
      var btn = document.getElementById('btn-audio');
      if (label) label.textContent = 'Ocean Surf: ' + (isAudioPlaying ? 'ON' : 'OFF');
      if (btn) btn.classList.toggle('active-audio', isAudioPlaying);
    } catch (err) {
      console.warn('Audio not available:', err);
    }
  }

  var btnAudio = document.getElementById('btn-audio');
  if (btnAudio) btnAudio.addEventListener('click', toggleOceanAudio);

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

    pBody.innerHTML =
      '<div class="detail">' +
      '<div class="capture">' + vtag(p.clip) + '</div>' +
      '<p>' + esc(p.blurb) + '</p>' +
      '<p class="dim">' + esc(p.note) + '</p>' +
      teardownHtml +
      tagsHtml +
      '<button class="backbtn" type="button" data-back="group">← All ' + esc(gr.label) + ' Work</button>' +
      '</div>';

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

    // Ocean Wave Displacements
    oceanUniforms.time.value = elapsed;

    // Shoreline Wave Foam Breathing Oscillation
    foamRibbon.position.z = -165 + Math.sin(elapsed * 1.4) * 3.8;
    foamMat.opacity = 0.35 + Math.sin(elapsed * 1.4) * 0.2;

    // Lighthouse Volumetric Sweeping Beam
    lhBeam.rotation.z = -elapsed * 0.75;
    lhBeacon.intensity = 1.0 + Math.sin(elapsed * 3.5) * 0.6;

    // Sailboat Wave Rocking
    boatGroup.rotation.z = Math.sin(elapsed * 1.4) * 0.05;
    boatGroup.position.y = -5.5 + Math.sin(elapsed * 1.6) * 0.25;

    // Animated Beach Volleyball Match
    var vT = (elapsed * 1.6) % 2.0;
    var ballX = -1.0 + Math.sin(vT * Math.PI) * 2.8;
    var ballZ = Math.cos(vT * Math.PI) * 5.2;
    var ballY = 2.4 + Math.sin(vT * Math.PI) * 2.6; // High parabolic arc over net
    vBall.position.set(ballX, ballY, ballZ);

    // Volleyball Players Jump & Set Reactions
    vPlayer1.position.y = Math.max(0, Math.sin(vT * Math.PI * 2) * 0.45);
    vPlayer3.position.y = Math.max(0, -Math.sin(vT * Math.PI * 2) * 0.45);

    // Shoreline Walkers
    walkerGroup.position.x = ((elapsed * 1.5) % 80) - 40;
    walker1.children[0].rotation.x = Math.sin(elapsed * 3.0) * 0.35;
    walker2.children[0].rotation.x = -Math.sin(elapsed * 3.0) * 0.35;

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

    // Raycast hover updates
    if (!isDragging && !panel.classList.contains('open')) {
      raycaster.setFromCamera(mouse, camera);
      var hits = raycaster.intersectObjects(pickables, true);
      var found = null;
      if (hits.length > 0) {
        var top = hits[0].object;
        while (top) {
          if (top.userData && top.userData.key) {
            found = top.userData.key;
            break;
          }
          top = top.parent;
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
        stage.style.cursor = isDragging ? 'grabbing' : 'default';
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

/* ==========================================================================
   DEEPANKAR SEHGAL - NASTY GAME CATALOG (nasty2x.in) ENGINE
   Features: Canvas Reveal Effect, Real-Time Search & Filters, Game Detail Modals,
   WebAudio Synth & Ambient Audio Equalizer, 3-in-1 Arcade Hub
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. ACETERNITY UI STYLE CANVAS REVEAL EFFECT
     ========================================== */
  const canvas = document.getElementById('canvas-reveal');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouseX = -1000, mouseY = -1000;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const dots = [];
    const spacing = 32;

    function initGrid() {
      dots.length = 0;
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing + spacing / 2,
            y: j * spacing + spacing / 2,
            baseRadius: 1.5,
            color: (i + j) % 3 === 0 ? 'rgba(6, 182, 212, ' : (i + j) % 3 === 1 ? 'rgba(139, 92, 246, ' : 'rgba(16, 185, 129, '
          });
        }
      }
    }
    initGrid();

    function renderCanvasReveal() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dist = Math.hypot(mouseX - d.x, mouseY - d.y);
        const radiusLimit = 160;

        if (dist < radiusLimit) {
          const factor = (1 - dist / radiusLimit);
          const r = d.baseRadius + factor * 3.5;
          const alpha = 0.15 + factor * 0.7;

          ctx.fillStyle = d.color + alpha + ')';
          ctx.beginPath();
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
          ctx.fill();

          if (factor > 0.6) {
            ctx.shadowColor = d.color + '0.8)';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.baseRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(renderCanvasReveal);
    }
    renderCanvasReveal();
  }

  /* ==========================================
     2. WEBAUDIO SYNTHESIZER & AMBIENT ENGINE
     ========================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playHover() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(550, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {}
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1100, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.07);
      } catch (e) {}
    }
  }

  const sound = new SoundEngine();

  // Audio Equalizer Button Toggle
  const audioVizBtn = document.getElementById('audio-viz-btn');
  const audioBtnText = document.getElementById('audio-btn-text');
  let audioActive = true;

  if (audioVizBtn) {
    audioVizBtn.addEventListener('click', () => {
      audioActive = !audioActive;
      sound.enabled = audioActive;

      if (audioActive) {
        audioVizBtn.classList.remove('muted');
        if (audioBtnText) audioBtnText.textContent = 'AUDIO ON';
        sound.playClick();
      } else {
        audioVizBtn.classList.add('muted');
        if (audioBtnText) audioBtnText.textContent = 'MUTED';
      }
    });
  }

  document.querySelectorAll('[data-sound="hover"]').forEach(el => {
    el.addEventListener('mouseenter', () => sound.playHover());
  });
  document.querySelectorAll('[data-sound="click"]').forEach(el => {
    el.addEventListener('click', () => sound.playClick());
  });

  /* ==========================================
     3. THEME SWITCHER (DARK / LIGHT)
     ========================================== */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  const savedTheme = localStorage.getItem('nasty_theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      sound.playClick();
      const isLight = document.documentElement.classList.contains('light');

      if (isLight) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('nasty_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('nasty_theme', 'light');
      }
    });
  }

  /* ==========================================
     4. REAL-TIME SEARCH & FILTER ENGINE
     ========================================== */
  const searchInput = document.getElementById('game-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const filterPills = document.querySelectorAll('.filter-pill');
  const gameCards = document.querySelectorAll('.game-card');
  const catalogCountText = document.getElementById('catalog-count-text');

  let activeFilter = 'all';
  let searchQuery = '';

  function filterCatalog() {
    let visibleCount = 0;

    gameCards.forEach(card => {
      const category = card.dataset.category || '';
      const keywords = (card.dataset.keywords || '').toLowerCase();
      const titleText = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const snippetText = card.querySelector('.card-snippet')?.textContent.toLowerCase() || '';

      const matchesCategory = (activeFilter === 'all') || category.includes(activeFilter);
      const matchesSearch = !searchQuery || 
                            keywords.includes(searchQuery) || 
                            titleText.includes(searchQuery) || 
                            snippetText.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (catalogCountText) {
      catalogCountText.textContent = `Showing ${visibleCount} of 11 Games`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
      }
      filterCatalog();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      sound.playClick();
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      filterCatalog();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      sound.playClick();
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      filterCatalog();
    });
  });

  /* ==========================================
     5. NASTY GAME DETAIL MODAL SYSTEM (11 REAL PROJECTS)
     ========================================== */
  const gameDetailData = {
    1: {
      rank: "#01 TOP RANK",
      score: "9.9 / 10",
      tag: "VR SIMULATION",
      platform: "UNITY3D • OCULUS",
      title: "Interactive VR Environment & Gameplay System",
      desc: "Immersive Virtual Reality environment navigation, physics interactions, diegetic UI, and spatial hand tracking in Unity.",
      video: "https://drive.google.com/file/d/1oJ2sEXtZp7IDF6LlwkE6-JBUGZsOFOCO/preview",
      specs: [
        "VR environment physics interaction & object manipulation",
        "Spatial raycasting & diegetic VR UI navigation",
        "Optimized Oculus Quest standalone 72/90 FPS rendering"
      ],
      store: ""
    },
    2: {
      rank: "#02 AA STEAM RELEASE",
      score: "9.8 / 10",
      tag: "AA STEAM TITLE",
      platform: "PC • STEAM",
      title: "Crimson Tactics: The Rise of The White Banner",
      desc: "AA turn-based tactical RPG developed at Black March Studios. Features strategic grid combat, spell AI logic, and Steam release.",
      video: "https://www.youtube.com/embed/jB3Dg2dtQW0?autoplay=1",
      specs: [
        "Turn-based tactics grid pathfinding & spell calculation",
        "Boss AI state machines & combat camera flow",
        "Published on PC Steam Store"
      ],
      store: "https://store.steampowered.com/app/1480810/CrimsonTacticsTheRiseofTheWhite_Banner/"
    },
    3: {
      rank: "#03 5M+ PLAYERS",
      score: "9.7 / 10",
      tag: "WEB3 & MULTIPLAYER",
      platform: "PUN2 • PLAYFAB",
      title: "YungAlgo Web3 Multiplayer Suite",
      desc: "Architected 5 shippable titles scaling to over 5,000,000 active users during the Linea Park campaign with Photon PUN2 & PlayFab.",
      video: "https://drive.google.com/file/d/1UlJ5SeT0yf5Hy3pZNv-kMjZEFS9TX4tc/preview",
      specs: [
        "Scaled room matchmaking & state sync for 5M+ players",
        "Solana / Linea crypto wallet authentication & NFT verification",
        "Photon PUN2 real-time low-latency multiplayer"
      ],
      store: ""
    },
    4: {
      rank: "#04 ENTERPRISE XR",
      score: "9.6 / 10",
      tag: "AR / VR",
      platform: "META QUEST 2/3",
      title: "Simulanis Industrial XR Simulator",
      desc: "Enterprise safety and procedural VR training simulations built at Simulanis using XR Interaction Toolkit for Meta Oculus Quest.",
      video: "https://drive.google.com/file/d/1zJCi4QBff7G6eV_Heav7oHG_HtjanuCn/preview",
      specs: [
        "Realistic hand grabbing & tool physics in VR",
        "Industrial checklist step verification engine",
        "Meta Quest 2 & 3 standalone APK optimization"
      ],
      store: ""
    },
    5: {
      rank: "#05 VR PHYSICS",
      score: "9.5 / 10",
      tag: "AR / VR",
      platform: "OCULUS QUEST",
      title: "XR Interaction & Spatial Physics",
      desc: "Spatial hand-tracking, tactile object grabbing, curved canvas menus, and physics-based interactions.",
      video: "https://www.youtube.com/embed/dj_jWsqDBSA?autoplay=1",
      specs: [
        "Oculus SDK integration with hand gesture detection",
        "Spatial raycasting & diegetic VR UI elements"
      ],
      store: ""
    },
    6: {
      rank: "#06 MULTIPLAYER",
      score: "9.4 / 10",
      tag: "PHOTON PUN2",
      platform: "REALTIME NETWORKING",
      title: "Photon PUN2 Multiplayer Engine",
      desc: "Real-time room matchmaking lobbies, player transform synchronization, RPC calls, and network state management.",
      video: "https://www.youtube.com/embed/-VInUgHpBTk?autoplay=1",
      specs: [
        "Lag compensation & smooth transform interpolation",
        "Custom lobby search & room creation flow"
      ],
      store: ""
    },
    7: {
      rank: "#07 GRAPHICS & LIGHTING",
      score: "9.4 / 10",
      tag: "MOBILE & PC",
      platform: "HIGH FPS",
      title: "3D Environment Lighting Showcase",
      desc: "3D environment rendering, baked global illumination, particle weather systems, and sound effects.",
      video: "https://www.youtube.com/embed/mf6ibnYrnAU?autoplay=1",
      specs: [
        "Occlusion culling & GPU instancing for smooth 60 FPS",
        "Volumetric fog & realistic lightmaps"
      ],
      store: ""
    },
    8: {
      rank: "#08 COMBAT AI",
      score: "9.3 / 10",
      tag: "AI SYSTEMS",
      platform: "GAMEPLAY LOGIC",
      title: "Enemy AI & Combat Mechanics",
      desc: "Enemy AI state machines, line-of-sight detection, weapon recoil algorithms, and hit reaction physics.",
      video: "https://www.youtube.com/embed/jrj3QT4mOyM?autoplay=1",
      specs: [
        "Finite State Machine (FSM) enemy decision making",
        "Dynamic hitboxes & ragdoll physics transitions"
      ],
      store: ""
    },
    9: {
      rank: "#09 AR FOUNDATION",
      score: "9.3 / 10",
      tag: "AR FOUNDATION",
      platform: "MOBILE AR",
      title: "Mobile AR Plane Detection",
      desc: "Augmented reality surface detection, raycasting, and interactive 3D model placement using AR Foundation.",
      video: "https://drive.google.com/file/d/1NEj9m6oPL8kMdRJ_getv2W0pL2xu4FJ8/preview",
      specs: [
        "ARCore & ARKit plane tracking algorithms",
        "Touch gesture 3D object rotation & scale control"
      ],
      store: ""
    },
    10: {
      rank: "#10 VR CINEMA",
      score: "9.2 / 10",
      tag: "VR CINEMA",
      platform: "GOOGLE PLAY STORE",
      title: "Irusu VR Cinema & Educational App",
      desc: "360° video playback, drive-in theater modes, and multiplayer anatomy education app published on Google Play.",
      video: "https://drive.google.com/file/d/1oeNAinVpS1Cg0AN6HsgAmsE9Rj3zCdbI/preview",
      specs: [
        "360° video texture rendering & spatial audio",
        "Published on Google Play Store"
      ],
      store: "https://play.google.com/store/apps/details?id=com.lrusu.HumanAnatomyPro"
    },
    11: {
      rank: "#11 VR CURVED UI",
      score: "9.1 / 10",
      tag: "VR UI CANVAS",
      platform: "CURVED CANVAS",
      title: "Curved VR UI & Eye Selection",
      desc: "Diegetic VR user interfaces, curved canvas rendering, and gaze/pointer menu selection.",
      video: "https://drive.google.com/file/d/1LwCNfPA3Ei0pzery_6nVf5EQ9rHzYXDa/preview",
      specs: [
        "Diegetic 3D UI panel positioning in virtual space",
        "Gaze timer & VR controller laser pointer"
      ],
      store: ""
    }
  };

  const gameDetailModal = document.getElementById('gameDetailModal');
  const closeDetailBtn = document.querySelector('.close-detail');

  const mRank = document.getElementById('m-rank');
  const mScore = document.getElementById('m-score');
  const mTag = document.getElementById('m-tag');
  const mPlatform = document.getElementById('m-platform');
  const mTitle = document.getElementById('m-title');
  const mDesc = document.getElementById('m-desc');
  const mVideoIframe = document.getElementById('m-video-iframe');
  const mSpecsList = document.getElementById('m-specs-list');
  const mStoreBtn = document.getElementById('m-store-btn');

  gameCards.forEach(card => {
    card.addEventListener('click', () => {
      sound.playClick();
      const id = card.dataset.id;
      const data = gameDetailData[id];

      if (data && gameDetailModal) {
        if (mRank) mRank.textContent = data.rank;
        if (mScore) mScore.innerHTML = `<i class="fa-solid fa-star"></i> ${data.score}`;
        if (mTag) mTag.textContent = data.tag;
        if (mPlatform) mPlatform.textContent = data.platform;
        if (mTitle) mTitle.textContent = data.title;
        if (mDesc) mDesc.textContent = data.desc;
        if (mVideoIframe) mVideoIframe.src = data.video;

        if (mSpecsList) {
          mSpecsList.innerHTML = '';
          data.specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            mSpecsList.appendChild(li);
          });
        }

        if (mStoreBtn) {
          if (data.store) {
            mStoreBtn.href = data.store;
            mStoreBtn.classList.remove('hidden');
          } else {
            mStoreBtn.classList.add('hidden');
          }
        }

        gameDetailModal.style.display = 'flex';
      }
    });
  });

  if (closeDetailBtn) {
    closeDetailBtn.addEventListener('click', () => {
      if (gameDetailModal) {
        gameDetailModal.style.display = 'none';
        if (mVideoIframe) mVideoIframe.src = '';
      }
    });
  }

  if (gameDetailModal) {
    gameDetailModal.addEventListener('click', (e) => {
      if (e.target === gameDetailModal) {
        gameDetailModal.style.display = 'none';
        if (mVideoIframe) mVideoIframe.src = '';
      }
    });
  }

  /* ==========================================
     6. INTERACTIVE CONSOLE ENGINE
     ========================================== */
  const termInput = document.getElementById('term-input');
  const termOutput = document.getElementById('term-output');
  const termChips = document.querySelectorAll('.term-chip');

  function executeCommand(cmd) {
    if (!termOutput) return;
    const trimmed = cmd.trim().toLowerCase();
    sound.playClick();

    const cmdLine = document.createElement('p');
    cmdLine.className = 'term-line cmd';
    cmdLine.textContent = `DEEPANKAR.DEV > ${cmd}`;
    termOutput.appendChild(cmdLine);

    const resLine = document.createElement('p');
    resLine.className = 'term-line sys';

    switch (trimmed) {
      case 'help':
        resLine.innerHTML = 'Available commands: <span class="highlight">skills</span>, <span class="highlight">projects</span>, <span class="highlight">experience</span>, <span class="highlight">play</span>, <span class="highlight">cv</span>, <span class="highlight">clear</span>';
        break;
      case 'skills':
        resLine.innerHTML = 'Scrolling to Tech Loadout...';
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'projects':
      case 'showcase':
        resLine.innerHTML = 'Scrolling to Ranked Game Showcase...';
        document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'experience':
      case 'quests':
        resLine.innerHTML = 'Scrolling to Experience Tiers...';
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'play':
      case 'game':
      case 'arcade':
        resLine.innerHTML = 'Launching Mini-Game Hub...';
        openArcade();
        break;
      case 'cv':
      case 'resume':
        resLine.innerHTML = 'Opening Resume PDF in new tab...';
        window.open('assets/Deepankar_UnityDeveloper_CV.pdf', '_blank');
        break;
      case 'clear':
        termOutput.innerHTML = '<p class="term-line">Terminal cleared. Type <span class="highlight">help</span> for commands.</p>';
        return;
      default:
        resLine.innerHTML = `Command '${cmd}' not recognized. Type <span class="highlight">help</span> for commands.`;
        break;
    }

    termOutput.appendChild(resLine);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && termInput.value) {
        executeCommand(termInput.value);
        termInput.value = '';
      }
    });
  }

  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      executeCommand(chip.dataset.cmd);
    });
  });

  /* ==========================================
     7. MULTI-GAME ARCADE HUB ENGINE
     ========================================== */
  const arcadeModal = document.getElementById('arcadeModal');
  const arcadeLaunchBtn = document.getElementById('arcade-launch-btn');
  const closeArcadeBtn = document.getElementById('close-arcade');
  const gameSelectBtns = document.querySelectorAll('.game-tab-btn');

  const gameStartOverlay = document.getElementById('game-start-overlay');
  const gameOverOverlay = document.getElementById('game-over-overlay');
  const startGameBtn = document.getElementById('start-game-btn');
  const restartGameBtn = document.getElementById('restart-game-btn');

  const gameScoreEl = document.getElementById('game-score');
  const gameHighScoreEl = document.getElementById('game-highscore');
  const finalScoreEl = document.getElementById('final-score');
  const gameStartTitle = document.getElementById('game-start-title');
  const gameStartDesc = document.getElementById('game-start-desc');
  const gameHintText = document.getElementById('game-hint-text');

  const arcadeCanvas = document.getElementById('arcade-canvas');
  const memoryBoard = document.getElementById('memory-game-board');

  let currentGame = 'defender';
  let gameRunning = false;
  let gameScore = 0;
  let highScore = localStorage.getItem('nasty_highscore_' + currentGame) || 0;
  if (gameHighScoreEl) gameHighScoreEl.textContent = highScore;

  function openArcade() {
    sound.playClick();
    if (arcadeModal) arcadeModal.style.display = 'flex';
    switchGame('defender');
  }

  function closeArcade() {
    if (arcadeModal) arcadeModal.style.display = 'none';
    gameRunning = false;
  }

  if (arcadeLaunchBtn) arcadeLaunchBtn.addEventListener('click', openArcade);
  if (closeArcadeBtn) closeArcadeBtn.addEventListener('click', closeArcade);

  function switchGame(gameType) {
    currentGame = gameType;
    gameRunning = false;

    gameSelectBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.game === gameType);
    });

    highScore = localStorage.getItem('nasty_highscore_' + currentGame) || 0;
    if (gameHighScoreEl) gameHighScoreEl.textContent = highScore;
    if (gameScoreEl) gameScoreEl.textContent = '0';

    if (gameStartOverlay) gameStartOverlay.classList.remove('hidden');
    if (gameOverOverlay) gameOverOverlay.classList.add('hidden');

    if (gameType === 'memory') {
      arcadeCanvas.style.display = 'none';
      memoryBoard.classList.remove('hidden');
      if (gameStartTitle) gameStartTitle.textContent = 'Memory Core';
      if (gameStartDesc) gameStartDesc.textContent = 'Flip & match Unity, VR & Slot game symbol pairs!';
      if (gameHintText) gameHintText.innerHTML = '<i class="fa-solid fa-hand-pointer"></i> Click cards to flip & match';
    } else if (gameType === 'dodger') {
      arcadeCanvas.style.display = 'block';
      memoryBoard.classList.add('hidden');
      if (gameStartTitle) gameStartTitle.textContent = 'Neon Dodger';
      if (gameStartDesc) gameStartDesc.textContent = 'Move mouse left & right to dodge falling laser barriers!';
      if (gameHintText) gameHintText.innerHTML = '<i class="fa-solid fa-arrows-left-right"></i> Move mouse left / right to dodge';
    } else {
      arcadeCanvas.style.display = 'block';
      memoryBoard.classList.add('hidden');
      if (gameStartTitle) gameStartTitle.textContent = 'Cyber Defender';
      if (gameStartDesc) gameStartDesc.textContent = 'Click / tap incoming bug nodes before they breach the defense shield!';
      if (gameHintText) gameHintText.innerHTML = '<i class="fa-solid fa-mouse"></i> Aim & click to shoot';
    }
  }

  gameSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      switchGame(btn.dataset.game);
    });
  });

  if (arcadeCanvas) {
    const actx = arcadeCanvas.getContext('2d');
    let targets = [];
    let obstacles = [];
    let powerups = [];
    let explosions = [];
    let spawnTimer = 0;
    let playerX = 350;

    arcadeCanvas.addEventListener('mousemove', (e) => {
      const rect = arcadeCanvas.getBoundingClientRect();
      playerX = (e.clientX - rect.left) * (arcadeCanvas.width / rect.width);
    });

    function startGame() {
      sound.playClick();
      gameScore = 0;
      targets = [];
      obstacles = [];
      powerups = [];
      explosions = [];
      if (gameScoreEl) gameScoreEl.textContent = '0';
      if (gameStartOverlay) gameStartOverlay.classList.add('hidden');
      if (gameOverOverlay) gameOverOverlay.classList.add('hidden');
      gameRunning = true;

      if (currentGame === 'memory') {
        initMemoryGame();
      } else {
        requestAnimationFrame(gameLoop);
      }
    }

    if (startGameBtn) startGameBtn.addEventListener('click', startGame);
    if (restartGameBtn) restartGameBtn.addEventListener('click', startGame);

    arcadeCanvas.addEventListener('click', (e) => {
      if (!gameRunning || currentGame !== 'defender') return;
      sound.playClick();

      const rect = arcadeCanvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (arcadeCanvas.width / rect.width);
      const clickY = (e.clientY - rect.top) * (arcadeCanvas.height / rect.height);

      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        const dist = Math.hypot(clickX - t.x, clickY - t.y);

        if (dist < t.radius + 10) {
          gameScore += 10;
          if (gameScoreEl) gameScoreEl.textContent = gameScore;

          for (let p = 0; p < 12; p++) {
            explosions.push({
              x: t.x, y: t.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              life: 1, color: t.color
            });
          }
          targets.splice(i, 1);
          break;
        }
      }
    });

    function gameLoop() {
      if (!gameRunning) return;

      actx.fillStyle = '#060911';
      actx.fillRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);

      if (currentGame === 'defender') {
        actx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
        actx.lineWidth = 2;
        actx.beginPath();
        actx.moveTo(0, arcadeCanvas.height - 20);
        actx.lineTo(arcadeCanvas.width, arcadeCanvas.height - 20);
        actx.stroke();

        spawnTimer++;
        if (spawnTimer > Math.max(25, 60 - Math.floor(gameScore / 30))) {
          spawnTimer = 0;
          targets.push({
            x: Math.random() * (arcadeCanvas.width - 60) + 30,
            y: -20,
            speed: 1.2 + Math.random() * 1.5 + (gameScore / 100),
            radius: 16,
            color: Math.random() > 0.3 ? '#06b6d4' : '#ec4899'
          });
        }

        for (let i = targets.length - 1; i >= 0; i--) {
          const t = targets[i];
          t.y += t.speed;

          actx.fillStyle = t.color;
          actx.shadowColor = t.color;
          actx.shadowBlur = 10;
          actx.beginPath();
          actx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
          actx.fill();
          actx.shadowBlur = 0;

          if (t.y >= arcadeCanvas.height - 20) {
            endGame();
            return;
          }
        }
      } else if (currentGame === 'dodger') {
        actx.fillStyle = '#06b6d4';
        actx.shadowColor = '#06b6d4';
        actx.shadowBlur = 15;
        actx.beginPath();
        actx.moveTo(playerX, arcadeCanvas.height - 40);
        actx.lineTo(playerX - 20, arcadeCanvas.height - 10);
        actx.lineTo(playerX + 20, arcadeCanvas.height - 10);
        actx.closePath();
        actx.fill();
        actx.shadowBlur = 0;

        spawnTimer++;
        if (spawnTimer > 35) {
          spawnTimer = 0;
          if (Math.random() > 0.3) {
            obstacles.push({
              x: Math.random() * (arcadeCanvas.width - 100),
              y: -30,
              width: 80 + Math.random() * 60,
              height: 18,
              speed: 2.5 + Math.random() * 2 + (gameScore / 50)
            });
          } else {
            powerups.push({
              x: Math.random() * (arcadeCanvas.width - 40) + 20,
              y: -20,
              radius: 12,
              speed: 2
            });
          }
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
          const o = obstacles[i];
          o.y += o.speed;

          actx.fillStyle = '#ec4899';
          actx.shadowColor = '#ec4899';
          actx.shadowBlur = 10;
          actx.fillRect(o.x, o.y, o.width, o.height);
          actx.shadowBlur = 0;

          if (
            o.y + o.height >= arcadeCanvas.height - 40 &&
            o.y <= arcadeCanvas.height - 10 &&
            playerX >= o.x - 15 &&
            playerX <= o.x + o.width + 15
          ) {
            endGame();
            return;
          }

          if (o.y > arcadeCanvas.height) {
            obstacles.splice(i, 1);
            gameScore += 5;
            if (gameScoreEl) gameScoreEl.textContent = gameScore;
          }
        }

        for (let i = powerups.length - 1; i >= 0; i--) {
          const p = powerups[i];
          p.y += p.speed;

          actx.fillStyle = '#10b981';
          actx.shadowColor = '#10b981';
          actx.shadowBlur = 12;
          actx.beginPath();
          actx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          actx.fill();
          actx.shadowBlur = 0;

          if (Math.hypot(playerX - p.x, (arcadeCanvas.height - 25) - p.y) < p.radius + 18) {
            gameScore += 25;
            if (gameScoreEl) gameScoreEl.textContent = gameScore;
            powerups.splice(i, 1);
          } else if (p.y > arcadeCanvas.height) {
            powerups.splice(i, 1);
          }
        }
      }

      for (let i = explosions.length - 1; i >= 0; i--) {
        const ex = explosions[i];
        ex.x += ex.vx;
        ex.y += ex.vy;
        ex.life -= 0.04;

        if (ex.life <= 0) {
          explosions.splice(i, 1);
        } else {
          actx.fillStyle = ex.color;
          actx.globalAlpha = ex.life;
          actx.beginPath();
          actx.arc(ex.x, ex.y, 3, 0, Math.PI * 2);
          actx.fill();
          actx.globalAlpha = 1;
        }
      }

      requestAnimationFrame(gameLoop);
    }

    function endGame() {
      gameRunning = false;
      if (gameScore > highScore) {
        highScore = gameScore;
        localStorage.setItem('nasty_highscore_' + currentGame, highScore);
        if (gameHighScoreEl) gameHighScoreEl.textContent = highScore;
      }
      if (finalScoreEl) finalScoreEl.textContent = gameScore;
      if (gameOverOverlay) gameOverOverlay.classList.remove('hidden');
    }

    function initMemoryGame() {
      if (!memoryBoard) return;
      memoryBoard.innerHTML = '';

      const icons = [
        'fa-brands fa-unity', 'fa-solid fa-vr-cardboard', 'fa-solid fa-dice',
        'fa-brands fa-ethereum', 'fa-solid fa-wifi', 'fa-solid fa-code',
        'fa-solid fa-gamepad', 'fa-solid fa-bolt'
      ];
      const deck = [...icons, ...icons].sort(() => Math.random() - 0.5);

      let flippedCards = [];
      let matchedCount = 0;

      deck.forEach((iconClass) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.icon = iconClass;
        card.innerHTML = `<i class="fa-solid fa-microchip"></i>`;

        card.addEventListener('click', () => {
          if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
            sound.playClick();
            card.classList.add('flipped');
            card.innerHTML = `<i class="${iconClass}"></i>`;
            flippedCards.push(card);

            if (flippedCards.length === 2) {
              const [c1, c2] = flippedCards;

              if (c1.dataset.icon === c2.dataset.icon) {
                c1.classList.add('matched');
                c2.classList.add('matched');
                flippedCards = [];
                gameScore += 20;
                if (gameScoreEl) gameScoreEl.textContent = gameScore;
                matchedCount += 2;

                if (matchedCount === deck.length) {
                  setTimeout(() => { endGame(); }, 500);
                }
              } else {
                setTimeout(() => {
                  c1.classList.remove('flipped');
                  c2.classList.remove('flipped');
                  c1.innerHTML = `<i class="fa-solid fa-microchip"></i>`;
                  c2.innerHTML = `<i class="fa-solid fa-microchip"></i>`;
                  flippedCards = [];
                }, 800);
              }
            }
          }
        });

        memoryBoard.appendChild(card);
      });
    }

  }

  /* ==========================================
     8. SCROLL REVEAL & COMMS
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));

  const copyBtn = document.getElementById('copy-email-btn');
  const copyStatus = document.getElementById('copy-status');
  const emailText = document.getElementById('email-text');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
        sound.playClick();
        if (copyStatus) copyStatus.textContent = 'Copied!';
        setTimeout(() => { if (copyStatus) copyStatus.textContent = 'Copy'; }, 2000);
      });
    });
  }

  window.handleFormSubmit = function() {
    sound.playClick();
    const name = document.getElementById('form-name').value;
    const responseEl = document.getElementById('form-response');

    if (responseEl) {
      responseEl.style.color = '#10b981';
      responseEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Message received from ${name}. I will get back to you shortly!`;
    }
    document.getElementById('contact-form').reset();
  };

});

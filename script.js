/* ==========================================================================
   DEEPANKAR SEHGAL - INTERACTIVE GAMING ENGINE & SCRIPT
   Features: Cyber Canvas, Sound Synthesizer, Custom Cursor, Arcade Hub (3 Games),
   Interactive Terminal, 3D Tilt Effects
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. WEBAUDIO SYNTHESIZER SOUND SYSTEM
     ========================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
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
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
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
        osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) {}
    }

    playShoot() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.12);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
      } catch (e) {}
    }

    playExplode() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
      } catch (e) {}
    }

    playPowerup() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
      } catch (e) {}
    }
  }

  const sound = new SoundEngine();

  // Sound Toggle Button
  const sfxToggleBtn = document.getElementById('sfx-toggle');
  const sfxIcon = document.getElementById('sfx-icon');
  const sfxText = document.getElementById('sfx-text');

  if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
      sound.enabled = !sound.enabled;
      if (sound.enabled) {
        sfxToggleBtn.classList.remove('muted');
        sfxIcon.className = 'fa-solid fa-volume-high';
        sfxText.textContent = 'SFX: ON';
        sound.playClick();
      } else {
        sfxToggleBtn.classList.add('muted');
        sfxIcon.className = 'fa-solid fa-volume-xmark';
        sfxText.textContent = 'SFX: OFF';
      }
    });
  }

  // Attach sounds to elements with data-sound
  document.querySelectorAll('[data-sound="hover"]').forEach(el => {
    el.addEventListener('mouseenter', () => sound.playHover());
  });
  document.querySelectorAll('[data-sound="click"]').forEach(el => {
    el.addEventListener('click', () => sound.playClick());
  });

  /* ==========================================
     2. CUSTOM CYBER CROSSHAIR CURSOR & 3D CARD TILT
     ========================================== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover state for cursor
  const interactiveTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .term-chip');
  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('active'));
  });

  // 3D Card Tilt Effect
  const tiltableCards = document.querySelectorAll('.project-card, .skill-card, .quest-card, .stat-card');
  tiltableCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  });

  /* ==========================================
     3. INTERACTIVE BACKGROUND CANVAS
     ========================================== */
  const canvas = document.getElementById('cyber-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 70);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(0, 243, 255, ' : 'rgba(168, 85, 247, '
      });
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.fillStyle = p1.color + '0.7)';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();

        // Mouse connection
        const dxMouse = mouseX - p1.x;
        const dyMouse = mouseY - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 150) {
          ctx.strokeStyle = p1.color + (1 - distMouse / 150) * 0.4 + ')';
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = p1.color + (1 - dist / 120) * 0.25 + ')';
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  /* ==========================================
     4. SCROLL REVEAL
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  /* ==========================================
     5. INTERACTIVE TERMINAL ENGINE
     ========================================== */
  const termInput = document.getElementById('term-input');
  const termOutput = document.getElementById('term-output');
  const termChips = document.querySelectorAll('.term-chip');

  function executeCommand(cmd) {
    if (!termOutput) return;
    const trimmed = cmd.trim().toLowerCase();
    sound.playClick();

    // Log input command
    const cmdLine = document.createElement('p');
    cmdLine.className = 'term-line cmd';
    cmdLine.textContent = `DEEPANKAR.OS > ${cmd}`;
    termOutput.appendChild(cmdLine);

    const resLine = document.createElement('p');
    resLine.className = 'term-line sys';

    switch (trimmed) {
      case 'help':
        resLine.innerHTML = 'Available commands: <span class="highlight">skills</span>, <span class="highlight">projects</span>, <span class="highlight">quests</span>, <span class="highlight">play</span>, <span class="highlight">cv</span>, <span class="highlight">clear</span>';
        break;
      case 'skills':
        resLine.innerHTML = 'Executing /skills... Scrolling to Tech Loadout section.';
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'projects':
        resLine.innerHTML = 'Executing /projects... Scrolling to Mission Archives.';
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'quests':
      case 'experience':
        resLine.innerHTML = 'Executing /quests... Scrolling to Career Quest Log.';
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'play':
      case 'game':
      case 'arcade':
        resLine.innerHTML = 'Executing /play... Launching Cyber Arcade Hub.';
        openArcade();
        break;
      case 'cv':
      case 'resume':
        resLine.innerHTML = 'Executing /cv... Opening PDF Resume in new tab.';
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
      const cmd = chip.dataset.cmd;
      executeCommand(cmd);
    });
  });

  /* ==========================================
     6. VIDEO MODAL ENGINE
     ========================================== */
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeVideoBtns = document.querySelectorAll('.close');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const videoUrl = card.dataset.video;
      if (videoUrl && videoModal && modalVideo) {
        sound.playClick();
        videoModal.style.display = 'flex';
        modalVideo.src = videoUrl.includes('youtube') ? videoUrl + '?autoplay=1' : videoUrl;
      }
    });
  });

  closeVideoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (videoModal && modalVideo) {
        videoModal.style.display = 'none';
        modalVideo.src = '';
      }
    });
  });

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.style.display = 'none';
        modalVideo.src = '';
      }
    });
  }

  /* ==========================================
     7. MULTI-GAME ARCADE HUB ENGINE (3 GAMES)
     ========================================== */
  const arcadeModal = document.getElementById('arcadeModal');
  const arcadeLaunchBtn = document.getElementById('arcade-launch-btn');
  const heroGameBtn = document.getElementById('hero-game-btn');
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

  let currentGame = 'defender'; // 'defender', 'dodger', 'memory'
  let gameRunning = false;
  let gameScore = 0;
  let highScore = localStorage.getItem('cyber_highscore_' + currentGame) || 0;
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
  if (heroGameBtn) heroGameBtn.addEventListener('click', openArcade);
  if (closeArcadeBtn) closeArcadeBtn.addEventListener('click', closeArcade);

  function switchGame(gameType) {
    currentGame = gameType;
    gameRunning = false;

    gameSelectBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.game === gameType);
    });

    highScore = localStorage.getItem('cyber_highscore_' + currentGame) || 0;
    if (gameHighScoreEl) gameHighScoreEl.textContent = highScore;
    if (gameScoreEl) gameScoreEl.textContent = '0';

    if (gameStartOverlay) gameStartOverlay.classList.remove('hidden');
    if (gameOverOverlay) gameOverOverlay.classList.add('hidden');

    if (gameType === 'memory') {
      arcadeCanvas.style.display = 'none';
      memoryBoard.classList.remove('hidden');
      if (gameStartTitle) gameStartTitle.textContent = 'MEMORY CORE';
      if (gameStartDesc) gameStartDesc.textContent = 'FLIP & MATCH THE UNITY, VR & SLOT SYMBOL PAIRS!';
      if (gameHintText) gameHintText.innerHTML = '<i class="fa-solid fa-hand-pointer"></i> CLICK CARDS TO FLIP & MATCH';
    } else if (gameType === 'dodger') {
      arcadeCanvas.style.display = 'block';
      memoryBoard.classList.add('hidden');
      if (gameStartTitle) gameStartTitle.textContent = 'NEON DODGER';
      if (gameStartDesc) gameStartDesc.textContent = 'MOVE MOUSE / TOUCH LEFT & RIGHT TO DODGE LASER BARRIERS!';
      if (gameHintText) gameHintText.innerHTML = '<i class="fa-solid fa-arrows-left-right"></i> MOVE MOUSE LEFT / RIGHT TO DODGE';
    } else {
      arcadeCanvas.style.display = 'block';
      memoryBoard.classList.add('hidden');
      if (gameStartTitle) gameStartTitle.textContent = 'CYBER DEFENDER';
      if (gameStartDesc) gameStartDesc.textContent = 'CLICK / TAP INCOMING BUG NODES BEFORE THEY BREACH THE DEFENSE SHIELD!';
      if (gameHintText) gameHintText.innerHTML = '<i class="fa-solid fa-mouse"></i> AIM & CLICK TO SHOOT';
    }
  }

  gameSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      switchGame(btn.dataset.game);
    });
  });

  // GAME ENGINE
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

    // Defender Shoot Listener
    arcadeCanvas.addEventListener('click', (e) => {
      if (!gameRunning || currentGame !== 'defender') return;
      sound.playShoot();

      const rect = arcadeCanvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (arcadeCanvas.width / rect.width);
      const clickY = (e.clientY - rect.top) * (arcadeCanvas.height / rect.height);

      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        const dist = Math.hypot(clickX - t.x, clickY - t.y);

        if (dist < t.radius + 10) {
          sound.playExplode();
          gameScore += 10;
          if (gameScoreEl) gameScoreEl.textContent = gameScore;

          for (let p = 0; p < 12; p++) {
            explosions.push({
              x: t.x,
              y: t.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              life: 1,
              color: t.color
            });
          }
          targets.splice(i, 1);
          break;
        }
      }
    });

    function gameLoop() {
      if (!gameRunning) return;

      actx.fillStyle = '#04060d';
      actx.fillRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);

      // GAME 1: CYBER DEFENDER
      if (currentGame === 'defender') {
        actx.strokeStyle = 'rgba(0, 243, 255, 0.6)';
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
            color: Math.random() > 0.3 ? '#00f3ff' : '#ff0055'
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
      }

      // GAME 2: NEON DODGER
      else if (currentGame === 'dodger') {
        // Draw Player Ship
        actx.fillStyle = '#00f3ff';
        actx.shadowColor = '#00f3ff';
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

        // Move Obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const o = obstacles[i];
          o.y += o.speed;

          actx.fillStyle = '#ff0055';
          actx.shadowColor = '#ff0055';
          actx.shadowBlur = 10;
          actx.fillRect(o.x, o.y, o.width, o.height);
          actx.shadowBlur = 0;

          // Check Collision with Player
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

        // Move Powerups
        for (let i = powerups.length - 1; i >= 0; i--) {
          const p = powerups[i];
          p.y += p.speed;

          actx.fillStyle = '#00ff66';
          actx.shadowColor = '#00ff66';
          actx.shadowBlur = 12;
          actx.beginPath();
          actx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          actx.fill();
          actx.shadowBlur = 0;

          if (Math.hypot(playerX - p.x, (arcadeCanvas.height - 25) - p.y) < p.radius + 18) {
            sound.playPowerup();
            gameScore += 25;
            if (gameScoreEl) gameScoreEl.textContent = gameScore;
            powerups.splice(i, 1);
          } else if (p.y > arcadeCanvas.height) {
            powerups.splice(i, 1);
          }
        }
      }

      // Draw Explosions
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
      sound.playExplode();

      if (gameScore > highScore) {
        highScore = gameScore;
        localStorage.setItem('cyber_highscore_' + currentGame, highScore);
        if (gameHighScoreEl) gameHighScoreEl.textContent = highScore;
      }

      if (finalScoreEl) finalScoreEl.textContent = gameScore;
      if (gameOverOverlay) gameOverOverlay.classList.remove('hidden');
    }

    // GAME 3: MEMORY CORE PUZZLE
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
                sound.playPowerup();
                c1.classList.add('matched');
                c2.classList.add('matched');
                flippedCards = [];
                gameScore += 20;
                if (gameScoreEl) gameScoreEl.textContent = gameScore;
                matchedCount += 2;

                if (matchedCount === deck.length) {
                  setTimeout(() => {
                    endGame();
                  }, 500);
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
     8. COMMS & EMAIL COPY
     ========================================== */
  const copyBtn = document.getElementById('copy-email-btn');
  const copyStatus = document.getElementById('copy-status');
  const emailText = document.getElementById('email-text');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
        sound.playClick();
        if (copyStatus) copyStatus.textContent = 'COPIED!';
        setTimeout(() => {
          if (copyStatus) copyStatus.textContent = 'COPY';
        }, 2000);
      });
    });
  }

  window.handleFormSubmit = function() {
    sound.playClick();
    const name = document.getElementById('form-name').value;
    const responseEl = document.getElementById('form-response');

    if (responseEl) {
      responseEl.style.color = '#00ff66';
      responseEl.innerHTML = `<i class="fa-solid fa-check"></i> TRANSMISSION RECEIVED FROM [${name.toUpperCase()}]. COMMS OPEN!`;
    }
    document.getElementById('contact-form').reset();
  };

});

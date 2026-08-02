/* ==========================================================================
   DEEPANKAR SEHGAL - DARK MODE INTERACTIVE PORTFOLIO ENGINE
   Features: Matrix Code Stream Canvas, Sound Synth, Multi-Game Arcade Hub,
   3D Perspective Tilt, Interactive Dev Console, Cursor Spotlight
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
        sfxText.textContent = 'SFX';
        sound.playClick();
      } else {
        sfxToggleBtn.classList.add('muted');
        sfxIcon.className = 'fa-solid fa-volume-xmark';
        sfxText.textContent = 'OFF';
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
     2. CUSTOM CURSOR & RADIAL SPOTLIGHT
     ========================================== */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const cursorSpotlight = document.getElementById('cursor-glow-spotlight');

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
    if (cursorSpotlight) {
      cursorSpotlight.style.left = `${mouseX}px`;
      cursorSpotlight.style.top = `${mouseY}px`;
    }
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.25;
    ringY += (mouseY - ringY) * 0.25;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  const interactiveTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .term-chip');
  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('active'));
  });

  // 3D Card Tilt Effect
  const tiltableCards = document.querySelectorAll('.project-card, .skill-card, .exp-card, .stat-card');
  tiltableCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* ==========================================
     3. INTERACTIVE MATRIX CODE STREAM CANVAS (NO CONNECTED DOTS!)
     ========================================== */
  const canvas = document.getElementById('cyber-matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const tokens = ['UNITY', 'C#', 'XR', 'VR', 'SLOTS', 'PUN2', 'PLAYFAB', 'WEB3', '60FPS', 'PHYSICS', 'SHADER', '01'];
    const columns = Math.floor(width / 35);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * 35 + 10,
        y: Math.random() * -height,
        speed: 1.2 + Math.random() * 2,
        token: tokens[Math.floor(Math.random() * tokens.length)],
        fontSize: Math.floor(10 + Math.random() * 4),
        opacity: 0.1 + Math.random() * 0.25,
        color: Math.random() > 0.4 ? 'rgba(0, 243, 255, ' : 'rgba(168, 85, 247, '
      });
    }

    function animateMatrixStream() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        // Move vertical stream
        d.y += d.speed;
        if (d.y > height + 50) {
          d.y = Math.random() * -100 - 50;
          d.token = tokens[Math.floor(Math.random() * tokens.length)];
        }

        // Mouse Displace Repulsion Wave
        const dx = mouseX - d.x;
        const dy = mouseY - d.y;
        const dist = Math.hypot(dx, dy);
        let offsetX = 0;

        if (dist < 140) {
          const pushForce = (140 - dist) / 140;
          offsetX = (dx / dist) * pushForce * -45;
          ctx.fillStyle = 'rgba(0, 243, 255, 0.7)';
          ctx.font = `bold ${d.fontSize + 3}px 'Space Grotesk', monospace`;
        } else {
          ctx.fillStyle = d.color + d.opacity + ')';
          ctx.font = `${d.fontSize}px 'Space Grotesk', monospace`;
        }

        ctx.fillText(d.token, d.x + offsetX, d.y);
      }

      requestAnimationFrame(animateMatrixStream);
    }
    animateMatrixStream();
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
        resLine.innerHTML = 'Scrolling to Skills & Tech Stack...';
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'projects':
        resLine.innerHTML = 'Scrolling to Project Showcase...';
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'experience':
      case 'quests':
        resLine.innerHTML = 'Scrolling to Work Experience...';
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

  let currentGame = 'defender';
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

      actx.fillStyle = '#060911';
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

        for (let i = obstacles.length - 1; i >= 0; i--) {
          const o = obstacles[i];
          o.y += o.speed;

          actx.fillStyle = '#ff0055';
          actx.shadowColor = '#ff0055';
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
        if (copyStatus) copyStatus.textContent = 'Copied!';
        setTimeout(() => {
          if (copyStatus) copyStatus.textContent = 'Copy';
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
      responseEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Message received from ${name}. I will get back to you shortly!`;
    }
    document.getElementById('contact-form').reset();
  };

});

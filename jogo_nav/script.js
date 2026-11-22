// Nave — Arquitetura Computacional
// Jogo de perguntas: digite a palavra certa antes que todas as palavras apareçam na tela.
// Aparecem 5 palavras por pergunta (a resposta certa está entre elas). Elas não caem mais:
// começam invisíveis e vão surgindo aos poucos, ficando visíveis de verdade. Quando TODAS
// aparecerem, você perde 1 coração. Digitar uma palavra errada = 1 erro; 3 erros = -1 vida.
// Modo Fácil = só as palavras. Modo Difícil = palavras + asteroides (desvie com as setas).

const QUESTIONS = [
  {
    q: "Antes mesmo do sistema operacional subir, o computador já sabe testar o hardware. Esse \"manual de instruções de fábrica\" está gravado em qual memória?",
    a: "ROM", aliases: ["rom"],
    exp: "A ROM é não volátil e guarda o firmware (BIOS/UEFI) executado ao ligar o PC."
  },
  {
    q: "Um jogo recalcula a posição do personagem 60 vezes por segundo. Qual componente da CPU está fazendo todas essas contas?",
    a: "ULA", aliases: ["ula", "alu"],
    exp: "A ULA (Unidade Lógica e Aritmética) executa as operações aritméticas e lógicas."
  },
  {
    q: "A instrução chegou à CPU, mas ninguém decodificou nem distribuiu as tarefas. Qual peça faltou no comando?",
    a: "UC", aliases: ["uc", "unidade de controle"],
    exp: "A UC (Unidade de Controle) decodifica as instruções e dá as ordens para os demais componentes."
  },
  {
    q: "Entre uma conta e outra, o dado precisa de um abrigo rapidíssimo dentro da própria CPU. Onde ele fica hospedado?",
    a: "Registradores", aliases: ["registrador", "registradores"],
    exp: "Registradores são memórias internas da CPU, as mais rápidas do computador."
  },
  {
    q: "Quando o computador \"não dá conta\" de um jogo pesado, qual componente carrega toda a culpa?",
    a: "CPU", aliases: ["cpu", "processador"],
    exp: "A CPU (processador) reúne ULA, UC e registradores e executa as instruções do programa."
  },
  {
    q: "A placa-mãe guarda configurações em um chip que apaga e regrava eletricamente, byte a byte, sem sair do lugar. Qual memória é essa?",
    a: "EEPROM", aliases: ["eeprom"],
    exp: "EEPROM pode ser apagada e regravada eletricamente, byte a byte, sem desmontar nada."
  },
  {
    q: "Pendrive, SSD e a memória do celular guardam fotos mesmo sem energia. Qual tipo de memória eles usam?",
    a: "Flash", aliases: ["flash", "memoria flash"],
    exp: "Memória Flash é não volátil, rápida e grava em blocos — base de pendrives, SSDs e celulares."
  },
  {
    q: "Você desliga o computador e o trabalho continua salvo para amanhã. Em qual tipo de memória ele ficou guardado?",
    a: "Memória de massa", aliases: ["memoria de massa", "massa", "memorias de massa"],
    exp: "Memórias de massa (HD, SSD, pendrive) armazenam dados a longo prazo, mesmo desligadas."
  },
  {
    q: "A CPU precisa dizer \"casa número X\" antes de buscar um dado. Qual estrutura leva esse recado até a memória?",
    a: "Address bus", aliases: ["address bus", "barramento de endereco", "barramento endereco"],
    exp: "O barramento de endereços (address bus) carrega os endereços da CPU para a memória."
  },
  {
    q: "Depois de encontrar o dado, ele precisa viajar de volta para a CPU. Por qual estrada ele trafega?",
    a: "Data bus", aliases: ["data bus", "barramento de dados", "barramento dados"],
    exp: "O barramento de dados (data bus) transporta os dados entre CPU, memória e periféricos."
  },
  {
    q: "Uma impressora puxa um arquivo gigante direto da memória sem travar o processador. Que herói transfere os dados sem passar pela CPU?",
    a: "DMA", aliases: ["dma", "acesso direto a memoria"],
    exp: "DMA (Direct Memory Access) transfere dados entre periféricos e memória sem ocupar a CPU."
  },
  {
    q: "No Logisim, a ligação que leva um valor lógico de uma porta para outra é apenas um...",
    a: "Fio", aliases: ["fio", "fios"],
    exp: "No Logisim, o fio conecta pontos do circuito e leva o valor de um ponto a outro."
  },
  {
    q: "Você abre 10 programas e, ao desligar, tudo que estava em uso some sem deixar rastro. Onde aquilo estava?",
    a: "RAM", aliases: ["ram", "memoria ram"],
    exp: "A RAM é volátil: perde todo o conteúdo quando o computador é desligado."
  },
  {
    q: "A CPU é tão ávida que alguém deixou uma memória pequenininha e veloz bem ao lado dela, antecipando os dados. Qual é?",
    a: "Cache", aliases: ["cache", "memoria cache"],
    exp: "A Cache fica entre a CPU e a RAM, guardando os dados mais usados para acesso instantâneo."
  },
  {
    q: "Depois da ULA terminar a soma, o resultado para em um registrador especial, esperando a próxima conta. Qual é?",
    a: "AC", aliases: ["ac", "acumulador", "accumulator"],
    exp: "O AC (Acumulador) guarda o resultado das operações feitas pela ULA."
  },
  {
    q: "Sem ele, a CPU não saberia qual instrução executar depois: ele guarda o endereço da próxima. Quem é?",
    a: "PC", aliases: ["pc", "program counter", "contador de programa"],
    exp: "O PC (Program Counter) guarda o endereço da próxima instrução a ser executada."
  },
  {
    q: "Descobrir se o inimigo foi atingido é, no fundo, uma comparação entre números. Qual componente faz essa comparação?",
    a: "ULA", aliases: ["ula", "alu"],
    exp: "Comparações são operações lógicas — trabalho da ULA."
  },
  {
    q: "Os programas abertos vivem em uma memória veloz que apaga tudo quando a tomada é tirada. Qual?",
    a: "RAM", aliases: ["ram", "memoria ram"],
    exp: "RAM = memória de trabalho volátil, rápida e temporária."
  },
  {
    q: "Gravada de fábrica, feita para leitura, e sem ela o computador nem saberia começar. Qual memória?",
    a: "ROM", aliases: ["rom"],
    exp: "ROM (Read-Only Memory) é não volátil e armazena o firmware de inicialização."
  },
  {
    q: "Quando a CPU \"adivinha\" o que vai precisar e deixa os dados na ponta da língua, em qual memória eles ficam?",
    a: "Cache", aliases: ["cache", "memoria cache"],
    exp: "A Cache antecipa os dados mais prováveis de uso, evitando esperas pela RAM."
  },
  {
    q: "São pouquíssimos, moram dentro da CPU e são os lugares mais rápidos de todo o computador. Quais são?",
    a: "Registradores", aliases: ["registrador", "registradores"],
    exp: "Registradores guardam dados e instruções em uso imediato pela CPU."
  },
  {
    q: "O HD e o SSD são exemplos de qual categoria de memória, feita para guardar tudo a longo prazo?",
    a: "Memória de massa", aliases: ["memoria de massa", "massa", "memorias de massa"],
    exp: "HDs e SSDs são memórias de massa: não voláteis, de grande capacidade."
  },
  {
    q: "Transferir um vídeo da câmera para o disco sem consumir o tempo da CPU: qual mecanismo permite isso?",
    a: "DMA", aliases: ["dma", "acesso direto a memoria"],
    exp: "DMA permite transferências diretas entre periféricos e memória."
  },
  {
    q: "Ele carrega números que são \"casas\", não conteúdo: leva endereços da CPU para a memória. Qual é?",
    a: "Address bus", aliases: ["address bus", "barramento de endereco", "barramento endereco"],
    exp: "O barramento de endereços transporta endereços, nunca os dados em si."
  },
  {
    q: "É a avenida por onde os próprios dados trafegam entre a CPU e a memória. Qual é?",
    a: "Data bus", aliases: ["data bus", "barramento de dados", "barramento dados"],
    exp: "O barramento de dados carrega os valores que estão sendo lidos ou escritos."
  },
  {
    q: "A instrução está guardada na memória, mas quem decide a ordem exata das operações dentro da CPU?",
    a: "UC", aliases: ["uc", "unidade de controle"],
    exp: "A Unidade de Controle coordena a execução das instruções, passo a passo."
  }
];

// ---------- Utilidades ----------
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- Estado do jogo ----------
const STRIKES_MAX = 3;      // erros por pergunta (palavra errada ou tempo zerado)
const WORDS_ON_SCREEN = 5;  // palavras na tela por pergunta
const TIME_LIMIT = 40;      // segundos da barrinha de tempo por pergunta (barra única)

const game = {
  mode: null,            // "facil" | "dificil"
  phase: "menu",         // "menu" | "playing" | "transition" | "gameover"
  lives: 3,
  score: 0,
  acertos: 0,
  perguntasFeitas: 0,
  order: [],
  qIndex: 0,
  current: null,
  strikes: 0,            // erros na pergunta atual (palavra errada ou tempo)
  qStart: 0,             // usado no bônus de pontos
  timerStart: 0          // usado na barrinha de tempo
};
window.game = game;

// ---------- Elementos ----------
const questionText = document.getElementById("questionText");
const strikesEl = document.getElementById("strikes");
const feedback = document.getElementById("feedback");
const livesEl = document.getElementById("lives");
const qCounterEl = document.getElementById("qCounter");
const scoreEl = document.getElementById("score");
const timeFill = document.getElementById("timeFill");
const timeLabel = document.getElementById("timeLabel");
const modeOverlay = document.getElementById("modeOverlay");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const gameOverTitle = document.getElementById("gameOverTitle");
const gameOverText = document.getElementById("gameOverText");

// ---------- Canvas ----------
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let W = canvas.width, H = canvas.height;   // tamanho atual em px de CSS (ajustado por fitCanvas())

const ship = { x: W / 2, y: H - 70, w: 56, h: 62, invuln: 0 };
const stars = Array.from({ length: 110 }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  z: Math.random() * 0.8 + 0.2,
  tw: Math.random() * Math.PI * 2
}));
let asteroids = [];   // {x, y, vx, vy, r, rot, vr, seed}
let particles = [];   // {x, y, vx, vy, life, maxLife, color}
let words = [];       // palavras ativas na tela: {text, correct, x, y, w, h, alpha, delay, appearT}
let waveWords = [];   // as 5 palavras da pergunta (inclusive as já digitadas)
let shakeMag = 0;
let spawnTimer = 0;
let distractorPool = [];

const keys = {};

const WORD_FONT = '600 21px "Segoe UI", system-ui, sans-serif';
const WORD_H = 42;

// ---------- Tamanho da tela ----------
// A tela do jogo ocupa todo o espaço que sobra na coluna da direita:
// o canvas é redimensionado para o tamanho exato do container (e o resto
// do jogo — nave, palavras, asteroides — se ajusta às novas dimensões).
const canvasWrap = canvas.parentElement;

function fitCanvas() {
  const cw = Math.max(320, (canvasWrap.clientWidth || 900) - 2);   // -2 = borda do canvas
  const ch = Math.max(200, (canvasWrap.clientHeight || 520) - 2);
  if (cw === W && ch === H && canvas.style.width) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = cw;
  H = ch;
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);   // desenho continua em px de CSS

  // reorganiza o que já estava na tela para não sair dos limites
  ship.y = H - 70;
  ship.x = Math.max(34, Math.min(W - 34, ship.x));
  for (const s of stars) {
    if (s.x > W || s.y > H) { s.x = Math.random() * W; s.y = Math.random() * H; }
  }
  for (const w of words) {
    w.x = Math.min(w.x, Math.max(14, W - w.w - 14));
    w.y = Math.min(w.y, Math.max(34, H - w.h - 150));
  }
  for (const a of asteroids) {
    a.x = Math.max(a.r, Math.min(W - a.r, a.x));
    a.y = Math.min(a.y, H - a.r);
  }
}

fitCanvas();
window.addEventListener("resize", fitCanvas);
if (window.ResizeObserver) new ResizeObserver(fitCanvas).observe(canvasWrap);

// ritmo de aparição das palavras. Precisa ser SEMPRE mais lento que a
// barrinha de tempo (40s), senão a pergunta acabaria pela revelação antes da
// barra zerar:  4 * step + REVEAL_FADE > 40  =>  step > 9.65
const REVEAL_FADE = 1.4;   // segundos para uma palavra passar de invisível a totalmente visível
function revealStep() {
  const base = Math.max(10.4, 11.4 - game.perguntasFeitas * 0.038);
  return game.mode === "dificil" ? base * 0.97 : base;
}

// ---------- Palavras na tela (aparição gradual) ----------
function uniqueAnswers() {
  const seen = new Set();
  const out = [];
  for (const q of QUESTIONS) {
    if (!seen.has(q.a)) { seen.add(q.a); out.push(q.a); }
  }
  return out;
}

function refillDistractors() {
  distractorPool = shuffle(uniqueAnswers().filter(a => a !== game.current.a));
}

function nextDistractor() {
  if (!distractorPool.length) refillDistractors();
  return distractorPool.pop();
}

// palavra fixa na tela: começa invisível (alpha 0) e surge aos poucos até ficar 100% visível
function addWord(text, correct, delay) {
  ctx.font = WORD_FONT;
  const w = Math.ceil(ctx.measureText(text).width) + 36;
  let x = 14, y = 40;
  for (let t = 0; t < 24; t++) {
    x = 14 + Math.random() * (W - w - 28);
    y = 34 + Math.random() * (H - WORD_H - 160);
    const overlaps = words.some(o =>
      x < o.x + o.w + 14 && x + w + 14 > o.x &&
      y < o.y + o.h + 14 && y + WORD_H + 14 > o.y
    );
    if (!overlaps) break;
  }
  const word = {
    text, correct,
    x, y, w, h: WORD_H,
    alpha: 0, delay, appearT: 0
  };
  words.push(word);
  waveWords.push(word);
  return word;
}

// leva inicial: 5 palavras em posições fixas, surgindo uma após a outra.
// a resposta certa nunca é a última a aparecer (sempre dá tempo de digitá-la).
function spawnWave() {
  const texts = [game.current.a];
  let guard = 0;
  while (texts.length < WORDS_ON_SCREEN && guard++ < 40) {
    const d = nextDistractor();
    if (!texts.includes(d)) texts.push(d);
  }
  const order = shuffle(texts.map(t => ({ text: t, correct: t === game.current.a })));
  if (order[order.length - 1].correct) {
    const j = Math.floor(Math.random() * (order.length - 1));
    [order[order.length - 1], order[j]] = [order[j], order[order.length - 1]];
  }
  const step = revealStep();
  order.forEach((item, i) => addWord(item.text, item.correct, i * step));
}

function roundRectPath(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawWord(w) {
  if (w.alpha <= 0.01) return; // ainda invisível
  ctx.save();
  ctx.globalAlpha = w.alpha;   // surge aos poucos: invisível -> visível de verdade
  const g = ctx.createLinearGradient(w.x, w.y, w.x, w.y + w.h);
  g.addColorStop(0, "rgba(42,58,122,0.96)");
  g.addColorStop(1, "rgba(26,37,86,0.96)");
  ctx.fillStyle = g;
  roundRectPath(w.x, w.y, w.w, w.h, 12);
  ctx.fill();
  ctx.strokeStyle = "rgba(126,148,232,0.6)";
  ctx.lineWidth = 1.5;
  roundRectPath(w.x, w.y, w.w, w.h, 12);
  ctx.stroke();
  ctx.fillStyle = "#e8ecff";
  ctx.font = WORD_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(w.text, w.x + w.w / 2, w.y + w.h / 2 + 1);
  ctx.restore();
}

function spawnAsteroid() {
  const r = 18 + Math.random() * 22;
  asteroids.push({
    x: r + Math.random() * (W - 2 * r),
    y: -r,
    vx: (Math.random() - 0.5) * 0.8,
    vy: 1.6 + game.perguntasFeitas * 0.22 + Math.random() * 1.2,
    r,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.05,
    seed: Math.random() * 100
  });
}

function explode(x, y, color, n = 26) {
  for (let i = 0; i < n; i++) {
    const ang = Math.random() * Math.PI * 2;
    const sp = 1 + Math.random() * 5;
    particles.push({
      x, y,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp,
      life: 0.4 + Math.random() * 0.5,
      maxLife: 0.9,
      color
    });
  }
}

function drawShip() {
  if (ship.invuln > 0 && Math.floor(ship.invuln * 12) % 2 === 0) return; // pisca
  const x = ship.x, y = ship.y;
  ctx.save();
  ctx.translate(x, y);

  // chama do motor
  const flame = 14 + Math.random() * 14;
  const g = ctx.createLinearGradient(0, 18, 0, 18 + flame);
  g.addColorStop(0, "#ffb703");
  g.addColorStop(1, "rgba(255,77,109,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(-10, 18);
  ctx.lineTo(10, 18);
  ctx.lineTo(0, 18 + flame);
  ctx.closePath();
  ctx.fill();

  // corpo
  const bg = ctx.createLinearGradient(-20, -30, 20, 30);
  bg.addColorStop(0, "#9fb4ff");
  bg.addColorStop(1, "#4656a8");
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(17, 14);
  ctx.lineTo(24, 22);
  ctx.lineTo(-24, 22);
  ctx.lineTo(-17, 14);
  ctx.closePath();
  ctx.fill();

  // asas
  ctx.fillStyle = "#31407f";
  ctx.beginPath();
  ctx.moveTo(-17, 6); ctx.lineTo(-32, 24); ctx.lineTo(-14, 22); ctx.closePath();
  ctx.moveTo(17, 6); ctx.lineTo(32, 24); ctx.lineTo(14, 22); ctx.closePath();
  ctx.fill();

  // cabine
  ctx.fillStyle = "#4cc9f0";
  ctx.beginPath();
  ctx.ellipse(0, -8, 7, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawAsteroid(a) {
  if (!isFinite(a.r)) return;
  ctx.save();
  ctx.translate(a.x, a.y);
  ctx.rotate(a.rot);
  const g = ctx.createRadialGradient(-a.r * 0.35, -a.r * 0.35, a.r * 0.15, 0, 0, a.r);
  g.addColorStop(0, "#9b8b7a");
  g.addColorStop(1, "#4b4238");
  ctx.fillStyle = g;
  ctx.beginPath();
  for (let i = 0; i < 9; i++) {
    const ang = (i / 9) * Math.PI * 2;
    const rad = a.r * (0.82 + 0.18 * Math.sin(a.seed + i * 2.3));
    const px = Math.cos(ang) * rad, py = Math.sin(ang) * rad;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  // crateras
  ctx.fillStyle = "rgba(0,0,0,.28)";
  [[-0.3, -0.2, 0.22], [0.28, 0.12, 0.18], [0.02, 0.42, 0.14]].forEach(([cx, cy, cr]) => {
    ctx.beginPath();
    ctx.ellipse(a.r * cx, a.r * cy, a.r * cr, a.r * cr * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawStars(dt) {
  for (const s of stars) {
    s.y += (18 * s.z + game.perguntasFeitas * 1.2) * dt;
    if (s.y > H) { s.y = -2; s.x = Math.random() * W; }
    s.tw += dt * 3;
    const alpha = 0.35 + 0.5 * s.z * (0.6 + 0.4 * Math.sin(s.tw));
    ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
    ctx.fillRect(s.x, s.y, 1.2 + s.z * 1.8, 1.2 + s.z * 1.8);
  }
}

// ---------- Loop principal ----------
let lastT = performance.now();

function loop(now) {
  const dt = Math.min((now - lastT) / 1000, 0.05);
  lastT = now;

  ctx.save();
  if (shakeMag > 0.1) {
    ctx.translate((Math.random() - 0.5) * shakeMag, (Math.random() - 0.5) * shakeMag);
    shakeMag *= Math.pow(0.02, dt);
  }

  ctx.clearRect(-20, -20, W + 40, H + 40);
  drawStars(dt);

  const moving = game.phase === "playing" && game.mode === "dificil";

  // nave: movimento no modo difícil
  if (moving) {
    const speed = 420 * dt;
    if (keys.ArrowLeft || keys.a) ship.x -= speed;
    if (keys.ArrowRight || keys.d) ship.x += speed;
    ship.x = Math.max(34, Math.min(W - 34, ship.x));
  }
  if (ship.invuln > 0) ship.invuln -= dt;

  // asteroides
  if (moving) {
    spawnTimer -= dt;
    const interval = Math.max(0.45, 1.5 - game.perguntasFeitas * 0.09);
    if (spawnTimer <= 0) {
      spawnAsteroid();
      spawnTimer = interval;
    }
    for (const a of asteroids) {
      a.x += a.vx * 60 * dt * 0.3;
      a.y += a.vy * 60 * dt * 0.32;
      a.rot += a.vr;

      // colisão com a nave
      if (ship.invuln <= 0 &&
          Math.abs(a.x - ship.x) < a.r + 18 &&
          Math.abs(a.y - ship.y) < a.r + 22) {
        asteroids = asteroids.filter(x => x !== a);
        explode(a.x, a.y, "#ffb703", 30);
        shakeMag = 16;
        hitByAsteroid();
        break;
      }
    }
    asteroids = asteroids.filter(a => a.y < H + a.r + 10 && a.x > -80 && a.x < W + 80);
  }

  // palavras surgindo aos poucos (invisíveis -> visíveis de verdade)
  if (game.phase === "playing") {
    let allShown = waveWords.length > 0;
    for (const w of waveWords) {
      w.appearT += dt;
      w.alpha = Math.min(1, Math.max(0, (w.appearT - w.delay) / REVEAL_FADE));
      if (w.alpha < 1) allShown = false;
    }
    // quando TODAS as palavras apareceram, a pergunta venceu o jogador: -1 coração
    if (allShown) {
      for (const w of words) explode(w.x + w.w / 2, w.y + w.h / 2, "#ff4d6d", 18);
      loseLife("reveladas");
    }
  }

  // asteroides no canvas (abaixo das palavras)
  for (const a of asteroids) drawAsteroid(a);

  // palavras no canvas (sobre os asteroides, abaixo da nave)
  for (const w of words) drawWord(w);

  // partículas
  for (const p of particles) {
    p.x += p.vx * 60 * dt * 0.5;
    p.y += p.vy * 60 * dt * 0.5;
    p.vy += 2.2 * dt;
    p.life -= dt;
    if (p.life > 0) {
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 3.4, 3.4);
      ctx.globalAlpha = 1;
    }
  }
  particles = particles.filter(p => p.life > 0);

  drawShip();

  // barrinha de tempo: mostra quanto falta para responder a pergunta
  if (game.phase === "playing") {
    const rem = TIME_LIMIT - (now - game.timerStart) / 1000;
    if (rem <= 0) onTimeout();
    else renderTimer(rem);
  }

  ctx.restore();
  requestAnimationFrame(loop);
}

// ---------- Fluxo do jogo ----------
function startGame(mode) {
  game.mode = mode;
  game.phase = "playing";
  game.lives = 3;
  game.score = 0;
  game.acertos = 0;
  game.perguntasFeitas = 0;
  game.order = shuffle(QUESTIONS.map((_, i) => i));
  game.qIndex = 0;
  asteroids = [];
  particles = [];
  words = [];
  waveWords = [];
  ship.x = W / 2;
  ship.invuln = 0;
  modeOverlay.classList.add("hidden");
  gameOverOverlay.classList.add("hidden");
  renderLives();
  renderScore();
  inputEl.focus();
  nextQuestion();
}

function nextQuestion() {
  if (game.acertos >= QUESTIONS.length) return endGame(true);

  if (game.qIndex >= game.order.length) {
    game.order = shuffle(QUESTIONS.map((_, i) => i));
    game.qIndex = 0;
  }

  game.current = QUESTIONS[game.order[game.qIndex]];
  game.qIndex++;
  game.perguntasFeitas++;
  game.strikes = 0;
  game.phase = "playing";
  game.qStart = performance.now();
  game.timerStart = performance.now();   // zera a barrinha de tempo da pergunta
  ship.invuln = Math.max(ship.invuln, 1.2); // folga no início da pergunta

  questionText.textContent = game.current.q;
  feedback.textContent = "";
  feedback.className = "feedback";
  qCounterEl.textContent = `Pergunta ${game.perguntasFeitas}`;
  renderStrikes();
  renderTimer(TIME_LIMIT);

  refillDistractors();
  words = [];
  waveWords = [];
  spawnWave();
  spawnTimer = 0.6;
  inputEl.value = "";
  inputEl.focus();
}

// digitação: a palavra só é "atingida" quando o texto digitado bate exatamente
// com uma palavra da tela (não diferencia maiúsculas nem acentos)
function normalize(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function tryTypedWord(raw) {
  if (game.phase !== "playing") return false;
  const v = normalize(raw);
  if (!v) return false;
  const w = words.find(o => normalize(o.text) === v);
  if (!w) return false;
  inputEl.value = "";
  if (w.correct) {
    onCorrect(w);
  } else {
    words = words.filter(x => x !== w);
    explode(w.x + w.w / 2, w.y + w.h / 2, "#ff4d6d", 20);
    shakeMag = Math.max(shakeMag, 12);
    registerStrike();
  }
  return true;
}

function onCorrect(w) {
  words = words.filter(x => x !== w);
  explode(w.x + w.w / 2, w.y + w.h / 2, "#2fd97a", 22);
  game.acertos++;
  const elapsed = (performance.now() - game.qStart) / 1000;
  const bonus = Math.round(Math.max(0, 60 * (1 - elapsed / TIME_LIMIT)));
  game.score += 100 + bonus;
  renderScore();
  feedback.textContent = `Correto! +${100 + bonus} pts — ${game.current.exp}`;
  feedback.className = "feedback ok";
  freezeTimer(false);                      // barrinha congela (acertou)
  explode(ship.x, ship.y - 40, "#2fd97a", 18);
  game.phase = "transition";
  words = [];
  waveWords = [];
  setTimeout(nextQuestion, 2000);
}

// 1 erro na pergunta (palavra errada digitada — o tempo zerado tem caminho
// próprio em onTimeout(), que também encerra a pergunta)
function registerStrike(prefix) {
  game.strikes++;
  renderStrikes();
  if (game.strikes >= STRIKES_MAX) {
    // as palavras restantes explodem junto com 1 coração a menos
    for (const w of words) explode(w.x + w.w / 2, w.y + w.h / 2, "#ffb703", 16);
    words = [];
    waveWords = [];
    loseLife("erros");
    return;
  }
  feedback.textContent = `${prefix || "Palavra errada digitada!"} Erro ${game.strikes}/${STRIKES_MAX}.`;
  feedback.className = "feedback bad";
}

// ---------- Barrinha de tempo ----------
function renderTimer(rem) {
  const pct = Math.max(0, Math.min(1, rem / TIME_LIMIT)) * 100;
  timeFill.style.width = pct + "%";
  timeFill.classList.toggle("warn", pct <= 50 && pct > 25);
  timeFill.classList.toggle("danger", pct <= 25);
  timeFill.classList.remove("done");
  timeLabel.textContent = Math.ceil(rem) + "s";
}

function freezeTimer(zero) {
  if (zero) timeFill.style.width = "0%";
  timeFill.classList.add("done");
}

// a barrinha única de 40s chegou a zero: 1 erro e a pergunta passa para a
// próxima (a barra NÃO reinicia — cada pergunta tem a sua própria barra)
function onTimeout() {
  if (game.phase !== "playing") return;
  game.strikes++;
  renderStrikes();

  // se esse for o 3º erro da pergunta, ainda custa 1 vida
  if (game.strikes >= STRIKES_MAX) {
    for (const w of words) explode(w.x + w.w / 2, w.y + w.h / 2, "#ffb703", 16);
    words = [];
    waveWords = [];
    loseLife("erros");
    timeLabel.textContent = "0s";          // a barra zerou junto
    return;
  }

  game.phase = "transition";
  freezeTimer(true);                       // barra congela zerada
  timeLabel.textContent = "0s";
  for (const w of words) explode(w.x + w.w / 2, w.y + w.h / 2, "#ff4d6d", 14);
  words = [];
  waveWords = [];
  feedback.textContent = `Tempo esgotado! Erro ${game.strikes}/${STRIKES_MAX}. A resposta era: ${game.current.a}. ${game.current.exp}`;
  feedback.className = "feedback info";
  setTimeout(nextQuestion, 2400);
}

// colisão de asteroide (modo difícil): custa só 1 vida — a pergunta e as
// palavras continuam na tela, e a nave fica invulnerável um tempo para
// não levar batidas em cadeia.
function hitByAsteroid() {
  if (game.phase !== "playing") return;
  game.lives--;
  renderLives();
  shakeMag = Math.max(shakeMag, 16);
  ship.invuln = 2;
  explode(ship.x, ship.y, "#ff4d6d", 30);
  if (game.lives <= 0) {
    game.phase = "transition";
    words = [];
    waveWords = [];
    feedback.textContent = `Sua nave foi destruída pelos asteroides! A resposta era: ${game.current.a}. ${game.current.exp}`;
    feedback.className = "feedback info";
    setTimeout(() => endGame(false), 1800);
    return;
  }
  feedback.textContent = `Um asteroide atingiu sua nave! −1 vida (sobram ${game.lives}) — as palavras continuam na tela.`;
  feedback.className = "feedback bad";
}

// pergunta perdida: -1 coração e a pergunta passa mostrando a resposta
function loseLife(reason) {
  if (game.phase !== "playing") return;
  game.phase = "transition";
  game.lives--;
  renderLives();
  freezeTimer(false);                      // barrinha congela (pergunta perdida)
  shakeMag = Math.max(shakeMag, 16);
  ship.invuln = 1.5;
  words = [];
  waveWords = [];

  explode(ship.x, ship.y, "#ffb703", 34);
  const msg = reason === "reveladas"
    ? "Todas as palavras apareceram antes de você digitar a resposta!"
    : "Você errou 3 vezes nesta pergunta (palavra errada ou tempo esgotado)!";
  feedback.textContent = `${msg} A resposta era: ${game.current.a}. ${game.current.exp}`;
  feedback.className = "feedback info";

  if (game.lives <= 0) {
    setTimeout(() => endGame(false), 1800);
  } else {
    setTimeout(nextQuestion, 2400);
  }
}

function endGame(won) {
  game.phase = "gameover";
  if (won) {
    gameOverTitle.textContent = "Você zerou! 🚀";
    gameOverText.textContent =
      `Respondeu as ${QUESTIONS.length} perguntas com ${game.lives} vida(s) de sobra. ` +
      `Pontuação final: ${game.score} pts. As explicações ficaram nos feedbacks — releia e jogue de novo!`;
  } else {
    gameOverTitle.textContent = "Sua nave foi destruída";
    gameOverText.textContent =
      `Você acertou ${game.acertos} pergunta(s) e fez ${game.score} pontos. ` +
      `Cada feedback mostra a explicação da resposta — estude e tente de novo!`;
  }
  gameOverOverlay.classList.remove("hidden");
}

// ---------- HUD ----------
function renderLives() {
  const hearts = livesEl.querySelectorAll(".heart");
  hearts.forEach((h, i) => h.classList.toggle("lost", i >= game.lives));
}

function renderScore() {
  scoreEl.textContent = `${game.score} pts · ${game.acertos} acerto(s)`;
}

function renderStrikes() {
  strikesEl.querySelectorAll(".pip").forEach((p, i) => p.classList.toggle("used", i < game.strikes));
}

// ---------- Eventos ----------
// campo de digitação: a resposta entra pelo teclado, não por clique
const inputEl = document.getElementById("answerInput");

inputEl.addEventListener("input", () => {
  tryTypedWord(inputEl.value);
});
inputEl.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (!tryTypedWord(inputEl.value) && game.phase === "playing") {
      if (inputEl.value.trim()) {
        feedback.textContent = "Essa palavra não está na tela (ou não é a resposta).";
        feedback.className = "feedback bad";
      }
      inputEl.value = "";
    }
  }
});

// clicar no canvas só serve para colocar o cursor de volta no campo de digitação
canvas.addEventListener("click", () => inputEl.focus());

document.querySelectorAll("[data-mode]").forEach(btn => {
  btn.addEventListener("click", () => startGame(btn.dataset.mode));
});

document.getElementById("btnPlayAgain").addEventListener("click", () => startGame(game.mode));
document.getElementById("btnChangeMode").addEventListener("click", () => {
  gameOverOverlay.classList.add("hidden");
  modeOverlay.classList.remove("hidden");
  game.phase = "menu";
});

// teclado (movimento da nave no modo difícil)
// enquanto o jogador digita no campo, letras e espaço vão para o texto —
// só as setas continuam movendo a nave
document.addEventListener("keydown", e => {
  const typing = e.target === inputEl;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (!typing || k.startsWith("Arrow")) keys[k] = true;
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
    e.preventDefault();
  } else if (e.key === " " && !typing) {
    e.preventDefault();
  }
});
document.addEventListener("keyup", e => {
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  keys[k] = false;
});

// controle por arraste no modo difícil (dedo no celular ou mouse pressionado)
canvas.addEventListener("pointermove", e => {
  if (game.mode !== "dificil" || game.phase !== "playing") return;
  if (e.pointerType !== "touch" && !e.buttons) return;
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (W / rect.width);
  ship.x = Math.max(34, Math.min(W - 34, x));
});

requestAnimationFrame(loop);

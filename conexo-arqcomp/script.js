// Conexo — Arquitetura Computacional
// Termos: lista de componentes (Atividade III) + Lógica Digital I e II (MAT1/MAT2)

const GROUPS = [
  {
    id: "g1",
    name: "A CPU e suas partes",
    description:
      "O processador (CPU) reúne três partes: a ULA faz as contas, a UC comanda e os registradores guardam dados na hora.",
    words: ["CPU", "ULA", "UC", "Registradores"]
  },
  {
    id: "g2",
    name: "Memórias não voláteis",
    description:
      "Guardam os dados mesmo quando o computador é desligado.",
    words: ["ROM", "EEPROM", "Flash", "Memória de massa"]
  },
  {
    id: "g3",
    name: "Levam dados de um ponto a outro",
    description:
      "O barramento de endereço leva endereços, o de dados leva dados, o DMA transfere sem passar pela CPU e o fio leva o valor de um ponto a outro (Logisim).",
    words: ["Address bus", "Data bus", "DMA", "Fio"]
  },
  {
    id: "g4",
    name: "Perdem os dados quando desligam",
    description:
      "Voláteis e rapidíssimas: guardam dados temporários. O AC guarda o resultado das operações e o PC, o endereço da próxima instrução.",
    words: ["RAM", "Cache", "AC", "PC"]
  }
];

const MAX_ERRORS = 4;

let remaining = [];   // palavras ainda no tabuleiro
let selection = [];   // cartões selecionados
let solved = [];      // grupos resolvidos (ordem de acerto)
let errors = 0;
let locked = false;   // trava durante animação

const gridEl = document.getElementById("grid");
const solvedEl = document.getElementById("solved");
const statusEl = document.getElementById("statusMsg");
const attemptsEl = document.getElementById("attempts");
const btnCheck = document.getElementById("btnCheck");
const btnClear = document.getElementById("btnClear");
const btnReset = document.getElementById("btnReset");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const btnPlayAgain = document.getElementById("btnPlayAgain");

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function groupOf(word) {
  return GROUPS.find(g => g.words.includes(word));
}

function setStatus(msg) {
  statusEl.textContent = msg;
}

function renderAttempts() {
  const dots = attemptsEl.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("lost", i < errors);
  });
  attemptsEl.title = `Erros: ${errors} de ${MAX_ERRORS}`;
}

function renderGrid() {
  gridEl.innerHTML = "";
  remaining.forEach(word => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = word;
    tile.setAttribute("role", "button");
    tile.setAttribute("tabindex", "0");
    tile.addEventListener("click", () => toggleSelect(tile, word));
    tile.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleSelect(tile, word);
      }
    });
    gridEl.appendChild(tile);
  });
}

function toggleSelect(tile, word) {
  if (locked) return;
  const idx = selection.findIndex(s => s.word === word);
  if (idx >= 0) {
    selection.splice(idx, 1);
    tile.classList.remove("selected");
  } else {
    if (selection.length >= 4) return;
    selection.push({ word, tile });
    tile.classList.add("selected");
  }
  btnCheck.disabled = selection.length !== 4;
  if (selection.length === 4) setStatus("Pronto! Clique em Conferir.");
  else setStatus(`Selecione ${4 - selection.length} palavra${selection.length === 3 ? "" : "s"}...`);
}

function clearSelection() {
  selection.forEach(s => s.tile.classList.remove("selected"));
  selection = [];
  btnCheck.disabled = true;
  setStatus("Selecione 4 palavras e clique em Conferir.");
}

function renderSolvedBar(group) {
  const bar = document.createElement("div");
  bar.className = `group-bar ${group.id}`;
  bar.innerHTML = `
    <h3>${group.name}</h3>
    <p>${group.description}</p>
    <div class="words">${group.words.join(" · ")}</div>
  `;
  solvedEl.appendChild(bar);
}

function checkSelection() {
  if (locked || selection.length !== 4) return;
  locked = true;

  const groups = selection.map(s => groupOf(s.word));
  const sameGroup = groups.every(g => g.id === groups[0].id) && groups[0] !== undefined;

  if (sameGroup) {
    const group = groups[0];
    selection.forEach(s => s.tile.classList.add("pop"));
    setTimeout(() => {
      renderSolvedBar(group);
      solved.push(group);
      remaining = remaining.filter(w => !group.words.includes(w));
      selection = [];
      renderGrid();
      btnCheck.disabled = true;
      locked = false;

      if (solved.length === GROUPS.length) {
        setStatus("Você encontrou todos os grupos!");
        setTimeout(() => finishGame(true), 600);
      } else {
        setStatus(`Isso! ${GROUPS.length - solved.length} grupo${GROUPS.length - solved.length > 1 ? "s" : ""} restante${GROUPS.length - solved.length > 1 ? "s" : ""}.`);
      }
    }, 420);
  } else {
    errors++;
    renderAttempts();
    selection.forEach(s => s.tile.classList.add("shake"));

    // Dica estilo Connections: quantas delas pertencem ao mesmo grupo
    const counts = {};
    selection.forEach(s => {
      const g = groupOf(s.word);
      counts[g.id] = (counts[g.id] || 0) + 1;
    });
    const best = Math.max(...Object.values(counts));

    setTimeout(() => {
      selection.forEach(s => s.tile.classList.remove("shake", "selected"));
      selection = [];
      btnCheck.disabled = true;
      locked = false;

      if (errors >= MAX_ERRORS) {
        finishGame(false);
      } else {
        setStatus(`Não é esse grupo... ${best} das 4 palavras pertencem ao mesmo grupo.`);
      }
    }, 550);
  }
}

function finishGame(won) {
  locked = true;
  // Revela os grupos que faltavam
  const missing = GROUPS.filter(g => !solved.includes(g));
  missing.forEach(g => renderSolvedBar(g));
  gridEl.innerHTML = "";

  if (won) {
    overlayTitle.textContent = "Parabéns! 🎉";
    overlayText.textContent =
      "Você formou os 4 grupos e revisou os conceitos de Arquitetura Computacional. Reveja as faixas coloridas acima para fixar cada definição.";
  } else {
    overlayTitle.textContent = "Fim de jogo";
    overlayText.textContent =
      "Suas 4 tentativas acabaram. Os grupos revelados acima mostram a resposta — leia as explicações e tente de novo.";
  }
  overlay.classList.remove("hidden");
}

function resetGame() {
  solved = [];
  errors = 0;
  selection = [];
  locked = false;
  solvedEl.innerHTML = "";
  overlay.classList.add("hidden");
  remaining = shuffle(GROUPS.flatMap(g => g.words));
  renderAttempts();
  renderGrid();
  clearSelection();
}

btnCheck.addEventListener("click", checkSelection);
btnClear.addEventListener("click", () => { if (!locked) clearSelection(); });
btnReset.addEventListener("click", resetGame);
btnPlayAgain.addEventListener("click", resetGame);
document.getElementById("btnCloseOverlay").addEventListener("click", () => {
  overlay.classList.add("hidden");
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") overlay.classList.add("hidden");
});

resetGame();

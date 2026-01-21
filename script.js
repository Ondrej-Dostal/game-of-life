const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellSize = 20;
const cols = 30;
const rows = 30;

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

let grid = createGrid();
let running = false;
let intervalId = null;

// vytvoření prázdné mřížky
function createGrid() {
  return Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  );
}

// kreslení
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.strokeStyle = "#666";
      ctx.strokeRect(
        x * cellSize,
        y * cellSize,
        cellSize,
        cellSize
      );

      if (grid[y][x]) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(
          x * cellSize,
          y * cellSize,
          cellSize,
          cellSize
        );
      }
    }
  }
}

// počítání sousedů
function countNeighbors(x, y) {
  let count = 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;

      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        count += grid[ny][nx];
      }
    }
  }
  return count;
}

// další generace
function update() {
  const next = createGrid();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const n = countNeighbors(x, y);

      if (grid[y][x] === 1 && (n === 2 || n === 3)) {
        next[y][x] = 1;
      } else if (grid[y][x] === 0 && n === 3) {
        next[y][x] = 1;
      }
    }
  }

  grid = next;
  draw();
}

// klikání myší
canvas.addEventListener("click", e => {
  if (running) return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / cellSize);
  const y = Math.floor((e.clientY - rect.top) / cellSize);

  grid[y][x] = grid[y][x] ? 0 : 1;
  draw();
});

// tlačítka
document.getElementById("start").onclick = () => {
  if (!running) {
    running = true;
    intervalId = setInterval(update, 200);
  }
};

document.getElementById("stop").onclick = () => {
  running = false;
  clearInterval(intervalId);
};

document.getElementById("clear").onclick = () => {
  running = false;
  clearInterval(intervalId);
  grid = createGrid();
  draw();
};

draw();

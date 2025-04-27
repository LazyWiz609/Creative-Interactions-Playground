// Variables for tile grid
const tileGrid = document.getElementById('tileGrid');
const tileWidth = 30;
const tileHeight = 30;
let tiles = [];
let tileMap = [];
let columns = 0;
let rows = 0;
let mouseX = 0;
let mouseY = 0;

// Variables for background glow
const backgroundGlow = document.getElementById('backgroundGlow');
let glowX = 0;
let glowY = 0;

// Variables for ripple effect
let lastMouseX = 0;
let lastMouseY = 0;
let velocity = 0;
let rippleTiles = [];

// Generate the grid of tiles
function generateGrid() {
  tileGrid.innerHTML = '';
  tiles = [];
  tileMap = [];

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  columns = Math.ceil(windowWidth / tileWidth);
  rows = Math.ceil(windowHeight / tileHeight);

  tileGrid.style.gridTemplateColumns = `repeat(${columns}, ${tileWidth}px)`;
  tileGrid.style.gridAutoRows = `${tileHeight}px`;

  for (let row = 0; row < rows; row++) {
    tileMap[row] = [];
    for (let col = 0; col < columns; col++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.row = row;
      tile.dataset.col = col;
      tileGrid.appendChild(tile);

      tileMap[row][col] = tile;
      tiles.push(tile);
    }
  }
}

// Track mouse movement and speed
document.addEventListener('mousemove', (e) => {
  const dx = e.clientX - lastMouseX;
  const dy = e.clientY - lastMouseY;
  velocity = Math.sqrt(dx * dx + dy * dy);
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;

  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate tiles and glow
function animateTiles() {
  // Move glow smoothly
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;
  backgroundGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;

  const col = Math.floor(mouseX / tileWidth);
  const row = Math.floor(mouseY / tileHeight);
  const radius = 2; // how many tiles around to affect

  // Reset all tiles first
  tiles.forEach(tile => {
    tile.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    tile.style.boxShadow = `none`;
  });

  // Animate nearby tiles only
  for (let r = row - radius; r <= row + radius; r++) {
    for (let c = col - radius; c <= col + radius; c++) {
      if (r >= 0 && r < rows && c >= 0 && c < columns) {
        const tile = tileMap[r][c];
        const tileCenterX = c * tileWidth + tileWidth / 2;
        const tileCenterY = r * tileHeight + tileHeight / 2;

        const dx = mouseX - tileCenterX;
        const dy = mouseY - tileCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 60) {
          const angleX = dy / 20;
          const angleY = -dx / 20;
          const scale = 1.1;

          tile.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(${scale})`;

          const glowStrength = Math.max(0, (200 - distance) / 200);
          tile.style.boxShadow = `0 0 ${30 * glowStrength}px #00ffffaa`;
        }
      }
    }
  }

  // Trigger ripple if moving fast
  if (velocity > 20) {
    triggerRipple(mouseX, mouseY);
  }

  requestAnimationFrame(animateTiles);
}

// Ripple function
function triggerRipple(x, y) {
  const rippleCol = Math.floor(x / tileWidth);
  const rippleRow = Math.floor(y / tileHeight);
  const rippleRadius = 1;

  for (let r = rippleRow - rippleRadius; r <= rippleRow + rippleRadius; r++) {
    for (let c = rippleCol - rippleRadius; c <= rippleCol + rippleRadius; c++) {
      if (r >= 0 && r < rows && c >= 0 && c < columns) {
        const tile = tileMap[r][c];
        if (!rippleTiles.includes(tile)) {
          rippleTiles.push(tile);
          tile.classList.add('ripple');
          setTimeout(() => {
            tile.classList.remove('ripple');
            rippleTiles = rippleTiles.filter(t => t !== tile);
          }, 500);
        }
      }
    }
  }
}

// Handle window resize
window.addEventListener('resize', () => {
  generateGrid();
});

// INITIALIZE
generateGrid();
animateTiles();

const tileGrid = document.getElementById('tileGrid');
const tileWidth = 60;
const tileHeight = 60;
let tiles = [];
let mouseX = 0;
let mouseY = 0;

// Generate the grid
function generateGrid() {
  tileGrid.innerHTML = '';

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const columns = Math.ceil(windowWidth / tileWidth);
  const rows = Math.ceil(windowHeight / tileHeight);

  tileGrid.style.gridTemplateColumns = `repeat(${columns}, ${tileWidth}px)`;
  tileGrid.style.gridAutoRows = `${tileHeight}px`;

  const totalTiles = columns * rows;
  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tileGrid.appendChild(tile);
  }

  tiles = document.querySelectorAll('.tile');
}

// Mousemove tracker
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Main animation loop (way faster than mousemove)
function animateTiles() {
  tiles.forEach(tile => {
    const rect = tile.getBoundingClientRect();
    const tileCenterX = rect.left + rect.width / 2;
    const tileCenterY = rect.top + rect.height / 2;

    const dx = mouseX - tileCenterX;
    const dy = mouseY - tileCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 60) { // Only if near cursor
      const angleX = dy / 20;
      const angleY = -dx / 20;
      const scale = 1.1;

      tile.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(${scale})`;

      // Glow brightness based on distance
      const glowStrength = Math.max(0, (200 - distance) / 200); // 0 to 1
      tile.style.boxShadow = `0 0 ${30 * glowStrength}px #00ffffaa`;
    } else {
      tile.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
      tile.style.boxShadow = `none`;
    }
  });

  requestAnimationFrame(animateTiles);
}

// Resize handler
window.addEventListener('resize', () => {
  generateGrid();
});

// Init
generateGrid();
requestAnimationFrame(animateTiles);

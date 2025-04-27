const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Fullscreen the canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Start drawing
canvas.addEventListener('mousedown', () => {
  drawing = true;
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath(); // resets path so no line joins
});

// Drawing when moving
canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  ctx.lineWidth = 5; // thickness of pencil
  ctx.lineCap = 'round'; // make edges round
  ctx.strokeStyle = '#000'; // color of pencil

  ctx.lineTo(e.clientX, e.clientY); // go to mouse position
  ctx.stroke(); // actually draw the line
  ctx.beginPath(); // restart path from new point
  ctx.moveTo(e.clientX, e.clientY);
});
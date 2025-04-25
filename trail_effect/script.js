const trails = document.querySelectorAll('.trail');
const coords = Array(trails.length).fill({ x: 0, y: 0 });

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  let x = mouseX;
  let y = mouseY;

  coords.forEach((coord, i) => {
    const next = coords[i] = {
      x: coord.x + (x - coord.x) * 0.3,
      y: coord.y + (y - coord.y) * 0.3,
    };

    trails[i].style.left = next.x + 'px';
    trails[i].style.top = next.y + 'px';

    x = next.x;
    y = next.y;
  });

  requestAnimationFrame(animate);
}

animate();

const ball = document.getElementById('ball');
const spans = document.querySelectorAll('#fancy-text span');

window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';
});
document.documentElement.style.cursor = 'none';

const text = document.querySelector('h1');

text.addEventListener('mouseenter', () => {
    ball.style.width = '100px';
    ball.style.height = '100px';
});

text.addEventListener('mouseleave', () => {
    ball.style.width = '20px';
    ball.style.height = '20px';
  });

  const heading = document.getElementById('fancy-text');
const letters = heading.innerText.split('');

heading.innerHTML = ''; // Clear original text

letters.forEach(char => {
  const span = document.createElement('span');
  span.innerText = char;
  heading.appendChild(span);
});
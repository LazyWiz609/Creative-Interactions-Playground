document.documentElement.style.cursor = 'none';

const cursor = document.querySelector('.cursor');
const overlay = document.querySelector('.overlay');
const h1 = document.querySelector('h1');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;


    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    overlay.style.maskImage = `radial-gradient(circle at ${mouseX}px ${mouseY}px, transparent 1%, rgba(255, 255, 255, 1) 10%)`;
    overlay.style.webkitMaskImage = `radial-gradient(circle at ${mouseX}px ${mouseY}px, transparent 1%, rgba(255, 255, 255, 1) 10%)`; // For Webkit browsers
});
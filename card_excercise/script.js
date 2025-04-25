const cursor = document.getElementById('cursor');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
});

document.documentElement.style.cursor = 'none';

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
    });
    card.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});

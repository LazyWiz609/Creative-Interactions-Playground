const cards = document.querySelectorAll('.card');

// Mouse move event for tilting the card
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const { width, height } = card.getBoundingClientRect();
    const offsetX = e.clientX - card.offsetLeft;
    const offsetY = e.clientY - card.offsetTop;

    const centerX = width / 2;
    const centerY = height / 2;

    // Get the tilt factor based on cursor position
    const tiltX = (offsetY - centerY) / centerY;
    const tiltY = (offsetX - centerX) / centerX;

    // Apply tilt with a smooth transition
    card.style.transform = `rotateX(${tiltX * 10}deg) rotateY(${tiltY * 10}deg)`;
    card.style.boxShadow = `${tiltX * 10}px ${tiltY * 10}px 15px rgba(0, 0, 0, 0.1)`;
  });

  // Reset tilt when mouse leaves
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    card.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
  });
});

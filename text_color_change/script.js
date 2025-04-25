const revealContainer = document.querySelector('.gradient-text');

revealContainer.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = revealContainer.getBoundingClientRect();
  const mouseX = e.clientX - left;
  const mouseY = e.clientY - top;

  const offsetX = (mouseX / width) * 100;
  const offsetY = (mouseY / height) * 100;

  revealContainer.style.setProperty('--mouse-x', `${offsetX}%`);
  revealContainer.style.setProperty('--mouse-y', `${offsetY}%`);
});

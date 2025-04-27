document.addEventListener('mousedown', (e) => {
    createBall(e.clientX, e.clientY);
  });

  function createBall(x, y) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.body.appendChild(ball);

    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    let posY = y;
    let velocity = 0;
    let gravity = 1; // gravity acceleration
    let bounceFactor = 0.7; // lose 30% height each bounce
    let bounces = 0;
    let maxBounces = 10;

    let squash = false;
    let ground = window.innerHeight - 15; // considering ball radius

    function animate() {
      velocity += gravity;
      posY += velocity;

      if (posY >= ground) {
        posY = ground;
        velocity *= -bounceFactor;
        squash = true;
        bounces++;
      }

      // Apply squash/stretch
      if (squash) {
        ball.style.transform = `translate(-50%, -50%) scale(1.5, 0.5)`;
        squash = false;
        setTimeout(() => {
          ball.style.transform = `translate(-50%, -50%) scale(1, 1)`;
        }, 100);
      } else if (velocity < 0) {
        // Stretch when moving upwards
        ball.style.transform = `translate(-50%, -50%) scale(0.7, 1.3)`;
      } else {
        // Normal during falling
        ball.style.transform = `translate(-50%, -50%) scale(1, 1)`;
      }

      ball.style.top = `${posY}px`;

      if (bounces >= maxBounces && Math.abs(velocity) < 2) {
        // Remove ball after settling
        ball.remove();
        return;
      }

      requestAnimationFrame(animate);
    }

    animate();
  }
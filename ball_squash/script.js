document.addEventListener('mousedown', (e) => {
    createBall(e.clientX, e.clientY);
  });

  function createBall(x, y) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.body.appendChild(ball);

    ball.style.position = 'absolute';
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    let posY = y;
    let velocity = 0;
    let gravity = 0.8; // gravity acceleration
    let bounceFactor = 0.8; // lose 30% height each bounce
    let bounces = 0;
    let maxBounces = 20;

    let squash = false;
    let ground = window.innerHeight; // considering ball radius

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
        }, 200);
      } else if (velocity < 0) {
        // Stretch when moving upwards
        ball.style.transform = `translate(-50%, -50%) scale(0.7, 1.3)`;
      } else if (12 > velocity > 0) {
        // Normal during falling
        ball.style.transform = `translate(-50%, -50%) scale(1, 1)`;
      } else{
        // Stretch when moving downwards
        ball.style.transform = `translate(-50%, -50%) scale(0.7, 1.3)`;
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
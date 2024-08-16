const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

function randomColor() {
  return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1.0)`;
}

function randomDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

const Circle = (x, y, radius, thickness) => ({
  x,
  y,
  radius,
  thickness,
  vx: Math.random() * 10,
  vy: Math.random() * 10,
  dx: randomDirection(),
  dy: randomDirection(),
  color: randomColor(),
  border: randomColor(),

  draw: function () {
    c.lineWidth = this.thickness;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = this.border;
    c.stroke();
  },

  update: function () {
    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.dx = -this.dx;
    } else if (this.x + this.radius >= canvas.width) {
      this.x = canvas.width - this.radius - 1;
      this.dx = -this.dx;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.dy = -this.dy;
    } else if (this.y + this.radius >= canvas.height) {
      this.y = canvas.height - this.radius - 1;
      this.dy = -this.dy;
    }

    this.x += this.dx * this.vx;
    this.y += this.dy * this.vy;

    this.draw();
  },
});

const circles = [];

for (let i = 0; i < 100; i++) {
  const radius = 10;
  const rx = Math.random() * (canvas.width - radius * 2) + radius;
  const ry = Math.random() * (canvas.height - radius * 2) + radius;

  circles.push(Circle(rx, ry, radius, 1));
}

async function animate() {
  await new Promise((r) => setTimeout(r, 16));
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => circle.update());
}

animate();

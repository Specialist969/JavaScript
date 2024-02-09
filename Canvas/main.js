const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const balls = [];
const ballRadius = 10;
const minDistance = 50;
const repelForce = 10;
const attractForce = 5;
let mouseX, mouseY;

function start() {
    balls.length = 0;
    for (let i = 0; i < 5; i++) {
        balls.push({
            x: Math.random() * (canvas.width - ballRadius * 2) + ballRadius,
            y: Math.random() * (canvas.height - ballRadius * 2) + ballRadius,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
        });
    }
    update();
}

function reset() {
    balls.length = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x - ballRadius < 0 || ball.x + ballRadius > canvas.width) {
            ball.dx *= -1;
        }

        if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
            ball.dy *= -1;
        }

        balls.forEach((otherBall) => {
            if (ball !== otherBall) {
                const distance = Math.hypot(ball.x - otherBall.x, ball.y - otherBall.y);

                if (distance < minDistance) {
                    ctx.beginPath();
                    ctx.moveTo(ball.x, ball.y);
                    ctx.lineTo(otherBall.x, otherBall.y);
                    ctx.stroke();
                }
            }
        });

        const distanceToMouse = Math.hypot(ball.x - mouseX, ball.y - mouseY);

        if (distanceToMouse < minDistance) {
            const angle = Math.atan2(ball.y - mouseY, ball.x - mouseX);
            const force = repelForce / distanceToMouse;
            ball.dx += force * Math.cos(angle);
            ball.dy += force * Math.sin(angle);
        }

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    });

    requestAnimationFrame(update);
}

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - canvas.getBoundingClientRect().left;
    mouseY = e.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener('click', (e) => {
    balls.forEach((ball, index) => {
        const distanceToClick = Math.hypot(ball.x - mouseX, ball.y - mouseY);
        if (distanceToClick < ballRadius) {
            balls.splice(index, 1);
            balls.push({
                x: Math.random() * (canvas.width - ballRadius * 2) + ballRadius,
                y: Math.random() * (canvas.height - ballRadius * 2) + ballRadius,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2,
            });
            balls.push({
                x: Math.random() * (canvas.width - ballRadius * 2) + ballRadius,
                y: Math.random() * (canvas.height - ballRadius * 2) + ballRadius,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2,
            });
        }
    });
});

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;
start();

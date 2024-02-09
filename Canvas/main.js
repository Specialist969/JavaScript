// Pobranie elementu
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Tablica przechowująca kulki
const balls = [];
const ballRadius = 10; // Promień kulki
const minDistance = 50; // Minimalna odległość między kulami
const repelForce = 10; // Siła odpychająca kulki od myszy
const attractForce = 5; // Siła przyciągająca kulki do myszy

// Zmienne przechowujące aktualne położenie myszy
let mouseX, mouseY;

// Rozpoczęcie
function start() {
    // Wyczyszczenie tablicy
    balls.length = 0;
    
    // Wygenerowanie pięciu losowych kul
    for (let i = 0; i < 5; i++) {
        balls.push({
            x: Math.random() * (canvas.width - ballRadius * 2) + ballRadius,
            y: Math.random() * (canvas.height - ballRadius * 2) + ballRadius,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
        });
    }
    
    // Rozpoczęcie animacji
    update();
}

// Funkcja resetująca
function reset() {
    balls.length = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Funkcja aktualizująca
function update() {
    // Wyczyszczenie
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Aktualizacja położenia każdej kulki
    balls.forEach((ball) => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Odbicie kulki od krawędzi
        if (ball.x - ballRadius < 0 || ball.x + ballRadius > canvas.width) {
            ball.dx *= -1;
        }
        if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
            ball.dy *= -1;
        }

        // Sprawdzenie odległości między kulami wraz rysowanie linii
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

        // Sprawdzenie odległości między kulą a myszą i wpływ na kierunek ruchu kulki
        const distanceToMouse = Math.hypot(ball.x - mouseX, ball.y - mouseY);
        if (distanceToMouse < minDistance) {
            const angle = Math.atan2(ball.y - mouseY, ball.x - mouseX);
            const force = repelForce / distanceToMouse;
            ball.dx += force * Math.cos(angle);
            ball.dy += force * Math.sin(angle);
        }

        // Narysowanie kulki
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    });

    // Rekurencyjne wywołanie funkcji update()
    requestAnimationFrame(update);
}

// Sledzenie ruchu myszy
canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - canvas.getBoundingClientRect().left;
    mouseY = e.clientY - canvas.getBoundingClientRect().top;
});

// Sprawdzanie kliknięcia, usuwający kulki w miejscu kliknięcia i dodający nowe kulki
canvas.addEventListener('click', (e) => {
    balls.forEach((ball, index) => {
        const distanceToClick = Math.hypot(ball.x - mouseX, ball.y - mouseY);
        if (distanceToClick < ballRadius) {
            balls.splice(index, 1);
            // Dodanie dwóch nowych losowych kul
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

// Ustawienie wymiarów 
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;
start();

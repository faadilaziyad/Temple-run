const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0
};

let obstacles = [];
let score = 0;
let gameOver = false;

function drawPlayer() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx;

    // Wall detection
    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

function update() {
    if (gameOver) {
        return;
    }

    clear();
    drawPlayer();
    newPos();

    // Update obstacles
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += 5;
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

        // Collision detection
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.height > obstacles[i].y
        ) {
            gameOver = true;
            alert('Game Over! Your score: ' + score);
        }

        // Remove obstacles that are off-screen
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
        }
    }

    requestAnimationFrame(update);
}

function moveRight() {
    player.dx = player.speed;
}

function moveLeft() {
    player.dx = -player.speed;
}

function stop() {
    player.dx = 0;
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft();
    }
}

function keyUp(e) {
    if (
        e.key === 'ArrowRight' ||
        e.key === 'd' ||
        e.key === 'ArrowLeft' ||
        e.key === 'a'
    ) {
        stop();
    }
}

// Create obstacles periodically
setInterval(() => {
    let obstacleX = Math.random() * (canvas.width - 50);
    obstacles.push({ x: obstacleX, y: -50, width: 50, height: 50 });
}, 1000);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();

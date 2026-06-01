const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const box = 20;

let snake = [
    { x: 200, y: 200 }
];

let direction = "RIGHT";

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }

    if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }

    if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}

function drawGame() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Snake
    ctx.fillStyle = "lime";

    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    // Eat food
    if (headX === food.x && headY === food.y) {

        score++;
        scoreText.innerText = `Score: ${score}`;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };

    } else {
        snake.pop();
    }

    const newHead = {
        x: headX,
        y: headY
    };

    // Wall collision
    if (
        headX < 0 ||
        headY < 0 ||
        headX >= canvas.width ||
        headY >= canvas.height
    ) {
        gameOver();
        return;
    }

    // Self collision
    for (let i = 0; i < snake.length; i++) {

        if (
            snake[i].x === newHead.x &&
            snake[i].y === newHead.y
        ) {
            gameOver();
            return;
        }
    }

    snake.unshift(newHead);
}

function gameOver() {

    clearInterval(game);

    alert(`Game Over!\nYour Score: ${score}`);
}

const game = setInterval(drawGame, 120);

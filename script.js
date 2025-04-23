const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Размер одной клетки
let snake = [{ x: 9 * box, y: 9 * box }]; // Начальная позиция змейки
let direction = null;
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
};
let score = 0;

// Рисуем игровое поле
function drawGame() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем еду
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Рисуем змейку
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Движение змейки
    let head = { ...snake[0] };
    if (direction === "LEFT") head.x -= box;
    if (direction === "UP") head.y -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "DOWN") head.y += box;

    // Порталы на стенах
    if (head.x < 0) head.x = canvas.width - box; // Левая стена -> правая
    if (head.x >= canvas.width) head.x = 0; // Правая стена -> левая
    if (head.y < 0) head.y = canvas.height - box; // Верхняя стена -> нижняя
    if (head.y >= canvas.height) head.y = 0; // Нижняя стена -> верхняя

    // Проверка на столкновение с едой
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop(); // Убираем хвост, если еда не съедена
    }

    // Проверка на столкновение с собой
    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        alert(`Игра окончена! Ваш счет: ${score}`);
        document.location.reload();
    }

    snake.unshift(head); // Добавляем новую голову
}

// Управление змейкой
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Запуск игры
setInterval(drawGame, 100);

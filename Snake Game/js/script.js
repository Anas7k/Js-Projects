// DOM element selection
const gameBoard = document.querySelector(".game-board");
const currentScore = document.querySelector(".current-score");
const highestScore = document.querySelector(".highest-score");
const gameControls = document.querySelectorAll(".game-controls i");

// Game state variables
let gameOver = false;
let foodX, foodY;
let gridSize;
let snakeX = Math.floor(Math.random() * 10) + 11;
let snakeY = Math.floor(Math.random() * 10) + 11;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let score = 0;
let intervalDuration = 100;
const minimumIntervalDuration = 70;

// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highestScore.innerText = `High Score: ${highScore}`;

// Adjust grid size based on screen width
const adjustGridSize = () => {
    if (window.innerWidth <= 600) {
        gridSize = 20;
    } else {
        gridSize = 30;
    }
    gameBoard.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
}

// Call adjustGridSize on page load and on window resize
adjustGridSize();
window.addEventListener('resize', adjustGridSize);

// Update food position randomly within grid
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * gridSize) + 1;
    foodY = Math.floor(Math.random() * gridSize) + 1;
}

// Handle game over condition
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
}

// Change snake direction based on key press or control click
const changeDirection = e => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Event listener for control buttons to change snake direction
gameControls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

// Initialize game loop
const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Check if snake eats food and update game state
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        currentScore.innerText = `Score: ${score}`;
        highestScore.innerText = `High Score: ${highScore}`;
        
        // Increase game speed
        intervalDuration -= 10;
        if (intervalDuration < minimumIntervalDuration) {
            intervalDuration = minimumIntervalDuration;
        }
        clearInterval(setIntervalId);
        setIntervalId = setInterval(initGame, intervalDuration);
    }
    
    // Update snake position based on velocity
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Move snake body segments
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    // Check collision with game boundaries
    if(snakeX <= 0 || snakeX > gridSize || snakeY <= 0 || snakeY > gridSize) {
        return gameOver = true;
    }
    // Render snake and food on game board
    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Check collision with snake's own body
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    gameBoard.innerHTML = html; // Update game board with new elements
}

updateFoodPosition(); // Place initial food
let setIntervalId = setInterval(initGame, intervalDuration); // Start game loop
document.addEventListener("keydown", changeDirection); // Listen for keyboard input

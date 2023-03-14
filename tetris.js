const gameBoard = document.getElementById("game-board");
const nextPiece = document.getElementById("next-piece");
const scoreBoard = document.getElementById("score");

const BLOCK_SIZE = 30;
const ROWS = 20;
const COLS = 10;
const EMPTY = "white";
const COLORS = [
    EMPTY,
    "cyan",
    "blue",
    "orange",
    "yellow",
    "green",
    "purple",
    "red"
];

let board = [];
let currentPiece;
let nextPieceShape;
let currentPieceColor;
let nextPieceColor;
let currentPiecePosition;
let score = 0;
let isGameOver = false;
let intervalId;

function initBoard() {
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = EMPTY;
        }
    }
}

function drawBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            drawSquare(col, row, board[row][col]);
        }
    }
}

function drawSquare(x, y, color) {
    gameBoard.getContext("2d").fillStyle = COLORS[color];
    gameBoard.getContext("2d").fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    gameBoard.getContext("2d").strokeStyle = "black";
    gameBoard.getContext("2d").strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawPiece() {
    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece.length; col++) {
            if (currentPiece[row][col]) {
                drawSquare(currentPiecePosition.x + col, currentPiecePosition.y + row, currentPieceColor);
            }
        }
    }
}

function undrawPiece() {
    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece.length; col++) {
            if (currentPiece[row][col]) {
                drawSquare(currentPiecePosition.x + col, currentPiecePosition.y + row, EMPTY);
            }
        }
    }
}

function moveDown() {
    currentPiecePosition.y++;
    if (isCollision()) {
        currentPiecePosition.y--;
        lockPiece();
        getNextPiece();
    }
    undrawPiece();
    drawPiece();
}

function moveRight() {
    currentPiecePosition.x++;
    if (isCollision()) {
        currentPiecePosition.x--;
    }
    undrawPiece();
    drawPiece();
}

function moveLeft() {
    currentPiecePosition.x--;
    if (isCollision()) {
        currentPiecePosition.x++;
    }
    undrawPiece();
    drawPiece();
}

function rotate() {
    let rotatedPiece = [];
    for (let i = 0; i < currentPiece.length; i++) {
        rotatedPiece[i] = [];
        for (let j = 0; j < currentPiece.length; j++) {
            rotatedPiece[i][j] = currentPiece[currentPiece.length - j - 1][i];
        }
    }
    if (!isCollision(rotatedPiece, currentPiecePosition)) {
        undrawPiece();
        currentPiece = rotatedPiece;
        drawPiece();
    }
}

function isCollision(piece = currentPiece, position = currentPiecePosition) {
    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece.length; col++) {
            if (
                piece[row][col] &&
                (position.y + row >= ROWS ||
                    position.x + col < 0 ||
                    position.x + col >= COLS ||
                    board[position.y + row][position.x + col] !== EMPTY)
            ) {
                return true;
            }
        }
    }
    return false;
}

function lockPiece() {
    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece.length; col++) {
            if (currentPiece[row][col]) {
                board[currentPiecePosition.y + row][currentPiecePosition.x + col] = currentPieceColor;
            }
        }
    }
    clearLines();
}

function clearLines() {
    let linesCleared = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every((value) => value !== EMPTY)) {
            linesCleared++;
            for (let r = row; r > 0; r--) {
                board[r] = [...board[r - 1]];
            }
            board[0] = Array.from({ length: COLS }, () => EMPTY);
            row++;
        }
    }
    if (linesCleared > 0) {
        score += linesCleared * linesCleared * 100;
        updateScore();
    }
}

function updateScore() {
    scoreBoard.innerHTML = score;
}

function gameOver() {
    isGameOver = true;
    clearInterval(intervalId);
    gameBoard.getContext("2d").font = "bold 30px Arial";
    gameBoard.getContext("2d").fillStyle = "red";
    gameBoard.getContext("2d").textAlign = "center";
    gameBoard.getContext("2d").textBaseline = "middle";
    gameBoard.getContext("2d").fillText("GAME OVER", 150, 250);
}

function update() {
    if (isGameOver) {
        return;
    }
    if (!currentPiece) {
        spawnPiece();
        drawNextPiece();
    } else {
        movePieceDown();
    }
}

document.addEventListener("keydown", handleKeyPress);

initBoard();
drawBoard();




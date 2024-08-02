const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (gameState[index] !== null) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.style.pointerEvents = 'none';

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        endGame();
    } else if (gameState.every(cell => cell !== null)) {
        message.textContent = `It's a draw!`;
        endGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningCombinations.some(combination => 
        combination.every(index => gameState[index] === currentPlayer)
    );
}

function endGame() {
    cells.forEach(cell => cell.style.pointerEvents = 'none');
}

function resetGame() {
    gameState = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
    message.textContent = '';
    currentPlayer = 'X';
}

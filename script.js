// script.js
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameBtn = document.getElementById('new-game');

let currentPlayer = 'X';
let gameState = Array(9).fill('');
let isGameActive = true;

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Create board cells
function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameState[index] !== '' || !isGameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    showResultScreen(`Player ${currentPlayer} Wins!`);
    isGameActive = false;
  } else if (!gameState.includes('')) {
    showResultScreen("It's a Draw!");
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for a win or draw
function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => gameState[index] === currentPlayer);
  });
}

// Reset game
function resetGame() {
  currentPlayer = 'X';
  gameState = Array(9).fill('');
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

// Show result screen
function showResultScreen(message) {
  resultMessage.textContent = message;
  resultScreen.classList.remove('hidden');
}

// Start a new game
function startNewGame() {
  resultScreen.classList.add('hidden');
  resetGame();
}

// Initialize game
function initializeGame() {
  createBoard();
  resetGame();
  board.addEventListener('click', handleCellClick);
  resetBtn.addEventListener('click', resetGame);
  newGameBtn.addEventListener('click', startNewGame);
}

initializeGame();


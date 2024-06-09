const gameContainer = document.getElementById('game');
const winnerMessage = document.getElementById('winnerMessage');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        gameContainer.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');
    
    if (board[index] !== '' || checkWinner()) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        winnerMessage.textContent = `Jogador ${currentPlayer} venceu!`;
        winnerMessage.style.display = 'block';
    } else if (board.every(cell => cell !== '')) {
        winnerMessage.textContent = 'Empate!';
        winnerMessage.style.display = 'block';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
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

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    winnerMessage.style.display = 'none';
    winnerMessage.textContent = '';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
}

createBoard();


// Thiago Torres
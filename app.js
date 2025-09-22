let board;
let currentPlayer;
let gameOver;
let winner;

function initializeGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    winner = null;

    console.log("Game initialized. Player X starts.",board);

    renderBoard();
}

function renderBoard() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < board.length; i++) {
        if (cells[i]) {
            cells[i].innerText = board[i] ? board[i] : "";
            cells[i].classList.remove("x", "o"); // reset classes
            if (board[i] === "X") cells[i].classList.add("x");
            if (board[i] === "O") cells[i].classList.add("o");
        }
    }
    let statusText = document.getElementById("statusText");
    if (winner && winner !== "Draw") {
        statusText.innerText = `Player ${winner} wins! 🎉`;
    } else if (winner === "Draw") {
        statusText.innerText = "It's a draw 🤝";
    } else {
        statusText.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }   
    return null;
}

function cellClicked(index) {
    if (gameOver || board[index]) {
        return;
    }

    // Update the board array
    board[index] = currentPlayer;

    // Check for a winner
    winner = checkWinner();
    if (winner) {
        gameOver = true;
        console.log(`Player ${winner} wins!`);
    } else if (!board.includes(null)) {
        gameOver = true;
        console.log("It's a draw!");
    } else {
        // Update game state variables
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Render the board
    renderBoard();
}

// --- TEST CASES ---
/* let testBoard1 = ["X", "X", "X", null, null, null, null, null, null]; // row win
let testBoard2 = ["O", null, null, "O", null, null, "O", null, null]; // column win
let testBoard3 = [null, null, "X", null, "X", null, "X", null, null]; // diagonal win
let testBoard4 = ["X","O","X","X","O","O","O","X","X"];               // draw
let testBoard5 = [null,null,null,null,null,null,null,null,null];      // ongoing
     */

document.addEventListener('DOMContentLoaded', (event) => {
    initializeGame();
    
    renderBoard();
});

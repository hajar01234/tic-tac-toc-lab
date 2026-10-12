/*-------------------------------- Constants --------------------------------*/
const winningCombos = [ [0, 1,2 ], [3,4,5], [6,7,8],[0,3,6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6] ];


/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer ='X';
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/
const squares = document.querySelectorAll('.sqr');
const message = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');


/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  winner = false;
  tie = false;
  render();
}


function render() {
  updateBoard();
  updateMessage();
}


function updateBoard() {
  squares.forEach((square, index) => {
    square.innerText = board[index];
  });
}


function updateMessage() {
  if (winner) {
    message.innerText = `Player ${currentPlayer} wins!`;
  } else if (tie) {
    message.innerText = "It's a tie!";
  } else {
    message.innerText = `Player ${currentPlayer}'s turn`;
  }
}


function handleClick(event) {
  const squareIndex = Number(event.target.id);

  if (board[squareIndex] !== '' || winner || tie) {
    return;
  }

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}


function placePiece(index) {
  board[index] = currentPlayer;
}


function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      winner = true;
      return;
    }
  }
}


function checkForTie() {
  if (winner) {
    return;
  }

  if (!board.includes('')) {
    tie = true;
  }
}


function switchPlayerTurn() {
  if (winner || tie) {
    return;
  }

  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
}

/*----------------------------- Event Listeners -----------------------------*/
squares.forEach((square) => {
  square.addEventListener('click', handleClick);
});
resetBtnEl.addEventListener('click', init);
init();

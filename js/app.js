/*------------------------ Cached Element References ------------------------*/

// 2) Store cached element references on the page that will be accessed in code more than once in variables to make code more concise, readable, and performant:

const msg = document.getElementById('message');
const board = document.querySelector('.board');
const sq0 = document.getElementById('sq0');
const sq1 = document.getElementById('sq1');
const sq2 = document.getElementById('sq2');
const sq3 = document.getElementById('sq3');
const sq4 = document.getElementById('sq4');
const sq5 = document.getElementById('sq5');
const sq6 = document.getElementById('sq6');
const sq7 = document.getElementById('sq7');
const sq8 = document.getElementById('sq8');
const sqrs = document.querySelectorAll('.square');
const sqrsArr = Array.from(sqrs);
const rplybtn = document.getElementById('replay-button');

/*-------------------------------- Variables --------------------------------*/

// 1) Define the required variables used to track the state of the game:
let boardArr, turn, winner;

/*-------------------------------- Constants --------------------------------*/

// 4) Define the required constants:
// const for winning
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*-------------------------------- Functions --------------------------------*/

// 3) Upon loading, the app should:

// 	Call an initialize function to initialize the state variables
// Wait for the user to click a square

init();

function init() {
  boardArr = [null, null, null, null, null, null, null, null, null];
  msg.textContent = "";
  turn = 1;
  // player O = -1, player X = 1, Tie = 'T'
  winner = null;
  render();
}

// 	3.2) Render those values to the page
function render() {
  // Loop over the boardArr and access each square in the sqrsArr
  // Style square dependant on the value contained in the current cell being iterated over (-1, 1, or null)
  boardArr.forEach(function (sqr, idx) {
    if (sqr === null) {
      sqrsArr[idx].textContent = '';
      sqrsArr[idx].style.color = '';
      sqrsArr[idx].style.background = '';
    };

    if (sqr === 1) {
      sqrsArr[idx].textContent = 'X';
      sqrsArr[idx].style.color = 'black';
      sqrsArr[idx].style.background = 'lightgray';
    };

    if (sqr === -1) {
      sqrsArr[idx].textContent = 'O';
      sqrsArr[idx].style.color = 'black';
      sqrsArr[idx].style.background = 'lightgray';
    };

    // If winner has a value other than null (game still in progress), render whose turn it is.
    // If winner is equal to 'T' (tie), render a tie message.
    // Otherwise, render a congratulatory message to which player has won.
    
    if (winner === null) {
      msg.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn`;
    } else if (winner === 'T') {
      msg.textContent = `It's a tie!`;
    } else {
      msg.textContent = `${winner === 1 ? 'X' : 'O'} has won!`;
    };
  });
}

// Loop through the each of the winning combination arrays defined.
// Total up the three board positions using the three indexes in the current combo.
// Convert the total to an absolute value (convert any negative total to positive).
// If the total equals 3, we have a winner! Set the winner variable to the board's value at the index specified by the first index of that winning combination's array by returning that value.

function getWinner() {
  winningCombos.forEach(function(combo) {
    for (i = 0; i < boardArr.length; i++) {
      if (boardArr[combo[0]] + boardArr[combo[1]] + boardArr[combo[2]] === 3) {
        winner = 1;
      } else if (boardArr[combo[0]] + boardArr[combo[1]] + boardArr[combo[2]] === -3) {
        winner = -1;
      } else if (!boardArr.includes(null)) {
        winner = 'T';
      };
    };
  });
};

// 5) Handle a player clicking a square
board.addEventListener('click', handleClick);

function handleClick(evt) {
  // Extract the index from an id assigned to the element in the HTML
  // let idxID = evt.target.id;
  let idx = evt.target.id.replace('sq', '');

  if (boardArr[idx] === null && winner === null) {
    boardArr[idx] = turn;
    turn = turn * -1;
  
    getWinner();
    render();
  }
}

// 6) Handle a player clicking the replay button
rplybtn.addEventListener('click', init);

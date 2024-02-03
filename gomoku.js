// const State = {
//     P1: 1,
//     P2: 2,
// };

// function inRange(value, array) {
//     return value >= 0 && value <= array.length;
// }

// // Function to create a new board
// function makeBoard(size) {
//   return Array(size).fill().map(() => Array(size).fill(0));
// }

// // Use n * n buttons as the goboard
// function printBoard(board) {
//     html = "";
//     for (let i = 0; i < board.length; i++) {
//         html += '<div>';
//         for (let j = 0; j < board[0].length; j++) {
//             if (board[i][j] == State.P1) {
//                 html += `<button id='${i} ${j}' class='p1'></button>`;
//             }
//             else if (board[i][j] == State.P2) {
//                 html += `<button id='${i} ${j}' class='p2'></button>`;
//             }
//             else {
//                 html += `<button id='${i} ${j}' class='empty'></button>`;
//             }
//         }
//         html += '</div>';
//     }
//     document.querySelector('.goboard').innerHTML = html;
// }

// function visitDirection(board, stone, x, y, dx, dy){
//     if (inRange(x, board) && inRange(y, board[0]) && board[x][y] == stone) {
//         return 1 + visitDirection(board, stone, x + dx, y + dy, dx, dy);
//     } else {
//         return 0;
//     }
// }

// function checkDirections(board, stone, x, y){
//     const dx = [0, 1, 1, 1];
//     const dy = [1, 1, 0, -1];
//     for (let i = 0; i < 4; i++) {
//         sum = visitDirection(board, stone, x, y, dx[i], dy[i]) + visitDirection(board, stone, x, y, -dx[i], -dy[i]) - 1;
//         if (sum >= 5) {
//             return true;
//         }
//     }
//     return false;
// }

// // main
// let state = State.P1;
// let board = makeBoard(5);
// document.querySelector(".prompt").innerHTML = (`Player ${state} is playing`);
// printBoard(board);
// document.querySelectorAll("button").forEach((button)=>{
//     button.addEventListener("click", ()=>{
//         input = button.id.split(" ");
//         row = input[0];
//         col = input[1];
//         board[row][col] = state;
//         printBoard(board)
//         if (checkDirections(board, state, row, col)) {
//             document.querySelector(".prompt").innerHTML = (`Player ${state} wins`);
//         }
//         else {
//             switch (state) {
//                 case State.P1:
//                     state = State.P2;
//                 case State.P2:
//                     state = State.P1;
//             }
//             document.querySelector(".prompt").innerHTML = (`Player ${state} is playing`);
//         }
//     })
// })

const boardSize = 10;
const goBoard = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));

function renderGoBoard() {
    const boardElement = document.getElementById('goBoard');
    boardElement.innerHTML = ''; // Clear previous board
    boardElement.className = 'board';
  
    for (let i = 0; i < boardSize; i++) {
      const cellRowElement = document.createElement('div');
      cellRowElement.className = 'row-container';

      for (let j = 0; j < boardSize; j++) {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellRowElement.appendChild(cellElement);
  
        // Example: If you want to add stones dynamically, use goBoard[i][j] to determine
        // if you should add a 'stone' element with 'black' or 'white' class
        // This part is for illustration; you'd update goBoard based on user interaction or game logic
        if (goBoard[i][j] === 'B') {
          const stoneElement = document.createElement('div');
          stoneElement.className = 'stone black';
          cellElement.appendChild(stoneElement);
        } else if (goBoard[i][j] === 'W') {
          const stoneElement = document.createElement('div');
          stoneElement.className = 'stone white';
          cellElement.appendChild(stoneElement);
        }
      }

      boardElement.appendChild(cellRowElement);
    }
  }

  // function renderGoBoard() {
  //   const boardElement = document.getElementById('goBoard');
  //   boardElement.innerHTML = ''; // Clear previous board
  //   boardElement.className = 'board';
  
  //   for (let i = 0; i < boardSize; i++) {
  //     for (let j = 0; j < boardSize; j++) {
  //       const cellElement = document.createElement('div');
  //       cellElement.className = 'cell';
  //       boardElement.appendChild(cellElement);
  
  //       // Example: If you want to add stones dynamically, use goBoard[i][j] to determine
  //       // if you should add a 'stone' element with 'black' or 'white' class
  //       // This part is for illustration; you'd update goBoard based on user interaction or game logic
  //       if (goBoard[i][j] === 'B') {
  //         const stoneElement = document.createElement('div');
  //         stoneElement.className = 'stone black';
  //         cellElement.appendChild(stoneElement);
  //       } else if (goBoard[i][j] === 'W') {
  //         const stoneElement = document.createElement('div');
  //         stoneElement.className = 'stone white';
  //         cellElement.appendChild(stoneElement);
  //       }
  //     }
  //   }
  // }
  
  // Initial render
  renderGoBoard();
  
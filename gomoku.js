let boardSize = 0;
let numWin = 0;

const State = {
  P1: 1,
  P2: 2,
}

const End = {
  Not: 0,
  P1: 1,
  P2: 2,
  Tie: 3,
}

//main
function startGame(){
  toggleScreen("#start-screen", false);
  toggleScreen("#game-interface", true);
  buildGame(boardSize, numWin);
}

function buildGame(size, win){
  const goBoard = new Array(size).fill(null).map(() => new Array(size).fill(null));
  let state = State.P1;
  cellEventListenerWrapper = (event) => cellEventListener(event, goBoard, win);
  removeCellEventListener = () => {document.removeEventListener("click", cellEventListenerWrapper)};

  // Initial render
  renderStatus(state, 0);
  renderGoBoard(goBoard);
  document.addEventListener('click', cellEventListenerWrapper);
}

function inRange(num, min, max){
  return num >= min && num <= max;
}

function visitDirection(board, stone, x, y, dx, dy){
  if (inRange(x, 0, board.length - 1) && inRange(y, 0, board[0].length - 1)) {
    if (board[x][y] == stone){
      return 1 + visitDirection(board, stone, x + dx, y + dy, dx, dy);
    }
  }
  return 0;
}

function maxSumDirections(board, stone, x, y){
  const dx = [0, 1, 1, 1];
  const dy = [1, 1, 0, -1];
  let max = 0;
  for (i = 0; i < 4; i++) {
      sum = visitDirection(board, stone, x, y, dx[i], dy[i]) + visitDirection(board, stone, x, y, -dx[i], -dy[i]) - 1;
      if (max < sum) {
          max = sum;
      }
  }
  return max;
}

function finalState(board, x, y, numWin){
  if (maxSumDirections(board, State.P1, x, y) >= numWin) {
    // Player 1 wins
    return End.P1
  }
  if (maxSumDirections(board, State.P2, x, y) >= numWin) {
    // Player 2 wins
    return End.P2
  }
  for (i = 0; i < board.length; i++){
    for (j = 0; j < board.length; j++){
      if (board[i][j] == null) {
        // Board Not Full && No Winner: Continue
        return End.Not;
      }
    }
  }
  // Board Full && No Winner: Tie
  return End.Tie;
}

function renderStatus(state, condition) {
  const statusElement = document.getElementById('status');
  switch(condition){
    case End.P1:
      statusElement.innerHTML = `Player ${state} wins!`;
      break;
    case End.P2:
      statusElement.innerHTML = `Player ${state} wins!`;
      break;
    case End.Tie:
      statusElement.innerHTML = `Tie!`;
      break;
    case -1:
      statusElement.innerHTML = `Space Occupied`;
      break;
    default:
      statusElement.innerHTML = `Player ${state} is playing...`;
      break;
  }
}

function renderGoBoard(board) {
  const boardElement = document.getElementById('goBoard');
  boardElement.innerHTML = ''; // Clear previous board
  boardElement.className = 'board';

  for (let i = 0; i < board.length; i++) {
    const cellRowElement = document.createElement('div');
    cellRowElement.className = 'row-container';

    for (let j = 0; j < board[0].length; j++) {
      const cellElement = document.createElement('div');
      cellElement.className = 'cell';
      cellElement.id = `${i} ${j}`;
      cellRowElement.appendChild(cellElement);

      if (board[i][j] === State.P1) {
        const stoneElement = document.createElement('div');
        stoneElement.className = 'stone black';
        cellElement.appendChild(stoneElement);
      } else if (board[i][j] === State.P2) {
        const stoneElement = document.createElement('div');
        stoneElement.className = 'stone white';
        cellElement.appendChild(stoneElement);
      }
    }

    boardElement.appendChild(cellRowElement);
  }
}

function cellEventListener(event, board, numWin){
  if (event.target.className != "cell") {
    if (event.target.parentElement.className != "cell") {
      return;
    } else {
      input = event.target.parentElement.id.split(" ");
    }
  } else {
    input = event.target.id.split(" ");
  }
  row = parseInt(input[0]);
  col = parseInt(input[1]);

  // only allow to set stone in empty cells
  // else show status "space occupied"
  if (board[row][col] == null) {
    board[row][col] = state;
  } else {
    renderStatus(state, -1);
    setTimeout(()=>{renderStatus(state, End.Not)}, 1000)
    return;
  }

  // Check if this move ends the game
  end = finalState(board, row, col, numWin);
  if (end != End.Not) {
    renderStatus(state, end);
    renderGoBoard(board);
    removeCellEventListener();
    return;
  }

  // If game continues, switch the player
  if (state == State.P1) {
    state = State.P2;
  } else {
    state = State.P1;
  }
  renderStatus(state, 0);
  renderGoBoard(board);
  return;
}
let cellEventListenerWrapper;
let removeCellEventListener;

function setSize(size){
  boardSize = size;
}

function setNumWin(size){
  boardSize = size;
}

function toggleScreen(id, toggle) {
  let element = document.getElementById(id);
  let display = ( toggle ) ? "block" : "none";
  element.style.display = toggle;
}
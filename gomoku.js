State = {
  P1: 1,
  P2: 2,
}

End = {
  Not: 0,
  P1: 1,
  P2: 2,
  Tie: 3,
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

function isEnd(board, x, y, numWin){
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

function cellEventListener(event){
  if (event.target.className == "cell") {
    input = event.target.id.split(" ");
  } else if (event.target.parentElement.className == "cell") {
    input = event.target.parentElement.id.split(" ");
  }
  row = parseInt(input[0]);
  col = parseInt(input[1]);
  nextState(row, col);
}

function removeCellEventListener(){
  document.removeEventListener("click", cellEventListener);
}

function nextState(row, col) {
  // only allow to set stone in empty cells
  // else show status "space occupied"
  if (goBoard[row][col] == null) {
    goBoard[row][col] = state;
  } else {
    renderStatus(state, -1);
    setTimeout(()=>{renderStatus(state, 0)}, 1000)
    return;
  }

  // Check if this move ends the game
  end = isEnd(goBoard, row, col, 5);
  if (end != 0) {
    renderStatus(state, end);
    renderGoBoard(goBoard);
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
  renderGoBoard(goBoard);
  return;
}


//main
const boardSize = 10;
const goBoard = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));
state = State.P1;

// Initial render
renderStatus(state, 0);
renderGoBoard(goBoard);
document.addEventListener('click', cellEventListener);
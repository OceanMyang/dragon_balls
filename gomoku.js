let State = {
  P1: "Player 1",
  P2: "Player 2",
}

const End = {
  Not: 0,
  P1: 1,
  P2: 2,
  Tie: 3,
}
const maxSize = 20;
const minSize = 5;
const maxWin = 7;
const minWin = 5;
const sizePrompt = "A size?";
const winPrompt = "A magic number?";
const p1Prompt = "Player 1's name?";
const p2Prompt = "Player 2's name?";

let boardSize = 0;
let numWin = 0;
let state = null;
let goBoard = null;
let row = null;
let col = null;
let end = null;

document.getElementById("getSize").innerText = sizePrompt;
document.getElementById("getNumWin").innerText = winPrompt;
document.getElementById("getP1ID").innerText = p1Prompt;
document.getElementById("getP2ID").innerText = p2Prompt;

document.addEventListener("input", ()=>{
  win = document.getElementById("win").value;
  size = document.getElementById("size").value;
  playButton = document.getElementById("play-button")
  if (inRange(size, minSize, maxSize) && inRange(win, minWin, maxWin)) {
    playButton.disabled = false;
  } else {
    playButton.disabled = true;
  }
  if (playButton.disabled) {
    playButton.style.opacity = "50%"
  } else {
    playButton.style.opacity = "100%"
  }
});

document.addEventListener("submit", ()=>{
  if (numWin != 0) {
    intro = document.getElementById("intro");
    intro.innerHTML = `Collect ${numWin} Dragon Balls to Win!`;
  }
});

function startGame(){
  size = document.getElementById("size").value;
  if (inRange(size, minSize, maxSize)) {
    boardSize = parseInt(size);
    document.getElementById("getSize").innerText = sizePrompt + ` Now ${boardSize}!`;
  } else {
    alert("Oops! Seems your size is not in range.");
    size = "";
    return;
  }

  win = document.getElementById("win").value;
  if (inRange(win, minWin, maxWin)) {
    numWin = parseInt(win);
    document.getElementById("getNumWin").innerText = winPrompt + ` Now ${numWin}!`;
  } else {
    alert("Oops! Seems your magic number is not in range.");
    win = "";
    return
  }
  
  p1 = document.getElementById("p1-id").value;
  if (p1 != "") {
    State.P1 = p1;
    document.getElementById("getP1ID").innerText = p1Prompt + ` Now "${State.P1}"!`;
  }

  p2 = document.getElementById("p2-id").value;
  if (p2 != "") {
    State.P2 = p2;
    document.getElementById("getP2ID").innerText = p2Prompt + ` Now "${State.P2}"!`;
  }

  toggleScreen("start-screen", false);
  toggleScreen("game-interface", true);
  buildGame();
}

function buildGame(){
  // Initialize Variables
  state = State.P1;
  goBoard = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));
  row = null;
  col = null;
  end = End.Not;

  // Initial render
  render(state, 0);
  document.addEventListener('click', cellEventListener);
}

function render(state, condition){
  renderStatus(state, condition);
  renderGoBoard(goBoard);
}

function toggleScreen(id, toggle) {
  let element = document.getElementById(id);
  let display = ( toggle ) ? "block" : "none";
  element.style.display = display;
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
  const tools = document.getElementsByClassName("tool");
  const statusElement = document.getElementById('status');
  switch(condition){
    case End.P1:
      statusElement.innerHTML = `${state} summons the 🐉!`;
      toBlack(statusElement);
      break;
    case End.P2:
      statusElement.innerHTML = `${state} summons the 🐉!`;
      toWhite(statusElement);
      break;
    case End.Tie:
      statusElement.innerHTML = `Tie!`;
      break;
    case -1:
      statusElement.innerHTML = `Space Occupied`;
      break;
    case -2:
      statusElement.innerHTML = `Can not Reset`;
      break;
    case -3:
      statusElement.innerHTML = `Can not Regret`;
      break;
    default:
      statusElement.innerHTML = `${state} is playing...`;
      if (state == State.P1) {
        toBlack(statusElement);
      } else {
        toWhite(statusElement);
      }
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
      const stone = board[i][j];
      const cellElement = document.createElement('div');
      cellElement.className = 'cell';
      cellElement.id = `${i} ${j}`;
      cellRowElement.appendChild(cellElement);

      // if (board[i][j] === State.P1) {
      //   const stoneElement = document.createElement('div');
      //   stoneElement.className = 'stone black';
      //   cellElement.appendChild(stoneElement);
      // } else if (board[i][j] === State.P2) {
      //   const stoneElement = document.createElement('div');
      //   stoneElement.className = 'stone white';
      //   cellElement.appendChild(stoneElement);
      // }
      
      if(stone != null) {
        const stoneElement = document.createElement('img');
        const max = maxSumDirections(board, stone, i, j);
        const prefix = (stone == State.P1) ? "B" : "W";
        if(inRange(max, 1, 7)) {
          stoneElement.src = `images/${prefix}${max}.webp`;
        } else {
          stoneElement.src = `images/${prefix}7.webp`;
        }
        cellElement.appendChild(stoneElement);
      }
    }

    boardElement.appendChild(cellRowElement);
  }
}

function switchPlayer() {
  if (state == State.P1) {
    state = State.P2;
  } else {
    state = State.P1;
  }
}

function cellEventListener(event){
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
  if (goBoard[row][col] == null) {
    goBoard[row][col] = state;
  } else {
    renderStatus(state, -1);
    setTimeout(()=>{renderStatus(state, end)}, 1000)
    row = null;
    col = null;
    return;
  }

  // Check if this move ends the game
  end = finalState(goBoard, row, col, numWin);
  if (end != End.Not) {
    render(state, end);
    removeCellEventListener();
    return;
  }

  // If game continues, switch the player
  switchPlayer();
  render(state, 0);
  return;
}

function removeCellEventListener() {
  document.removeEventListener("click", cellEventListener);
}

function returnTitle(){
  toggleScreen("start-screen", true);
  toggleScreen("game-interface", false);
}

function reset(){
  if (goBoard != null) {
    buildGame();
  } else {
    renderStatus(state, -2);
    setTimeout(()=>{renderStatus(state, End.Not)}, 1000);
    console.error("reset failed: goBoard uninitialized.");
  }
}

function regret(){
  if (goBoard != null && row != null && col != null && end == End.Not) {
    goBoard[row][col] = null;
    row = null;
    col = null;
    switchPlayer();
    render(state, end);
  } else {
    renderStatus(state, -3);
    setTimeout(()=>{renderStatus(state, end)}, 1000);
  }
}

function toBlack(element) {
  element.className = element.className.replace("white-black", "black-white");
}

function toWhite(element) {
  element.className = element.className.replace("black-white", "white-black");
}

function toggleColor(element){
  if (element.className.includes("white-black")) {
    toBlack(element);
  } else if (element.className.includes("black-white")) {
    toWhite(element);
  }
}
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

  // Initial render
  renderGoBoard();
  
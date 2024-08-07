//Create a player object with a name and an 'icon' (a single character, such as 'X' or 'O')
function createPlayer (name, icon) {
  return { name, icon };
}

//Initialize the game object, of which there will only ever be one
const game = (function () {
  let players = [];
  let board = [[null, null, null],[null, null, null], [null, null, null]];
  let firstPlayerTurn = true;

  const addPlayer = (name, icon) => {
    players.push( createPlayer(name, icon) );
  }

  const makePlay = (col, row) => {
    if ( board[col][row] != null ) {
      console.log('Error: Space already taken');
      return false;
    }
    else if ( col >= board.length || row >= board[0].length ) {
      console.log('Error: Row or col outside of board');
      return false;
    }
    else {
      let playerTurnNum = firstPlayerTurn ? 0 : 1;
      board[col][row] = players[playerTurnNum].icon;
      firstPlayerTurn = !firstPlayerTurn;
      return true;
    }
  }

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0]; // Return the winner (X or O)
      }
    }
  
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i]; // Return the winner (X or O)
      }
    }
  
    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0]; // Return the winner (X or O)
    }
  
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2]; // Return the winner (X or O)
    }
  
    // Check for a tie
    if (board.flat().every(cell => cell !== null)) {
      return 'Tie';
    }
  
    // No winner yet
    return null;
  }

  const resetGame = (includingPlayers) => {
    firstPlayerTurn = true;
    board = [[null, null, null],[null, null, null], [null, null, null]];
    if (includingPlayers) {
      players = [];
    }
  }

  const updateDisplay = (consoleOnly) => {
    if (consoleOnly) {
      console.log("Current game board:");
      for (let i = 0; i < 3; i++) {
        console.log(board[i].map(cell => cell === null ? ' ' : cell).join(' | '));
        if (i < 2) console.log('---------');
      }
    }
  }

  return { players, board, addPlayer, makePlay, checkWinner, resetGame, updateDisplay }
})();


//Create a player object with a name and an 'icon' (a single character, such as 'X' or 'O')
function createPlayer (name, icon) {
  return { name, icon };
}

//Initialize the game object, of which there will only ever be one
const game = (function () {
  //Setup 'private' variables
  let board = [[null, null, null],[null, null, null], [null, null, null]];
  let firstPlayerTurn = true;
  let gameWinner = null;
  let players = [];
  players.push(createPlayer('Player One', 'X'));
  players.push(createPlayer('Player Two', 'O'));

  //Connect to DOM
  const playerDivs = document.querySelectorAll('.player');
  const announcements = document.querySelector('#announcements');
  const squares = document.querySelectorAll('.square');

  //'Private' function returns 'X', 'O', 'Tie', or null, depending on win status
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

  //'private' function updates the #announcements div
  const updateAnnouncements = () => {
    if (gameWinner == 'X'){
      announcements.innerHTML = `${players[0].name} has won!`
    }
    else if (gameWinner == 'O') {
      announcements.innerHTML = `${players[1].name} has won!`
    }
    else if (gameWinner == 'Tie') {
      announcements.innerHTML = "Game is a tie!"
    }
    else {
      let playerTurnNum = firstPlayerTurn ? 0 : 1; 
      announcements.innerHTML = `${players[playerTurnNum].name}'s turn`
    }
  }

  const changePlayerName = (num) => {
    let name = '';
    while (name == '' || name.length > 10 ) {
      name = prompt("Enter your name (1-10 characters):");
    }

    // This error should never get triggered but hey, let's check anyway!
    if (num < 0 || num > 1){
      console.log("Error: Player does not exist");
      return false;
    }
    else {
      playerDivs[num].querySelector('.name').innerHTML = name;
      players[num].name = name;
      updateAnnouncements();

      return true;
    }
  }

  const makePlay = (col, row) => {

    //Prevent makePlay if the game is currently 'over'
    if (gameWinner != null){
      console.log('Error: Game is already over');
      return false;
    }

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

      //Adjust display / DOM
      squares[col*3 + row].innerHTML = players[playerTurnNum].icon;
      squares[col*3 + row].classList.add(players[playerTurnNum].icon)

      //Check for win
      gameWinner = checkWinner();
      updateAnnouncements();
      return true;
    }
  }

  const resetGame = (includingPlayers) => {
    gameWinner = null;
    firstPlayerTurn = true;
    board = [[null, null, null],[null, null, null], [null, null, null]];
    if (includingPlayers) {
      players = [];
    }
    squares.forEach((square) => {
      square.classList.remove('X');
      square.classList.remove('O');
      square.innerHTML = '';
    });
  }

  const updateDisplay = (consoleOnly) => {
    if (consoleOnly) {
      console.log("Current game board:");
      for (let i = 0; i < 3; i++) {
        console.log(board[i].map(cell => cell === null ? ' ' : cell).join(' | '));
        if (i < 2) console.log('---------');
      }
    }
    else {

    }
  }

  return { changePlayerName, makePlay, resetGame, updateDisplay }
})();


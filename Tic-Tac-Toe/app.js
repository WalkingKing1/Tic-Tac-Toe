window.addEventListener("DOMContentLoaded", () => {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  const playerDisplay = document.querySelector(".display-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");

  //   creating a board with empty text.
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const playerX_Won = "PlAYERX_WON";
  const playerO_Won = "PLAYERO_WON";
  const TIE = "TIE";

  //   patterns that can determine if a player has won or Not.
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //   using the above pattern to validate it.
  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? playerX_Won : playerO_Won);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) announce(TIE);
  }

  //   updating the UI as per results.
  const announce = (type) => {
    switch (type) {
      case playerO_Won:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case playerX_Won:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case TIE:
        announcer.innerText = "Try again 😑.";
    }
    announcer.classList.remove("hide");
  };

  const isValidAction = (tile) => {
    if (tile.innerText === "X" || tile.innerText === "O") {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  //   changing players turns.
  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  //   reseting everything to start point after a match has ended.
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === "O") {
      changePlayer();
    }

    tiles.forEach((tile) => {
      tile.innerText = "";
      tile.classList.remove("playerX");
      tile.classList.remove("playerO");
    });
  };

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
  });

  resetButton.addEventListener("click", resetBoard);
});

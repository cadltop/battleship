export function renderBoard(player) {
  const boardsDiv = document.querySelector("div.boards");
  const playerBoardDiv = document.createElement("div");
  playerBoardDiv.classList.add("board", player.name);

  for (let r = 0; r < 10; r++) {
    for (let c = 9; c >= 0; c--) {
      const positionDiv = document.createElement("div");

      positionDiv.classList.add(`position-${r}${c}`);
      positionDiv.addEventListener("click", () => {
        const position = player.gameboard.board[r][c];
        position.shot = true;
        positionDiv.style.backgroundColor = !position.ship ? "grey" : "red";
      });

      playerBoardDiv.append(positionDiv);
    }
  }

  boardsDiv.append(playerBoardDiv);
}
export function showFleet(player) {
  for (const ship in player.gameboard.fleet) {
    for (const p of player.gameboard.fleet[ship].positions) {
      const positionDiv = document.querySelector(
        `div.board.${player.name} > div.position-${p[0]}${p[1]}`,
      );
      positionDiv.style.backgroundColor = "green";
    }
  }
}

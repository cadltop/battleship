export function renderBoard(player) {
  const boardsDiv = document.querySelector("div.boards");

  const playerBoardDiv = document.createElement("div");
  playerBoardDiv.classList.add("board", player.name);

  for (let r = 0; r < player.gameboard.board.length; r++) {
    for (let c = 0; c < player.gameboard.board[r].length; c++) {
      const positionDiv = document.createElement("div");
      positionDiv.classList.add("position", `${r}-${c}`);
      playerBoardDiv.append(positionDiv);
    }
  }

  boardsDiv.append(playerBoardDiv);
}

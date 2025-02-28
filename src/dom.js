export default function (users) {
  const players = users || [];
  const playersBoardsDOM = [];
  function renderBoards() {
    const boardsDiv = document.querySelector("div.boards");

    for (const player of players) {
      const playerBoardDiv = document.createElement("div");
      playerBoardDiv.classList.add("board", player.name);

      for (let r = 0; r < 10; r++) {
        for (let c = 9; c >= 0; c--) {
          const positionDiv = document.createElement("div");
          positionDiv.classList.add(`position-${r}${c}`);
          positionDiv.addEventListener("click", () => {
            for (const DOMBoard of playersBoardsDOM) {
              if (DOMBoard.classList[1] !== player.name) {
                for (const position of DOMBoard.children) {
                  const bgColor = position.style.backgroundColor;
                  if (bgColor !== "red" && bgColor !== "grey") {
                    position.style.backgroundColor = "white";
                  }
                }
              } else {
                showFleet(player);
              }
            }
          
            const ship = player.gameboard.receiveAttack(r, c);
            positionDiv.style.backgroundColor = !ship ? "grey" : "red";
          });
          playerBoardDiv.append(positionDiv);
        }
      }

      playersBoardsDOM.push(playerBoardDiv);
      boardsDiv.append(playerBoardDiv);
    }
  }
  function showFleet(player) {
    for (const ship in player.gameboard.fleet) {
      for (const p of player.gameboard.fleet[ship].positions) {
        const positionDiv = document.querySelector(
          `div.board.${player.name} > div.position-${p[0]}${p[1]}`,
        );

        positionDiv.style.backgroundColor = !player.gameboard.board[p[0]][p[1]]
          .shot
          ? "green"
          : "red";
      }
    }
  }
  return { renderBoards, showFleet };
}

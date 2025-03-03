export default function (users) {
  const players = users || [];
  const boards = [];
  
  (function renderBoards() {
    const boardsDiv = document.querySelector("div.boards");

    for (const player of players) {
      const boardDiv = document.createElement("div");
      boardDiv.classList.add("board", player.name);
      boardDiv.dataset.clickable = null;
      
      for (let r = 0; r < 10; r++) {
        for (let c = 9; c >= 0; c--) {
          const positionDiv = document.createElement("div");
          
          positionDiv.classList.add("position");
          positionDiv.dataset.row = r;
          positionDiv.dataset.column = c;
          positionDiv.addEventListener("click", () => {
            if (boardDiv.dataset.clickable === "false") return;
            
            const ship = player.gameboard.receiveAttack(r, c);
            if (!ship) {
              positionDiv.style.backgroundColor = "grey";
              setTurn(player);
            } else {
              positionDiv.style.backgroundColor = "red";
            }
          });
          
          boardDiv.append(positionDiv);
        }
      }

      boards.push(boardDiv);
      boardsDiv.append(boardDiv);
    }
    setTurn(players[0]);
  })();
  
  function setTurn(player) {
    for (const board of boards) {
      const boardName = board.classList[1];
      
      if (boardName !== player.name) {
        board.dataset.clickable = true;
        
        for (const position of board.children) {
          const color = position.style.backgroundColor;
          if (color !== "red" && color !== "grey") {
            position.style.backgroundColor = "white";
          }
        }
      } else {
        board.dataset.clickable = false;
        
        for (const ship in player.gameboard.fleet) {
          for (const p of player.gameboard.fleet[ship].positions) {
            const positionDiv = document.querySelector(
              `div.board.${player.name} > ` +
              `div.position[data-row="${p[0]}"][data-column="${p[1]}"]`,
            );

            positionDiv.style.backgroundColor = !player.gameboard.board[p[0]][p[1]]
              .shot
              ? "green"
              : "red";
          }
        }
      }
    }
  }
}

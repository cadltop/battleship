import "normalize.css";
import "./index.css";
import Player from "./classes/Player";

const players = [new Player("real"), new Player("computer")];
const boards = [createBoard(players[0]), createBoard(players[1])];

for (const player of players) {
  player.gameboard.placeShip("carrier", [0, 0], false);
  player.gameboard.placeShip("battleship", [0, 2], false);
  player.gameboard.placeShip("destroyer", [0, 4], false);
  player.gameboard.placeShip("submarine", [0, 6], false);
  player.gameboard.placeShip("patrolBoat", [0, 8], false);
}

setTurn(players[0]);


function createBoard(player) {
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
        if (
          boardDiv.dataset.clickable === "false" ||
          player.gameboard.board[r][c].shot
        ) return;
        
        if (!player.gameboard.receiveAttack(r, c)) {
          positionDiv.style.backgroundColor = "grey";
          setTurn(player);
        } else {
          positionDiv.style.backgroundColor = "red";
        }
      });
      
      boardDiv.append(positionDiv);
    }
  }
  
  const boardsDiv = document.querySelector("div.boards");
  boardsDiv.append(boardDiv);

  return boardDiv;
}
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

(function computerListeners() {
  const computerPositions = boards[1].children;
  for (const positionDiv of computerPositions) {
    positionDiv.addEventListener("click", () => {
      attackEnemy(players[0]);
    });
    
    function attackEnemy(enemy) {
      const positions = boards[0].children;
      const index = Math.round(Math.random() * 99);
      const position = positions[index];
      const row = parseInt(position.dataset.row);
      const column = parseInt(position.dataset.column);
      
      if (!enemy.gameboard.board[row][column].shot) {
        position.click()
        if (enemy.gameboard.board[row][column].ship) {
          attackEnemy(enemy);
        }
      } else {
        attackEnemy(enemy);
      }
    }
  }
})();

import "normalize.css";
import "./index.css";
import Player from "./classes/Player";

const players = [new Player("real"), new Player("computer")];
const boards = [createBoard(players[0]), createBoard(players[1])];

for (const ship in players[0].gameboard.fleet) {
  const shipDiv = document.createElement("div");
  shipDiv.classList.add("ship", ship.toLowerCase());

  for (let i = 0; i < players[0].gameboard.fleet[ship].length; i++) {
    const shipBlockDiv = document.createElement("div");
    shipBlockDiv.className = "block";
    shipDiv.append(shipBlockDiv);
  }

  const shipsDiv = document.querySelector("div.ships > div.containers");
  shipsDiv.append(shipDiv);
}

setTimeout(
  () =>
    alert(
      "Select a ship by clicking it. Choose it's orientation and place " +
        "the ship by clicking a position in your board.",
    ),
  5,
);
// for (const player of players) {
//   player.gameboard.placeShip("carrier", [0, 0], false);
//   player.gameboard.placeShip("battleship", [0, 2], false);
//   player.gameboard.placeShip("destroyer", [0, 4], false);
//   player.gameboard.placeShip("submarine", [0, 6], false);
//   player.gameboard.placeShip("patrolBoat", [0, 8], false);
// }

setTurn(players[0]);

function createBoard(player) {
  const playerDiv = document.createElement("div");
  playerDiv.classList.add("player", player.name);
  const h2 = document.createElement("h2");
  h2.innerHTML = player.name;
  const boardDiv = document.createElement("div");
  boardDiv.className = "board";
  boardDiv.dataset.clickable = null;
  const boardsDiv = document.querySelector("div.boards");
  boardsDiv.dataset.end = false;

  for (let r = 0; r < 10; r++) {
    for (let c = 9; c >= 0; c--) {
      const positionDiv = document.createElement("div");
      positionDiv.classList.add("position");
      positionDiv.dataset.row = r;
      positionDiv.dataset.column = c;
      positionDiv.addEventListener("click", () => {
        if (
          boardDiv.dataset.clickable === "false" ||
          player.gameboard.board[r][c].shot ||
          boardsDiv.dataset.end === "true"
        )
          return;

        if (!player.gameboard.receiveAttack(r, c)) {
          positionDiv.style.backgroundColor = "grey";
          setTurn(player);
        } else {
          positionDiv.style.backgroundColor = "red";
        }

        if (player.isFleetSunk()) {
          findWinner(player.name);
          boardsDiv.dataset.end = true;
        }
      });

      boardDiv.append(positionDiv);
    }
  }
  playerDiv.append(h2, boardDiv);
  boardsDiv.append(playerDiv);

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

          positionDiv.style.backgroundColor = !player.gameboard.board[p[0]][
            p[1]
          ].shot
            ? "green"
            : "red";
        }
      }
    }
  }
}
function findWinner(loser) {
  for (const player of players) {
    if (player.name !== loser) {
      alert(player.name + " won!!");
      return true;
    }
  }

  return false;
}

(function computerListeners() {
  const computerPositions = boards[1].children;
  for (const positionDiv of computerPositions) {
    positionDiv.addEventListener("c`lick", () => {
      attackEnemy(players[0]);
    });

    function attackEnemy(enemy) {
      const positions = boards[0].children;
      const index = Math.round(Math.random() * 99);
      const position = positions[index];
      const row = parseInt(position.dataset.row);
      const column = parseInt(position.dataset.column);

      if (!enemy.gameboard.board[row][column].shot) {
        position.click();
        if (enemy.gameboard.board[row][column].ship) {
          attackEnemy(enemy);
        }
      } else {
        attackEnemy(enemy);
      }
    }
  }
})();

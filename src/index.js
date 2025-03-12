import "normalize.css";
import "./index.css";
import Player from "./classes/Player";
import dom from "./dom";

const players = [new Player("real"), new Player("computer")];
const boards = [
  dom.createBoard(players[0].name),
  dom.createBoard(players[1].name),
];

for (const ship in players[0].gameboard.fleet) {
  dom.showShip(ship, players[0].gameboard.fleet[ship].length);
}

let selectedShip = "";

(function setListeners() {
  (function shipSelection() {
    for (const shipDiv of dom.containerDiv.children) {
      shipDiv.addEventListener("click", () => {
        for (const sd of dom.containerDiv.children) {
          if (sd.dataset.placed === "true")
            dom.colorShip(sd.classList[1], "green");
          else dom.colorShip(sd.classList[1], "blue");
        }

        if (players[0].gameboard.fleet[shipDiv.classList[1]].placed) {
          selectedShip = "";
          dom.disableOrientation();
          alert("This ship has been placed already.");
          return;
        }

        selectedShip = shipDiv.classList[1];
        dom.colorShip(selectedShip, "yellow");
        dom.disableOrientation(false);
        dom.disableRandomPositioning(false);
      });
    }
    dom.RandomPosButton.addEventListener("click", () => {
      const positions = boards[0].children;
      (function put() {
        dom.orientationRadios[Math.round(Math.random())].click();
        positions[Math.round(Math.random() * 99)].click();
        if (!players[0].gameboard.fleet[selectedShip].placed) put();
      })();
    });
  })();
  (function placingShips() {
    for (const position of boards[0].children) {
      position.addEventListener("click", () => {
        if (players[0].isFleetPlaced() || selectedShip === "") return;

        players[0].gameboard.placeShip(
          selectedShip,
          [parseInt(position.dataset.row), parseInt(position.dataset.column)],
          dom.getOrientation(),
        );

        if (!players[0].gameboard.fleet[selectedShip].placed) {
          dom.colorShip(selectedShip, "red");
          setTimeout(() => dom.colorShip(selectedShip, "blue"), 750);
          return;
        }

        for (const p of players[0].gameboard.fleet[selectedShip].positions) {
          dom.colorPosition(players[0].name, p, "green");
        }

        dom.colorShip(selectedShip, "green");
        dom.disableOrientation();
        dom.disableRandomPositioning();

        for (const ship of dom.containerDiv.children) {
          if (ship.classList[1] === selectedShip) ship.dataset.placed = true;
        }

        placingShipsComp();
        if (players[1].isFleetPlaced()) attackingBoards();
      });
    }
    function placingShipsComp() {
      players[1].gameboard.placeShip(
        selectedShip,
        [Math.round(Math.random() * 9), Math.round(Math.random() * 9)],
        Math.round(Math.random()) === 1 ? true : false,
      );

      if (!players[1].gameboard.fleet[selectedShip].placed) placingShipsComp();
    }
  })();
  function attackingBoards() {
    setTurn(players[0]);

    for (let i = 0; i < 2; i++) {
      for (const position of boards[i].children) {
        position.addEventListener("click", () => {
          const pos = dom.getPositionCoordinates(position);

          if (
            boards[i].dataset.clickable === "false" ||
            players[i].gameboard.board[pos.row][pos.column].shot ||
            dom.boardsDiv.dataset.end === "true"
          )
            return;

          if (!players[i].gameboard.receiveAttack(pos.row, pos.column)) {
            dom.colorPosition(players[i].name, [pos.row, pos.column], "grey");
            setTurn(players[i]);
          } else
            dom.colorPosition(players[i].name, [pos.row, pos.column], "red");

          if (players[i].isFleetSunk()) findWinner(players[i].name);
        });
      }
    }

    (function attackingBoardsComp() {
      const computerPositions = boards[1].children;
      for (const positionDiv of computerPositions) {
        positionDiv.addEventListener("click", function attack() {
          const positions = boards[0].children;
          const index = Math.round(Math.random() * 99);
          const position = positions[index];
          const pos = dom.getPositionCoordinates(position);

          if (!players[0].gameboard.board[pos.row][pos.column].shot) {
            setTimeout(() => position.click(), 500);
            if (players[0].gameboard.board[pos.row][pos.column].ship) attack();
          } else attack();
        });
      }
    })();
  }
})();

function setTurn(player) {
  for (let i = 0; i < 2; i++) {
    boards[i].dataset.clickable =
      dom.boardsDiv.children[i].classList[1] !== player.name ? true : false;
  }
}

function findWinner(loser) {
  for (const player of players) {
    if (player.name !== loser)
      setTimeout(() => alert(player.name + " won!!"), 125);
  }

  dom.boardsDiv.dataset.end = true;
}

setTimeout(
  () =>
    alert(
      "Select a ship by clicking it. Choose it's orientation and place " +
        "the ship by clicking a position in your board.",
    ),
  62,
);

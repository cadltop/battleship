import "normalize.css";
import "./index.css";
import Player from "./classes/Player";
import dom from "./dom";

const players = [new Player("real"), new Player("computer")];

for (const player of players) {
  player.gameboard.placeShip("carrier", [0, 0], false);
  player.gameboard.placeShip("battleship", [0, 2], false);
  player.gameboard.placeShip("destroyer", [0, 4], false);
  player.gameboard.placeShip("submarine", [0, 6], false);
  player.gameboard.placeShip("patrolBoat", [0, 8], false);
}

const controller = dom(players);
controller.renderBoards();
controller.showFleet(players[0]);

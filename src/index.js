import "normalize.css";
import "./index.css";
import Player from "./classes/Player";
import * as dom from "./dom";

const players = [new Player("real"), new Player("computer")];

for (const player of players) {
  dom.renderBoard(player);

  player.gameboard.placeShip("carrier", [0, 0], false);
  player.gameboard.placeShip("battleship", [0, 2], false);
  player.gameboard.placeShip("destroyer", [0, 4], false);
  player.gameboard.placeShip("submarine", [0, 6], false);
  player.gameboard.placeShip("patrolBoat", [0, 8], false);

  dom.showFleet(player);
}

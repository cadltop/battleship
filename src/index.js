import "normalize.css";
import "./index.css";
import Player from "./classes/Player";
import * as dom from "./dom";

const players = [new Player("real"), new Player("computer")];

for (const player of players) {
  dom.renderBoard(player);
}

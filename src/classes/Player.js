import Gameboard from "./Gameboard";
export default class {
  #gameboard = new Gameboard();
  #name = "";
  constructor(name) {
    this.#name = name;
  }

  get gameboard() {
    return this.#gameboard;
  }
  get name() {
    return this.#name;
  }

  isFleetPlaced() {
    return this.#checkFleet().placed;
  }
  isFleetSunk() {
    return this.#checkFleet().sunk;
  }

  #checkFleet() {
    const state = { placed: true, sunk: true };
    for (const ship in this.#gameboard.fleet) {
      if (!this.#gameboard.fleet[ship].placed) state.placed = false;
      if (!this.#gameboard.fleet[ship].isSunk()) state.sunk = false;
    }
    return state;
  }
}

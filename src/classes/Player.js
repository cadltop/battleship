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

  isFleetSunk() {
    const sunked = [];

    for (const ship in this.#gameboard.fleet) {
      if (this.#gameboard.fleet[ship].isSunk()) sunked.push(ship);
    }

    if (sunked.length === 5) return true;
    return false;
  }
}

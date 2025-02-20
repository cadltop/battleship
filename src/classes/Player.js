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
}

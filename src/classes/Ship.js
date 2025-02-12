export default class {
  hits = 0;
  #sunk = false;
  #length = null;
  constructor(length) {
    this.#length = length;
  }
  hit() {
    this.hits++;
    if (this.hits === this.#length) this.#sunk = true;
  }
  isSunk() {
    return this.#sunk;
  }
}

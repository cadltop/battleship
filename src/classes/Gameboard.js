import Ship from "./Ship";
export default class {
  #board = (() => {
    const b = [];
    for (let x = 0; x < 10; x++) {
      b[x] = [];
      for (let y = 0; y < 10; y++) {
        b[x][y] = { ship: null, shot: false };
      }
    }
    return b;
  })();
  #fleet = {
    carrier: new Ship(5),
    battleship: new Ship(4),
    destroyer: new Ship(3),
    submarine: new Ship(3),
    patrolBoat: new Ship(2),
  };

  get board() {
    return this.#board;
  }
  get fleet() {
    return this.#fleet;
  }

  placeShip(ship, start, vertical) {
    const coordinates = [];
    const shipSize = this.#fleet[ship].length;
    const end = vertical
      ? [start[0], start[1] - (shipSize - 1)]
      : [start[0] + (shipSize - 1), start[1]];

    if (this.#board[end[0]] && this.#board[end[0]][end[1]]) {
      (function getCoordinates(position) {
        coordinates.push(position);

        if (position[0] === end[0] && position[1] === end[1]) {
          return position;
        }

        const xy = vertical
          ? [position[0], position[1] - 1]
          : [position[0] + 1, position[1]];

        if (getCoordinates(xy)) {
          return xy;
        }
      })(start);

      for (const c of coordinates) {
        if (
          (this.#board[c[0] + 1] && this.#board[c[0] + 1][c[1]].ship) ||
          (this.#board[c[0] - 1] && this.#board[c[0] - 1][c[1]].ship) ||
          (this.#board[c[0]][c[1] + 1] && this.#board[c[0]][c[1] + 1].ship) ||
          (this.#board[c[0]][c[1] - 1] && this.#board[c[0]][c[1] - 1].ship)
        ) {
          return;
        }
      }
      for (const c of coordinates) {
        this.#board[c[0]][c[1]].ship = ship;
      }
    }

    this.#fleet[ship].positions = coordinates;
  }
  receiveAttack(x, y) {
    const position = this.#board[x][y];

    if (position.ship !== null) {
      this.#fleet[position.ship].hit();
    }

    position.shot = true;
    return position.ship;
  }
}

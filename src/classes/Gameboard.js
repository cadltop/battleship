import Ship from "./Ship";
export default class {
  constructor() {
    // this.board = new Array(10).fill(
    //   new Array(10).fill({ ship: null, shot: false }),
    // );
    this.board = (() => {
      const b = [];
      for (let x = 0; x < 10; x++) {
        b[x] = [];
        for (let y = 0; y < 10; y++) {
          b[x][y] = { ship: null, shot: false };
        }
      }
      return b;
    })();
    this.fleet = {
      carrier: new Ship(5),
      battleship: new Ship(4),
      destroyer: new Ship(3),
      submarine: new Ship(3),
      patrolBoat: new Ship(2),
    };
  }
  placeShip(ship, xy, vertical) {
    const coordinates = [];
    const shipSize = this.fleet[ship].length;
    const shipEnd = vertical
      ? [xy[0], xy[1] - (shipSize - 1)]
      : [xy[0] + (shipSize - 1), xy[1]];

    if (this.board[shipEnd[0]] && this.board[shipEnd[0]][shipEnd[1]]) {
      (function getCoordinates(position) {
        for (const p of position) {
          if (p < 0 || p > 9) {
            return;
          }
        }
        coordinates.push(position);
        if (position[0] === shipEnd[0] && position[1] === shipEnd[1]) {
          return position;
        }

        const coor = vertical
          ? [position[0], position[1] - 1]
          : [position[0] + 1, position[1]];

        if (getCoordinates(coor)) {
          return coor;
        }
      })(xy);

      for (const c of coordinates) {
        if (
          (this.board[c[0] + 1] && this.board[c[0] + 1][c[1]].ship !== null) ||
          (this.board[c[0] - 1] && this.board[c[0] - 1][c[1]].ship !== null) ||
          (this.board[c[0]][c[1] + 1] &&
            this.board[c[0]][c[1] + 1].ship !== null) ||
          (this.board[c[0]][c[1] - 1] &&
            this.board[c[0]][c[1] - 1].ship !== null)
        ) {
          return [];
        }
      }
      for (const c of coordinates) {
        this.board[c[0]][c[1]].ship = ship;
      }
    }
    return coordinates;
  }
  receiveAttack(x, y) {
    const position = this.board[x][y];
    if (position.ship !== null) {
      this.fleet[position.ship].hit();
    }
    position.shot = true;
  }
}

import Ship from "./Ship";
export default class {
  constructor() {
    this.board = new Array(10).fill(
      new Array(10).fill({ filled: false, ship: null }),
    );
    this.ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
  }
  placeShip(ship, xy, vertical) {
    switch (vertical) {
      case true:
        if (!this.board[xy[0]][xy[1] - ship.length]) {
          return false;
        }
        for (let i = xy[1]; i > xy[1] - ship.length; i--) {
          this.board[xy[0]][i].filled = true;
          this.board[xy[0]][i].ship = ship;
        }
        return true;
      case false:
        if (!this.board[xy[0] + ship.length]) {
          return false;
        }
        for (let i = xy[0]; i < xy[0] + ship.length; i++) {
          this.board[i][xy[1]].filled = true;
          this.board[i][xy[1]].ship = ship;
        }
        return true;
    }
  }
}

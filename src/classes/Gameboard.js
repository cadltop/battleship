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
  receiveAttack(x, y) {}
  placeShip(ship, xy, vertical) {
    const coordinates = [];
    switch (vertical) {
      case true:
        if (!this.board[xy[0]][xy[1] - ship.length]) {
          return false;
        }
        for (let i = xy[1]; i > xy[1] - ship.length; i--) {
          if (
            (this.board[xy[0] + 1] &&
              this.board[xy[0] + 1][i].filled === true) ||
            (this.board[xy[0] - 1] &&
              this.board[xy[0] - 1][i].filled === true) ||
            (this.board[xy[0]][i + 1] &&
              this.board[xy[0]][i + 1].filled === true) ||
            (this.board[xy[0]][i - 1] &&
              this.board[xy[0]][i - 1].filled === true)
          ) {
            return false;
          }
          coordinates.push([xy[0], i]);
        }
        break;
      case false:
        if (!this.board[xy[0] + ship.length]) {
          return false;
        }
        for (let i = xy[0]; i < xy[0] + ship.length; i++) {
          if (
            (this.board[i + 1] && this.board[i + 1][xy[1]].filled === true) ||
            (this.board[i - 1] && this.board[i - 1][xy[1]].filled === true) ||
            (this.board[i][xy[1] + 1] &&
              this.board[i][xy[1] + 1].filled === true) ||
            (this.board[i][xy[1] - 1] &&
              this.board[i][xy[1] - 1].filled === true)
          ) {
            return false;
          }
          coordinates.push([i, xy[1]]);
        }
        break;
    }
    for (const c of coordinates) {
      this.board[c[0]][c[1]].filled = true;
      this.board[c[0]][c[1]].ship = ship;
    }
    return true;
  }
}

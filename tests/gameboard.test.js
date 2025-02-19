import Gameboard from "../src/classes/Gameboard";

let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});
test("creation", () => {
  expect(gameboard.board[9].length).toBe(10);
});

describe("placing ships", () => {
  describe("positions", () => {
    let coor;
    beforeEach(() => {
      coor = gameboard.placeShip("carrier", [0, 0], false);
    });
    test("coordinates", () => {
      expect(coor).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
      ]);
    });
    test("ship", () => {
      expect(gameboard.board[0][0]).toEqual({
        ship: "carrier",
        shot: false,
      });
    });
    test("others", () => {
      expect(gameboard.board[0][9]).toEqual({ ship: null, shot: false });
    });
  });
  describe("orientation", () => {
    test("vertical right", () => {
      expect(gameboard.placeShip("carrier", [0, 9], true).length).toBe(5);
    });
    test("vertical wrong", () => {
      expect(gameboard.placeShip("carrier", [0, 3], true).length).toBe(0);
    });
    test("horizontal right", () => {
      expect(gameboard.placeShip("carrier", [0, 0], false).length).toBe(5);
    });
    test("horizontal wrong", () => {
      expect(gameboard.placeShip("carrier", [6, 0], false).length).toBe(0);
    });
  });
  describe("ships minimum distance", () => {
    test("vertical near", () => {
      gameboard.placeShip("carrier", [0, 9], true);
      expect(gameboard.placeShip("battleship", [1, 9], true).length).toBe(0);
    });
    test("horizontal near", () => {
      gameboard.placeShip("carrier", [0, 0], false);
      expect(gameboard.placeShip("battleship", [0, 1], false).length).toBe(0);
    });
    test("vertical far", () => {
      gameboard.placeShip("carrier", [0, 9], true);
      expect(gameboard.placeShip("battleship", [2, 9], true).length).toBe(4);
    });
    test("horizontal far", () => {
      gameboard.placeShip("carrier", [0, 0], false);
      expect(gameboard.placeShip("battleship", [0, 2], false).length).toBe(4);
    });
  });
});
describe("receiving attacks", () => {
  test("hiting ship", () => {
    gameboard.placeShip("carrier", [0, 0], false);
    gameboard.receiveAttack(4, 0);
    expect(gameboard.fleet.carrier.hits).toBe(1);
  });
  test("missing shot", () => {
    gameboard.placeShip("carrier", [0, 0], false);
    gameboard.receiveAttack(5, 0);
    expect(gameboard.fleet.carrier.hits).toBe(0);
  });
});

import Gameboard from "../src/classes/Gameboard";

test("creation", () => {
  expect(new Gameboard().board[9]).toEqual(
    new Array(10).fill({ filled: false, ship: null }),
  );
});
describe("placing ships", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });
  describe("orientation", () => {
    test("vertical right", () => {
      expect(gameboard.placeShip(gameboard.ships[0], [0, 9], true)).toBe(true);
    });
    test("vertical wrong", () => {
      expect(gameboard.placeShip(gameboard.ships[0], [0, 3], true)).toBe(false);
    });
    test("horizontal right", () => {
      expect(gameboard.placeShip(gameboard.ships[0], [0, 0], false)).toBe(true);
    });
    test("horizontal wrong", () => {
      expect(gameboard.placeShip(gameboard.ships[0], [6, 0], false)).toBe(
        false,
      );
    });
  });
  describe("ships minimum distance", () => {
    test("vertical", () => {
      gameboard.placeShip(gameboard.ships[0], [0, 9], true);
      expect(gameboard.placeShip(gameboard.ships[0], [1, 9], true)).toBe(false);
    });
    test("horizontal", () => {
      gameboard.placeShip(gameboard.ships[0], [0, 0], false);
      expect(gameboard.placeShip(gameboard.ships[0], [0, 1], false)).toBe(
        false,
      );
    });
  });
});

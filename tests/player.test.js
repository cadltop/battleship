import Player from "../src/classes/Player";

let player;
beforeEach(() => {  
  player = new Player("player 1");
});

test("name", () => {
  expect(player.name).toBe("player 1");
});
test("gameboard", () => {
  expect(player.gameboard.board.length).toBe(10);
});

describe("verify fleet status", () => {
  beforeEach(() => {
    player.gameboard.placeShip("carrier", [0, 0], false);
    player.gameboard.placeShip("battleship", [0, 2], false);
    player.gameboard.placeShip("destroyer", [0, 4], false);
    player.gameboard.placeShip("submarine", [0, 6], false);
    player.gameboard.placeShip("patrolBoat", [0, 8], false);
  });
  
  test("sunk fleet", () => {
    for (let i = 0; i < 5; i++) {
      player.gameboard.receiveAttack(i, 0);
    }
    for (let i = 0; i < 4; i++) {
      player.gameboard.receiveAttack(i, 2);
    }
    for (let i = 0; i < 3; i++) {
      player.gameboard.receiveAttack(i, 4);
    }
    for (let i = 0; i < 3; i++) {
      player.gameboard.receiveAttack(i, 6);
    }
    for (let i = 0; i < 2; i++) {
      player.gameboard.receiveAttack(i, 8);
    }
    
    expect(player.isFleetSunk()).toBe(true);
  });
  test("surviving fleet", () => {
    for (let i = 0; i < 4; i++) {
      player.gameboard.receiveAttack(i, 0);
    }
    for (let i = 0; i < 3; i++) {
      player.gameboard.receiveAttack(i, 2);
    }
    for (let i = 0; i < 2; i++) {
      player.gameboard.receiveAttack(i, 4);
    }
    for (let i = 0; i < 2; i++) {
      player.gameboard.receiveAttack(i, 6);
    }
    for (let i = 0; i < 1; i++) {
      player.gameboard.receiveAttack(i, 8);
    }
    
    expect(player.isFleetSunk()).toBe(false);
  });
});

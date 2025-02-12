import Ship from "../src/classes/Ship";

describe('Ship methods', () => {
    let ship;
    beforeEach(() => {
        ship = new Ship(4);
    })
    test('hit', () => {
        ship.hit() ;
        expect(ship.hits).toBe(1);
    });
    test('isSunk', () => {
        for (let i = 0; i < 4; i++) {
            ship.hit();
        }
        expect(ship.isSunk()).toBe(true);
    });
});
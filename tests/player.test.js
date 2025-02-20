import Player from "../src/classes/Player";

const player = new Player('player 1');
test('name', () => {
    expect(player.name).toBe('player 1');
});
test('gameboard', () => {
    expect(player.gameboard.board.length).toBe(10);
});

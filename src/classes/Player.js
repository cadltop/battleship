import Gameboard from './Gameboard';
export default class {
    #board = new Gameboard();
    get gameboard(){
        return this.#board;
    }
}

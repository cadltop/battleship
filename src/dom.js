export default {
  containerDiv: document.querySelector("div.ships > div.container"),
  boardsDiv: document.querySelector("div.boards"),
  orientationRadios: document.querySelectorAll('input[name="orientation"]'),
  RandomPosButton: document.querySelector("div.buttons > button"),

  createBoard(player) {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player", player);
    const h2 = document.createElement("h2");
    h2.innerHTML = player;
    const boardDiv = document.createElement("div");
    boardDiv.className = "board";
    boardDiv.dataset.clickable = false;
    this.boardsDiv.dataset.end = false;

    for (let r = 0; r < 10; r++) {
      for (let c = 9; c >= 0; c--) {
        const positionDiv = document.createElement("div");
        positionDiv.classList.add("position");
        positionDiv.dataset.row = r;
        positionDiv.dataset.column = c;

        boardDiv.append(positionDiv);
      }
    }
    playerDiv.append(h2, boardDiv);
    this.boardsDiv.append(playerDiv);

    return boardDiv;
  },
  colorPosition(player, position, color) {
    const positionDiv = document.querySelector(
      `div.player.${player} > div.board >` +
        `div.position[data-row="${position[0]}"][data-column="${position[1]}"]`,
    );
    positionDiv.style.backgroundColor = color;
  },
  getPositionCoordinates(position) {
    return {
      row: parseInt(position.dataset.row),
      column: parseInt(position.dataset.column),
    };
  },
  showShip(ship, length) {
    const shipDiv = document.createElement("div");
    shipDiv.classList.add("ship", ship);
    shipDiv.dataset.placed = false;

    for (let i = 0; i < length; i++) {
      const blockDiv = document.createElement("div");
      blockDiv.className = "block";
      shipDiv.append(blockDiv);
    }

    this.containerDiv.append(shipDiv);
  },
  colorShip(ship, color) {
    const shipDiv = document.querySelector(`div.ship.${ship}`);
    const blockDivs = shipDiv.children;
    for (const bd of blockDivs) {
      bd.style.backgroundColor = color;
    }
  },
  disableOrientation(state = true) {
    for (const or of this.orientationRadios) {
      or.disabled = state;
    }
  },
  getOrientation() {
    for (const radio of this.orientationRadios) {
      if (radio.checked) return !!radio.value;
    }
  },
  disableRandomPositioning(state = true) {
    this.RandomPosButton.disabled = state;
  },
};

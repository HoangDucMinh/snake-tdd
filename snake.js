const Cell = require("./cell");
const { GameOverError } = require("./errors");
const _find = require("lodash/find");
const _head = require("lodash/head");
const _tail = require("lodash/tail");

class Snake {
  constructor() {
    this.cells = [new Cell(9, 9)];
  }
  getHead() {
    return this.cells[this.cells.length - 1];
  }
  checkWall(head) {
    if (head.col < 0 || head.col > 19 || head.row < 0 || head.row > 19) {
      throw new GameOverError();
    }
  }
  makeHead(direct) {
    const curHead = this.getHead();
    if (direct == "east") {
      return new Cell(curHead.col + 1, curHead.row);
    } else if (direct == "west") {
      return new Cell(curHead.col - 1, curHead.row);
    } else if (direct == "north") {
      return new Cell(curHead.col, curHead.row - 1);
    } else if (direct == "south") {
      return new Cell(curHead.col, curHead.row + 1);
    }
  }
  move(direction) {
    const newHead = this.makeHead(direction);
    this.checkWall(newHead);
    this.cells = [...this.cells.slice(1), newHead];
  }
  goEast = () => {
    this.move("east");
  };
  goWest = () => {
    this.move("west");
  };
  goNorth = () => {
    this.move("north");
  };
  goSouth = () => {
    this.move("south");
  };
  addNode = (cell) => {
    this.cells.push(cell);
  };
  getLength = () => this.cells.length;

  checkCellIsSnake({ col, row }) {
    return Boolean(_find(this.cells, { col, row }));
  }

  addNodes(nodes) {
    this.cells = [...this.cells, ...nodes];
  }
}

module.exports = Snake;

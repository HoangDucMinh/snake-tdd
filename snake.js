const Cell = require("./cell");
const { GameOverError } = require("./errors");
const _find = require("lodash/find");
class Snake {
  constructor() {
    this.cells = [new Cell(9, 9)];
  }
  goEast = () => {
    if (this.cells.length == 1) {
      const curHead = this.cells[0];
      if (curHead.col == 19) {
        throw new GameOverError();
      }
      this.cells = [new Cell(++curHead.col, curHead.row)];
    } else {
      const curHead = this.cells[this.cells.length - 1];
      this.cells.push(new Cell(++curHead.col, curHead.row));
      this.cells.shift();
    }
  };
  goWest = () => {
    const head = this.cells[0];
    if (head.col == 0) {
      throw new GameOverError();
    }
    this.cells = [new Cell(--head.col, head.row)];
  };
  goNorth = () => {
    const head = this.cells[0];
    if (head.row == 0) {
      throw new GameOverError();
    }
    this.cells = [new Cell(head.col, --head.row)];
  };
  goSouth = () => {
    const head = this.cells[0];
    if (head.row == 19) {
      throw new GameOverError();
    }
    this.cells = [new Cell(head.col, ++head.row)];
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

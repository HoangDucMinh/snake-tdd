const Cell = require("./cell");
const Snake = require("./snake");

class Gui {
  constructor(params) {
    this.col = 20;
    this.row = 20;
  }
 
  static display(snake) {
    const grid = ".";
    const snakeCell="x";
    let result = "";
    for (let i = 0; i < 20; i++) {
      result += i < 10 ? `0${i}` : i;
      for (let j = 0; j < 20; j++) {
        const isCellOccupiedBySnake = snake && snake.checkCellIsSnake({col:j, row:i});
        result+=isCellOccupiedBySnake ? snakeCell: grid;
      }
      result += i < 19 ? "\n" : "";
    }
    return result;
  }
}

module.exports = Gui;

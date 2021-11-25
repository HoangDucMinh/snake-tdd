const Snake = require("./snake");
const Gui = require("./gui");
const { GameOverError } = require("./errors");
const Cell = require("./cell");

describe("Testing snake", () => {
  it("should create snake with 1 cell", () => {
    const snake = new Snake();
    expect(snake.cells.length).toEqual(1);
  });
  it("should create snake at location 9x9", () => {
    const snake = new Snake();
    expect(snake.cells[0]).toEqual({
      col: 9,
      row: 9,
    });
  });
  it("should move snake to east 1 unit", () => {
    const snake = new Snake();
    snake.goEast();
    expect(snake.cells[0]).toEqual({
      col: 10,
      row: 9,
    });
    expect(snake.getLength()).toEqual(1);
  });
  it("should move snake to west 1 unit", () => {
    const snake = new Snake();
    snake.goWest();
    expect(snake.cells[0]).toEqual({
      col: 8,
      row: 9,
    });
    expect(snake.getLength()).toEqual(1);
  });
  it("should move snake north 1 unit", () => {
    const snake = new Snake();
    snake.goNorth();
    expect(snake.cells[0]).toEqual({
      col: 9,
      row: 8,
    });
    expect(snake.getLength()).toEqual(1);
  });
  it("should move snake to south 1 unit", () => {
    const snake = new Snake();
    snake.goSouth();
    expect(snake.cells[0]).toEqual({
      col: 9,
      row: 10,
    });
    expect(snake.getLength()).toEqual(1);
  });
  it("should display no snake", () => {
    const snake = new Snake();
    const gui = Gui.display(null);
    expect(gui).toEqual(
      `
00....................
01....................
02....................
03....................
04....................
05....................
06....................
07....................
08....................
09....................
10....................
11....................
12....................
13....................
14....................
15....................
16....................
17....................
18....................
19....................`.trim()
    );
  });

  it("should display snake", () => {
    const snake = new Snake();
    const gui = Gui.display(snake);
    expect(gui).toEqual(
      `
00....................
01....................
02....................
03....................
04....................
05....................
06....................
07....................
08....................
09.........x..........
10....................
11....................
12....................
13....................
14....................
15....................
16....................
17....................
18....................
19....................`.trim()
    );
  });
  it("should display snake inline snapshot", () => {
    const snake = new Snake();
    const gui = Gui.display(snake);
    expect(gui).toMatchInlineSnapshot(`
"00....................
01....................
02....................
03....................
04....................
05....................
06....................
07....................
08....................
09.........x..........
10....................
11....................
12....................
13....................
14....................
15....................
16....................
17....................
18....................
19...................."
`);
  });

  it("throw game over exception if hit wall north", () => {
    const snake = new Snake();
    "123456789".split("").forEach((index) => snake.goNorth());
    expect(() => snake.goNorth()).toThrow(GameOverError);
  });
  it("throw game over exception if hit wall west", () => {
    const snake = new Snake();
    "123456789".split("").forEach((index) => snake.goWest());
    expect(() => snake.goWest()).toThrow(GameOverError);
  });
  it("throw game over exception if hit wall east", () => {
    const snake = new Snake();
    "0123456789".split("").forEach((index) => snake.goEast());
    expect(() => snake.goEast()).toThrow(GameOverError);
  });
  it("throw game over exception if hit wall south", () => {
    const snake = new Snake();
    "0123456789".split("").forEach((index) => snake.goSouth());
    expect(() => snake.goSouth()).toThrow(GameOverError);
  });

  it("it should check is cell not belong to snake", () => {
    const snake = new Snake();
    snake.addNode(new Cell(9,10))
    const testCell = new Cell(8,10)
    expect(snake.checkCellIsSnake(testCell)).toEqual(false)
  });

  it("it should check is cell belong to snake", () => {
    const snake = new Snake();
    snake.addNode(new Cell(9,10))
    const testCell = new Cell(9,10)
    expect(snake.checkCellIsSnake(testCell)).toEqual(true)
  });

  
  it("snake should show snake with 2 node", () => {
    const snake = new Snake();
    snake.addNode(new Cell(9, 10))
    
    const gui = Gui.display(snake);
    expect(gui).toMatchInlineSnapshot(`
"00....................
01....................
02....................
03....................
04....................
05....................
06....................
07....................
08....................
09.........x..........
10.........x..........
11....................
12....................
13....................
14....................
15....................
16....................
17....................
18....................
19...................."
`);
  });
  
});

it("should it add some cells", () => {
  const snake = new Snake();
  snake.addNodes([new Cell(9, 10), new Cell(9, 11), new Cell(9, 12), new Cell(9, 13)])
  const gui = Gui.display(snake);
  expect(gui).toMatchInlineSnapshot(`
"00....................
01....................
02....................
03....................
04....................
05....................
06....................
07....................
08....................
09.........x..........
10.........x..........
11.........x..........
12.........x..........
13.........x..........
14....................
15....................
16....................
17....................
18....................
19...................."
`);
});

it("snake with 2 node should move right", () => {
  const snake = new Snake();
  snake.addNode(new Cell(9, 10))
  
  snake.goEast()
  const gui = Gui.display(snake);
  expect(gui).toMatchInlineSnapshot(`
"00....................
01....................
02....................
03....................
04....................
05....................
06....................
07....................
08....................
09....................
10..........x.........
11....................
12....................
13....................
14....................
15....................
16....................
17....................
18....................
19...................."
`);
});

it.skip("snake with 2 node should move right", () => {
  const snake = new Snake();
  snake.addNode(new Cell(9, 10))
  
  snake.goEast()
  const gui = Gui.display(snake);
  expect(gui).toMatchInlineSnapshot(`
"00....................
01....................
02....................
03....................
04....................
05....................
06....................
07....................
08....................
09....................
10........xx..........
11....................
12....................
13....................
14....................
15....................
16....................
17....................
18....................
19...................."
`);
});


it.skip("snake with 2 node should move right then go south", () => {
  const snake = new Snake();
  snake.addNode(new Cell(9, 10))
  
  snake.goEast()
  snake.goSouth()
  const gui = Gui.display(snake);
  expect(gui).toMatchInlineSnapshot(`
"00....................
01....................
02....................
03....................
04....................
05....................
06....................
07....................
08....................
09....................
10..........x.........
11..........x.........
12....................
13....................
14....................
15....................
16....................
17....................
18....................
19...................."
`);
});


it.skip("snake with 2 node should move right then go south then go west", () => {
  const snake = new Snake();
  snake.addNode(new Cell(9, 10))
  
  snake.goEast()
  snake.goSouth()
  snake.goWest()
  const gui = Gui.display(snake);
  expect(gui).toMatchInlineSnapshot(`
"00....................
01....................
02....................
03....................
04....................
05....................
06....................
07....................
08....................
09....................
10....................
11.........xx.........
12....................
13....................
14....................
15....................
16....................
17....................
18....................
19...................."
`);
});
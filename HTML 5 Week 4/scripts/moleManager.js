import { canvas, ctx, lifeReduce, parentGrid,  ScoreModifier } from "./gameManager.js";

export const groundImage = new Image();
groundImage.src = "./sprites/ground.png";

export const moleImage = new Image();
moleImage.src = "./sprites/mole.png";

var row = 3;
var col = 3;

var cells = [];
var size = 0;
var isMolehitten = false;
export const CreateMolesGridCell = () => {
  const cellSize = parentGrid.size / row;
  cells = [];
  for (var i = 0; i < row; i++) {
    cells[i] = [];
    for (var j = 0; j < col; j++) {
      var child = new Cell(
        parentGrid.left + size,
        parentGrid.top + i * cellSize,
        cellSize
      );

      child.groundImg = groundImage;
      child.moleImg = moleImage;

      // cells.push(child);
      cells[i][j] = child;
      size += cellSize;

      console.log(
        `row ${i} col ${j} x=${child.x} y=${child.y} size=${child.size}`
      );
    }
    size = 0;
  }
};

export const DrawMoleGridCells = () => {
  if (cells.length == 0) {
    CreateMolesGridCell();
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let c = cells[i][j];
      let groundHeight = c.size / 3;
      let groundY = c.y + c.size - groundHeight;

      // Draw ground
      if (c.groundImg && c.groundImg.complete) {
        ctx.drawImage(c.groundImg, c.x, groundY, c.size, groundHeight);
      }

      // Draw mole
      if (c.showMole && c.moleImg && c.moleImg.complete) {
        ctx.drawImage(c.moleImg, c.x, c.y, c.size, c.size);
      }
    }
  }
};

let lastChange = 0;
const interval = 1000;
export const DrawRandomMole = (now) => {
  if (now - lastChange >= interval) {
    lastChange = now;
    if(isMolehitten){
        console.log("point increase")
        ScoreModifier(1);
    }else{
        console.log("point reduce"); 
        lifeReduce()
    }
    ActiveOneMole();
  }
};

const ActiveOneMole = () => {
  let r = Math.floor(Math.random() * row);
  let c = Math.floor(Math.random() * col);

  // hide all moles first
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      cells[i][j].showMole = false;
    }
  }

  // show mole at random cell
  cells[r][c].showMole = true;
  isMolehitten = false;
};



export const onCanvasClick = (e) => {
  const rect = canvas.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  CheckMoleHit(mouseX, mouseY);
};

const CheckMoleHit = (mouseX, mouseY) => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const cell = cells[i][j];

      if (!cell.showMole) continue;

      if (
        mouseX >= cell.x &&
        mouseX <= cell.x + cell.size &&
        mouseY >= cell.y &&
        mouseY <= cell.y + cell.size
      ) {
        KillMole(cell);
        return;
      }
    }
  }
};

const KillMole = (cell) => {
    isMolehitten = true;
    cell.showMole = false;
    console.log("score ++");

};
class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.groundImg = null;
    this.moleImg = null;
    this.showMole = false;
  }
}

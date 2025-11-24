import { canvas, ctx } from "./canvas.js";
export const DrawPoles = () => {
    ctx.fillStyle = "green"
  MovePoles();
  DrawTopPoles();
  DrawBottomPole();
};
// var pole;
// var poleX = canvas.width + 60;
// var poleX = 60;
// var poleHeight = Math.random() * 200;
// var poleY = canvas.height - poleHeight;
var poleWidth = 50;
export var poles = [];
export var topPoles = [];
const poleCount = 5;
export const CreatePolesStructure = () => {
  CreateTopPolesStructure();
  CreateBottomPoleStructure();
};

const CreateBottomPoleStructure = () => {
  for (var i = 0; i < poleCount; i++) {
    let height = Math.random() * 100 + 130;

    let top = canvas.height - height;

    let left = canvas.width + i * 110; // spacing between poles

    let poleObj = new Pole(left, top, poleWidth, height);
    poles.push(poleObj);
  }
};

const CreateTopPolesStructure = () => {
  for (var i = 0; i < poleCount; i++) {
    let height = Math.random() * 100 + 130;

    let top = 0;

    let left = canvas.width + i * 110;
    let poleObj = new Pole(left, top, poleWidth, height);
    topPoles.push(poleObj);
  }
};

const DrawTopPoles = () => {
  for (var i = 0; i < poleCount; i++) {
    ctx.fillRect(
      topPoles[i].left,
      topPoles[i].top,
      topPoles[i].width,
      topPoles[i].height
    );
    console.log("drawn top poles are ", i);
  }
};

const DrawBottomPole = () => {
  for (var i = 0; i < poleCount; i++) {
    //   pole = new Pole(poleX, poleY, poleWidth, poleHeight);
    ctx.fillRect(poles[i].left, poles[i].top, poles[i].width, poles[i].height);
    console.log("drawn poles are ", i);
  }
};

const MovePoles = () => {
  for (let i = 0; i < poles.length; i++) {
    let p = poles[i];

    p.left -= 2;

    if (p.left + p.width < 0) {
      p.left = canvas.width + 100;
      p.height = Math.random() * 100 + 130;
      p.top = canvas.height - p.height;
    }
  }
  for (let i = 0; i < topPoles.length; i++) {
    let p = topPoles[i];

    p.left -= 2;

    if (p.left + p.width < 0) {
      p.left = canvas.width + 100;
      p.height = Math.random() * 100 + 130;
      p.top = 0;
    }
  }
};
export class Pole {
  constructor(left, top, width, height) {
    this.height = height;
    this.width = width;
    this.top = top;
    this.left = left;
  }
}

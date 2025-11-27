import {
  canvas,
  ctx,
  drawGridParent,
  isGameRunning,
  lifes,
  score,
} from "./gameManager.js";
import { DrawMoleGridCells, DrawRandomMole } from "./moleManager.js";

export const Draw = (dt) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGridParent();
  DrawMoleGridCells();
  DrawRandomMole(dt);
  DrawScore();
  DrawLives();
};

const DrawScore = () => {
  if (isGameRunning) {
    ctx.font = "50px black";
    ctx.fillStyle = "black";
    ctx.fillText("Score : " + score, 100, 100, 1000);
  }
};
const DrawLives = () => {
  if (isGameRunning) {
    ctx.font = "50px black";
    ctx.fillStyle = "black";
    ctx.fillText("Lives : " + lifes, 100, 200, 1000);
  }
};

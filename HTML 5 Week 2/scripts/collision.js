// scripts/collision.js
import { gameState } from "./gameState.js";
import { pingPongCanvas, EnableUi } from "./gameManager.js";

export const CheckCollision = () => {
  const g = gameState;

  if (
    g.circleX + g.circleSize > g.paddleLeftPos &&
    g.circleX - g.circleSize < g.paddleLeftPos + g.paddleWidth &&
    g.circleY + g.circleSize > g.paddleTopPos &&
    g.circleY - g.circleSize < g.paddleTopPos + g.paddleHeight
  ) {
    g.score++;
    g.circleY = g.paddleTopPos - g.circleSize;
    g.circleYUpdate = -Math.abs(g.circleYUpdate); // bounce upward
  }
};

export const BallGroundCheck = () => {
  // if ball hits bottom of canvas => game over
  if (gameState.circleY + gameState.circleSize >= pingPongCanvas.height) {
    gameState.gameOver = true;
    EnableUi();
  }
};

// scripts/animate.js
import { gameState } from "./gameState.js";
import { BallGroundCheck, CheckCollision } from "./collision.js";
import { pingPongCanvas } from "./gameManager.js";

export const Animate = (dt) => {
  AnimateBall(dt);
  AnimatePaddle(dt);
};

const AnimateBall = (dt) => {
  // move ball
  gameState.circleX += gameState.circleXUpdate * (dt / 1000);
  gameState.circleY += gameState.circleYUpdate * (dt / 1000);

  // bounce off left/right walls
  if (
    gameState.circleX + gameState.circleSize > pingPongCanvas.width ||
    gameState.circleX - gameState.circleSize < 0
  ) {
    gameState.circleXUpdate = -gameState.circleXUpdate;
  }

  // bounce off top
  if (gameState.circleY - gameState.circleSize < 0) {
    gameState.circleYUpdate = -gameState.circleYUpdate;
  }

  BallGroundCheck();
  CheckCollision();
};

const paddleMovementSpeed = 10;

const AnimatePaddle = (dt) => {
  const speed = paddleMovementSpeed * (dt / 50);

  if (gameState.moveLeft) gameState.paddleLeftPos -= speed;
  if (gameState.moveRight) gameState.paddleLeftPos += speed;
};

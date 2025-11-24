// scripts/collision.js
import { gameState } from "./gameState.js";
import { pingPongCanvas, EnableUi } from "./gameManager.js";
import { SoundManager } from "./soundManager.js";
export const CheckCollision = () => {
  const g = gameState;

  if (
    g.circleX + g.circleSize > g.paddleLeftPos &&
    g.circleX - g.circleSize < g.paddleLeftPos + g.paddleWidth &&
    g.circleY + g.circleSize > g.paddleTopPos &&
    g.circleY - g.circleSize < g.paddleTopPos + g.paddleHeight
  ) {
    Bounce();
  }
};

export const BallGroundCheck = () => {

  if (gameState.circleY + gameState.circleSize >= pingPongCanvas.height) {
    if (gameState.ballLife > 0) {
      gameState.ballLife--;
      Bounce();
      return;
    } else {
      gameState.gameOver = true;
      EnableUi();
      SoundManager.play("gameOver");
    }
  }
};

const Bounce = () => {
  const g = gameState;
  g.circleY = g.paddleTopPos - g.circleSize;
  g.circleYUpdate = -Math.abs(g.circleYUpdate); 
  SoundManager.play("bounce");
};


// const AngleBounce=()=>{
//     const g = gameState;

//   const paddleCenter = g.paddleLeftPos + g.paddleWidth / 2;
//   const hitPoint = g.circleX - paddleCenter;

//   // Normalize hit point (-1 to 1)
//   const normalized = hitPoint / (g.paddleWidth / 2);

//   // Maximum angle (75 degrees)
//   const maxBounceAngle = (60 * Math.PI) / 180;

//   // Calculate bounce angle
//   const bounceAngle = normalized * maxBounceAngle;

//   // Current speed magnitude
//   const speed = Math.sqrt(g.circleXUpdate ** 2 + g.circleYUpdate ** 2);

//   // Set new velocities based on angle
//   g.circleXUpdate = Math.sin(bounceAngle) * speed;
//   g.circleYUpdate = -Math.cos(bounceAngle) * speed;

//   // place ball above paddle
//   g.circleY = g.paddleTopPos - g.circleSize;

//   SoundManager.play("bounce");
// }
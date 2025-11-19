import { pingPongCtx, CheckLevelComplete } from "./gameManager.js";
import { gameState } from "./gameState.js";
import { SoundManager } from "./soundManager.js";
export const brickRows = 2;
export const brickCols = 8;

export const brickWidth = 60.7;
export const brickHeight = 20;
export const brickPadding = 2;
export const brickOffsetTop = 30;
export const brickOffsetLeft = 0;

let bricks = gameState.bricksArray; // 2D array

// Brick class (similar to a prefab in Unity)
class Brick {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = brickWidth;
    this.height = brickHeight;
    this.alive = true;
    this.color = color;
  }
}

const getRandomColor = () => {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Create the brick grid (Unity: Instantiate objects in Start)
export const CreateBricks = () => {
  bricks = [];

  for (let row = 0; row < brickRows; row++) {
    bricks[row] = [];

    for (let col = 0; col < brickCols; col++) {
      const x = brickOffsetLeft + col * (brickWidth + brickPadding);
      const y = brickOffsetTop + row * (brickHeight + brickPadding);

      bricks[row][col] = new Brick(x, y, getRandomColor());
    }
  }

  gameState.bricksArray = bricks;  
};

// Draw all bricks (Unity: Update() → Render)
export const DrawBricks = () => {
    const bricks = gameState.bricksArray;
  for (let row = 0; row < brickRows; row++) {
    for (let col = 0; col < brickCols; col++) {
      const brick = bricks[row][col];

      if (brick.alive) {
        pingPongCtx.fillStyle = brick.color;
        pingPongCtx.fillRect(brick.x, brick.y, brick.width, brick.height);
      }
    }
  }
};

export function checkBrickCollision() {
  const ballLeft = gameState.circleX - gameState.circleSize;
  const ballRight = gameState.circleX + gameState.circleSize;
  const ballTop = gameState.circleY - gameState.circleSize;
  const ballBottom = gameState.circleY + gameState.circleSize;

  for (let row = 0; row < bricks.length; row++) {
    for (let col = 0; col < bricks[row].length; col++) {

      const brick = bricks[row][col];

      if (!brick.alive) continue; 

      const brickLeft = brick.x;
      const brickRight = brick.x + brick.width;
      const brickTop = brick.y;
      const brickBottom = brick.y + brick.height;
 
      if (
        ballRight > brickLeft &&
        ballLeft < brickRight &&
        ballBottom > brickTop &&
        ballTop < brickBottom
      ) {
        brick.alive = false; 
        gameState.score++;   
        SoundManager.play("brickHit")
        resolveBrickHitDirection(brick);

        CheckLevelComplete()
        return; 
      }
    }

  }
  
}
function resolveBrickHitDirection(brick) {
  const ballCenterX = gameState.circleX;
  const ballCenterY = gameState.circleY;

  const brickCenterX = brick.x + brick.width / 2;
  const brickCenterY = brick.y + brick.height / 2;

  const dx = ballCenterX - brickCenterX;
  const dy = ballCenterY - brickCenterY;

  // More horizontal overlap → bounce on X
  if (Math.abs(dx) > Math.abs(dy)) {
    gameState.circleXUpdate *= -1;
  }
  // More vertical overlap → bounce on Y
  else {
    gameState.circleYUpdate *= -1;
  }
}

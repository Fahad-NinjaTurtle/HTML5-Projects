// @ts-nocheck
const pingPongCanvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("pingPongCanvas")
);
const pingPongCtx = pingPongCanvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const quitBtn = document.getElementById("quitBtn");

var gameOver = false;
var score = 0;
// update call
const Update = (dt) => {
  if (!gameOver) {
    Animate(dt);
    Draw(dt);
  } else {
  }
};

// draw calls
const Draw = (dt) => {
  pingPongCtx.clearRect(0, 0, pingPongCanvas.width, pingPongCanvas.height);
  DrawFps(dt);
  DrawScore();
  DrawBall();
  DrawPaddle();
};

// genreic animate
const Animate = (dt) => {
  AnimateBall(dt);
   AnimatePaddle(dt);
};

// fps function
const textLeft = 410;
const textTop = 20;
const textWidth = 100;

const DrawFps = (dt) => {
  const fps = 1000 / dt;
  pingPongCtx.font = "20px Arial";
  pingPongCtx.fillStyle = "black";
  pingPongCtx.fillText(
    "FPS : " + Math.round(fps),
    textLeft,
    textTop,
    textWidth
  );
};

// draw score
const scoreTextLeft = 10;
const scoreTextTop = 20;
const scoreTextWidth = 100;

const DrawScore = () => {
  pingPongCtx.fillStyle = "black";
  pingPongCtx.fillText(
    "Score : " + score,
    scoreTextLeft,
    scoreTextTop,
    scoreTextWidth
  );
};

// draw ball
var circleX = 30;
var circleY = 30;
const circleSize = 10;

const DrawBall = () => {
  pingPongCtx.beginPath();
  pingPongCtx.arc(circleX, circleY, circleSize, 0, Math.PI * 2);
  pingPongCtx.fillStyle = "black";
  pingPongCtx.fill();
};

// draw paddle
const paddleHeight = 20;
const paddleWidth = 100;
const paddleTopPos = pingPongCanvas.height - paddleHeight;
var paddleLeftPos = 200;
const paddleMovementSpeed = 10;
var paddle;
const DrawPaddle = () => {
  pingPongCtx.fillStyle = "pink";
  if (paddleLeftPos < 0) {
    paddleLeftPos = 0;
  } else if (paddleLeftPos + paddleWidth > pingPongCanvas.width) {
    paddleLeftPos = pingPongCanvas.width - paddleWidth;
  }
  paddle = pingPongCtx.fillRect(paddleLeftPos, paddleTopPos, paddleWidth, paddleHeight);
};

// animate ball
// how much to animate pixel per second
var circleXUpdate = 200;
var circleYUpdate = 200;

const AnimateBall = (dt) => {
  circleX += circleXUpdate * (dt / 1000);
  circleY += circleYUpdate * (dt / 1000);

  if (circleX + circleSize > pingPongCanvas.width || circleX - circleSize < 0) {
    circleXUpdate = -circleXUpdate;
  }
  if (
    circleY + circleSize > pingPongCanvas.height ||
    circleY - circleSize < 0
  ) {
    circleYUpdate = -circleYUpdate;
  }
  BallGroundCheck();
  CheckCollision();
};

const CheckCollision = () => {
  if (
    circleX + circleSize > paddleLeftPos &&
    circleX - circleSize < paddleLeftPos + paddleWidth &&
    circleY + circleSize > paddleTopPos &&
    circleY - circleSize < paddleTopPos + paddleHeight
  ) {
    console.log("collision done");
    score += 1;
    circleY = paddleTopPos - circleSize;
    circleYUpdate = -Math.abs(circleYUpdate); //  ensures it goes upward
  }
};

const BallGroundCheck = () => {
  if (circleY + circleSize >= pingPongCanvas.height) {
    gameOver = true;
    EnableUi();
  }
};

const RestartGame = () => {
  gameOver = false;
  score = 0;
  pingPongCtx.clearRect(0, 0, pingPongCanvas.width, pingPongCanvas.height);

  circleX = Math.random() * pingPongCanvas.width;            
  circleY = Math.random() * (pingPongCanvas.height / 2);     

  circleXUpdate = 200 * (Math.random() > 0.5 ? 1 : -1);      
  circleYUpdate = 200; 
                                        
  paddleLeftPos = (pingPongCanvas.width - paddleWidth) / 2;
  DisableUi();
  lastTime = performance.now();
};


// starting of the game
var lastTime = 0;
const frames = 120;
const targetFps = 1000 / frames; // 1000 ms = 1 sec
var deltaTime;
function loop(currentTime) {
  deltaTime = currentTime - lastTime;
  if (deltaTime < targetFps) {
    requestAnimationFrame(loop);
    return;
  }
  Update(deltaTime);
  lastTime = currentTime;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
let moveLeft = false;
let moveRight = false;
const AddListnersForKeyboard = () => {
  document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveLeft = true;
  if (e.key === "ArrowRight") moveRight = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") moveLeft = false;
  if (e.key === "ArrowRight") moveRight = false;
});

  restartBtn.addEventListener("click", () => {
    RestartGame();
  });

  quitBtn.addEventListener("click", () => {
    alert("Coward!!!");
  });
};
const AnimatePaddle = (dt) => {
  const speed = paddleMovementSpeed * (dt / 50);
  if (moveLeft) paddleLeftPos -= speed;
  if (moveRight) paddleLeftPos += speed;
};
AddListnersForKeyboard();

const EnableUi = () => {
  restartBtn.style.display = "block";
  quitBtn.style.display = "block";
};
const DisableUi = () => {
  restartBtn.style.display = "none";
  quitBtn.style.display = "none";
};

DisableUi();

const PaddleMovementWithMouseDrag = ()=>{
let isDragging = false;
let dragOffsetX = 0;

pingPongCanvas.addEventListener("mousedown", (e)=>{
  const rect = pingPongCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;

  if(mouseX >= paddleLeftPos &&
    mouseX <= paddleLeftPos + paddleWidth &&
    e.clientY - rect.top >= paddleTopPos &&
    e.clientY - rect.top <= paddleTopPos + paddleHeight
  ){
    isDragging = true;
    dragOffsetX = mouseX - paddleLeftPos;
  }
});

pingPongCanvas.addEventListener("mousemove", (e)=>{
  if(!isDragging) return;
  const rect = pingPongCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  paddleLeftPos = mouseX - dragOffsetX;
});

pingPongCanvas.addEventListener("mouseup", (e)=>{
  isDragging = false
})
}

const PaddleMovementWithTouchDrag = () => {
  let isDragging = false;
  let dragOffsetX = 0;

  pingPongCanvas.addEventListener("touchstart", (e) => {
    const rect = pingPongCanvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const touchY = e.touches[0].clientY - rect.top;

    if (
      touchX >= paddleLeftPos &&
      touchX <= paddleLeftPos + paddleWidth &&
      touchY >= paddleTopPos &&
      touchY <= paddleTopPos + paddleHeight
    ) {
      isDragging = true;
      dragOffsetX = touchX - paddleLeftPos;
    }
  });

  pingPongCanvas.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault(); // prevents page scrolling
    const rect = pingPongCanvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    paddleLeftPos = touchX - dragOffsetX;
  });

  pingPongCanvas.addEventListener("touchend", () => {
    isDragging = false;
  });
};


PaddleMovementWithMouseDrag();
PaddleMovementWithTouchDrag();
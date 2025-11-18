// @ts-check
const testCanvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("testCanvas")
);
const testCtx = testCanvas.getContext("2d");

// Ball properties
let posX = 40;
let posY = 40;
const radius = 40;

// Base speed (pixels per second)
const normalSpeedX = 120;
const normalSpeedY = 80;
const boostedSpeedMultiplier = 2;

let speedX = normalSpeedX;
let speedY = normalSpeedY;

// Booster box properties
const boxWidth = 150;
const boxHeight = 100;
const boxX = testCanvas.width / 2 - boxWidth / 2;
const boxY = testCanvas.height / 2 - boxHeight / 2;

// Boost logic
let isBoosted = false;
let boostTimer = 0; // measured in seconds

function update(dt) {
  moveBall(dt);
  handleBoost(dt);
  draw(dt);
}

function draw(dt) {
  testCtx.clearRect(0, 0, testCanvas.width, testCanvas.height);
  drawBoosterBox();
  drawFPS(1 / dt);
  drawBall();
}

function drawBall() {
  testCtx.beginPath();
  testCtx.fillStyle = isBoosted ? "red" : "black"; // show boosted state visually
  testCtx.arc(posX, posY, radius, 0, Math.PI * 2);
  testCtx.fill();
}

function drawBoosterBox() {
  testCtx.fillStyle = "lightgreen";
  testCtx.fillRect(boxX, boxY, boxWidth, boxHeight);
}

function drawFPS(fps) {
  testCtx.font = "20px Arial";
  testCtx.fillStyle = "black";
  testCtx.fillText("FPS: " + Math.round(fps).toString(), 20, 30);
}

// 🧩 1️⃣ MOVE the ball using dt
function moveBall(dt) {
  posX += speedX * dt;
  posY += speedY * dt;

  // Wall collisions
  if (posX + radius > testCanvas.width || posX - radius < 0) {
    speedX = -speedX;
  }
  if (posY + radius > testCanvas.height || posY - radius < 0) {
    speedY = -speedY;
  }

  // 🧩 2️⃣ Check if the ball touches the booster box
  if (
    posX + radius > boxX &&
    posX - radius < boxX + boxWidth &&
    posY + radius > boxY &&
    posY - radius < boxY + boxHeight
  ) {
    activateBoost();
  }
}

// 🧩 3️⃣ Activate the boost (if not already active)
function activateBoost() {
  if (!isBoosted) {
    isBoosted = true;
    boostTimer = 1; // 1 second duration
    speedX *= boostedSpeedMultiplier;
    speedY *= boostedSpeedMultiplier;
  } else {
    // if ball touches again, reset timer only
    boostTimer = 1;
  }
}

// 🧩 4️⃣ Handle timing of the boost using deltaTime
function handleBoost(dt) {
  if (isBoosted) {
    boostTimer -= dt;
    if (boostTimer <= 0) {
      isBoosted = false;
      // revert to normal speed, but keep direction
      speedX = Math.sign(speedX) * normalSpeedX;
      speedY = Math.sign(speedY) * normalSpeedY;
    }
  }
}

let lastT = 0;
function loop(currentTime) {
  const deltaTime = (currentTime - lastT) / 1000; // seconds
  lastT = currentTime;

  update(deltaTime);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

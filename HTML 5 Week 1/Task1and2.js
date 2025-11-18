// @ts-check
const canvas = /** @type {HTMLCanvasElement} */ (
    document.getElementById("myCanvas")
);
const ctx = canvas.getContext("2d");

// Rectangle
let rectangleX = 10;
let rectangleY = 10;
const rectangleWidth = 100;
const rectangleHeight = 50;
let rectSpeedX = 150; // pixels per second
let rectSpeedY = 100;

// Circle
let circleX = 50;
let circleY = 50;
const circleSize = 50;
let circleSpeedX = 200;
let circleSpeedY = 120;

// text 
const textLeftMargin = 10;
const textTopMargin = 30;
const textWidth = 100;

// current fps
var currentFps = 0;

function update(dt) {
    // Rectangle motion
    rectangleX += rectSpeedX * dt;
    rectangleY += rectSpeedY * dt;

    if (rectangleX < 0 || rectangleX + rectangleWidth > testCanvas.width)
        rectSpeedX = -rectSpeedX;
    if (rectangleY < 0 || rectangleY + rectangleHeight > testCanvas.height)
        rectSpeedY = -rectSpeedY;

    // Circle motion
    circleX += circleSpeedX * dt;
    circleY += circleSpeedY * dt;

    if (circleX + circleSize > testCanvas.width || circleX - circleSize < 0)
        circleSpeedX = -circleSpeedX;
    if (circleY + circleSize > testCanvas.height || circleY - circleSize < 0)
        circleSpeedY = -circleSpeedY;

    currentFps = 1 / dt;
}

function draw() {
    testCtx.clearRect(0, 0, testCanvas.width, testCanvas.height);

    // Rectangle
    testCtx.fillStyle = "pink";
    testCtx.fillRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

    // Circle
    testCtx.beginPath();
    testCtx.arc(circleX, circleY, circleSize, 0, Math.PI * 2);
    testCtx.fillStyle = "black";
    testCtx.fill();

    testCtx.beginPath();
    testCtx.moveTo(50, 50);
    testCtx.lineTo(150, 50);
    testCtx.lineTo(100, 100);
    testCtx.closePath();
    testCtx.stroke();

    testCtx.font = "30px Verdana";
    testCtx.fillText("FPS", textLeftMargin, textTopMargin, textWidth)
    testCtx.fillText(Math.round(currentFps).toString(), 80, 30, 100);
}

let lastTime = 0;
const targetFPS = 60;
const frameDuration = 1000 / targetFPS; // ~16.67 ms per frame

function loop(currentTime) {
    if (currentTime - lastTime < frameDuration) {
        requestAnimationFrame(loop);
        return; // skip this frame
    }

    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    update(deltaTime);
    draw();

    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

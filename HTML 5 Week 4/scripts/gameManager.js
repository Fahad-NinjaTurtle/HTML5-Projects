/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("gameCanvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    drawGridParent();
}

function drawGridParent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const screenW = canvas.width;
    const screenH = canvas.height;

    const allowedWidth = screenW * 0.40;  
    const allowedHeight = screenH * 0.80; 

    const squareSize = Math.min(allowedWidth, allowedHeight);

    const x = (screenW - squareSize) / 2;
    const y = (screenH - squareSize) / 2;

    ctx.fillStyle = "black";
    ctx.fillRect(x, y, squareSize, squareSize);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

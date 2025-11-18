document.addEventListener("keydown", (e) => {
  console.log("key pressed", e.key);
});
document.addEventListener("keyup", (e) => {
  console.log("Key released:", e.key);
});

let possX = 100;
let possY = 100;
const speed = 5;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") possX += speed;
  if (e.key === "ArrowLeft") possX -= speed;
  if (e.key === "ArrowUp") possY -= speed;
  if (e.key === "ArrowDown") possY += speed;
});


const canvas = /** @type {HTMLCanvasElement} */document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  console.log("Mouse move:", x, y);
});

canvas.addEventListener("mousedown", (e) => {
  console.log("Mouse clicked at:", e.clientX, e.clientY);
});


canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
});

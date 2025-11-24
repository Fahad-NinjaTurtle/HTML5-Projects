import { birdData } from "./birdManager.js";
import { canvas } from "./canvas.js";
import { GameOver } from "./gameManager.js";
import { topPoles } from "./poleManager.js";
import { poles } from "./poleManager.js";   // bottom poles also needed

export const CollisionCheck = () => {

    let birdX = birdData.x;
    let birdY = birdData.y;
    let r = birdData.radius;
    BallGroundCheck(birdY)
    // check all 5 top and bottom poles
    for (let i = 0; i < topPoles.length; i++) {

        let t = topPoles[i];
        let b = poles[i];

        // ---- TOP POLE COLLISION ----
        if (circleRectCollide(birdX, birdY, r, t.left, t.top, t.width, t.height)) {
            GameOver();
            return;
        }

        // ---- BOTTOM POLE COLLISION ----
        if (circleRectCollide(birdX, birdY, r, b.left, b.top, b.width, b.height)) {
            GameOver();
            return;
        }
    }
};
const circleRectCollide=(cx, cy, radius, rx, ry, rw, rh)=> {
    let testX = cx;
    let testY = cy;

    if (cx < rx) testX = rx;
    else if (cx > rx + rw) testX = rx + rw;

    if (cy < ry) testY = ry;
    else if (cy > ry + rh) testY = ry + rh;

    let distX = cx - testX;
    let distY = cy - testY;

    let distance = Math.sqrt(distX * distX + distY * distY);

    return distance <= radius;
}


const BallGroundCheck=(bY)=>{
    if(bY > canvas.height){
        GameOver();
        return;
    }
}


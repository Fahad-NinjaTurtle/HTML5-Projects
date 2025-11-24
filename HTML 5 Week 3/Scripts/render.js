import { DrawBird } from "./birdManager.js";
import { DrawPoles } from "./poleManager.js";

export const Draw = () => {
  DrawPoles();
  DrawBird();
};

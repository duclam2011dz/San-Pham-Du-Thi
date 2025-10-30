import { Game } from "./components/game.js";

const canvas = document.getElementById("game");
const game = new Game(canvas);

window.addEventListener("resize", () => game.resizeCanvas());
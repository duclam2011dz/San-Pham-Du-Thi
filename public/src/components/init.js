import { Player } from "./player.js";
import { Platform } from "./platform.js";
import { Camera } from "./camera.js";
import { loadLevelJSON } from "../utils/sharedImport.js";

export class Init {
    constructor(canvas, levelName = "level1") {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.mapWidth = 3000;
        this.keys = {};

        this.levelName = levelName;
        this.platforms = [];
        this.player = null;
        this.camera = null;

        this.ready = false;
    }

    async loadLevel() {
        const levelData = await loadLevelJSON(this.levelName);
        this.platforms = levelData.platforms.map(
            p => new Platform(p.x, p.y, p.width, p.height)
        );
        this.player = new Player(levelData.spawn.x, levelData.spawn.y);
        this.camera = new Camera(this.canvas, this.mapWidth);

        this.ready = true;
    }
}
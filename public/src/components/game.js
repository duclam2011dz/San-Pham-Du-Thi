import { Player } from "./player.js";
import { Platform } from "./platform.js";
import { Camera } from "./camera.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.mapWidth = 3000;
        this.keys = {};

        this.player = new Player(100, 0);
        this.camera = new Camera(this.canvas, this.mapWidth);

        // Sàn & vật cản — nằm dưới đáy canvas
        this.platforms = [
            new Platform(0, this.canvas.height + 500, 1000, 50),
            new Platform(1200, this.canvas.height + 500, 400, 50),
            new Platform(1700, this.canvas.height + 400, 200, 50),
            new Platform(2100, this.canvas.height + 450, 200, 50),
            new Platform(2500, this.canvas.height + 300, 500, 50),
        ];

        // Đặt player ở mặt đất ban đầu
        this.player.y = this.canvas.height - this.player.height - 80;

        this.setupInput();
        this.resizeCanvas();
        this.loop();
    }

    setupInput() {
        window.addEventListener("keydown", (e) => (this.keys[e.key] = true));
        window.addEventListener("keyup", (e) => (this.keys[e.key] = false));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    update() {
        this.player.handleInput(this.keys);
        this.player.update(this.platforms, this.mapWidth);
        this.camera.update(this.player);
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Background parallax
        this.camera.drawBackground(ctx);

        // Dịch camera
        ctx.save();
        ctx.translate(-this.camera.x, 0);

        for (let p of this.platforms) p.draw(ctx);
        this.player.draw(ctx);

        ctx.restore();
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}
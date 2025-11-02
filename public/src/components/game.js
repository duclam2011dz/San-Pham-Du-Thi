import { Init } from "./init.js";

export class Game extends Init {
    constructor(canvas) {
        super(canvas, "level1");
        this.loadLevel().then(() => {
            this.setupInput();
            this.resizeCanvas();
            this.loop();
        });
    }

    setupInput() {
        window.addEventListener("keydown", e => (this.keys[e.key] = true));
        window.addEventListener("keyup", e => (this.keys[e.key] = false));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    update() {
        if (!this.ready) return;

        this.player.handleInput(this.keys);
        this.player.update(this.platforms, this.mapWidth, this.canvas.height);
        this.camera.update(this.player);
    }

    draw() {
        if (!this.ready) return;

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.camera.drawBackground(ctx);

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
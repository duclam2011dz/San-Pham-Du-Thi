export class Camera {
    constructor(canvas, mapWidth) {
        this.canvas = canvas;
        this.mapWidth = mapWidth;
        this.x = 0;
        this.background = new Image();
        this.background.src = "../assets/img/background.png";
        this.bgWidth = 996;
        this.parallaxRatio = 0.5;
    }

    update(player) {
        this.x = player.x - this.canvas.width / 2 + player.width / 2;
        this.x = Math.max(0, Math.min(this.x, this.mapWidth - this.canvas.width));
    }

    drawBackground(ctx) {
        const offsetX = -(this.x * this.parallaxRatio) % this.bgWidth;
        const numImages = Math.ceil(this.canvas.width / this.bgWidth) + 1;
        for (let i = 0; i < numImages; i++) {
            ctx.drawImage(
                this.background,
                offsetX + i * this.bgWidth,
                0,
                this.bgWidth,
                this.canvas.height
            );
        }
    }
}
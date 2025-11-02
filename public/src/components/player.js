import { applyPlayerPhysics } from "../utils/playerPhysics.js";

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.spawnPoint = { x, y }; // thêm spawnPoint mặc định

        this.width = 40;
        this.height = 60;
        this.color = "blue";
        this.dx = 0;
        this.dy = 0;
        this.speed = 5;
        this.jumpPower = 15;
        this.gravity = 0.8;
        this.onGround = false;
        this.movingHorizontally = false;
        this.respawning = false;
    }

    handleInput(keys) {
        this.movingHorizontally = false;

        if (keys["ArrowLeft"]) {
            this.dx = -this.speed;
            this.movingHorizontally = true;
        } else if (keys["ArrowRight"]) {
            this.dx = this.speed;
            this.movingHorizontally = true;
        }

        if (keys["ArrowUp"] && this.onGround) {
            this.dy = -this.jumpPower;
            this.onGround = false;
        }
    }

    update(platforms, mapWidth, canvasHeight) {
        applyPlayerPhysics(this, platforms, mapWidth, canvasHeight);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
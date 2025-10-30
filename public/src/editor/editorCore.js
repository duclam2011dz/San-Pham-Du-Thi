import { Camera } from "../components/camera.js";
import { EditorGUI } from "./editorGUI.js";

export class EditorCore extends EditorGUI {
    constructor(canvas) {
        const mapWidth = 996 * 10;
        const mapHeight = window.innerHeight - 90;
        const camera = new Camera(canvas, mapWidth);

        super(canvas, camera, mapWidth, mapHeight);

        this.camera = camera;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;

        this.setupControls();
        this.resizeCanvas();
        this.loop();
    }

    setupControls() {
        const scrollSpeed = 10;
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.camera.x -= scrollSpeed;
            if (e.key === "ArrowRight") this.camera.x += scrollSpeed;

            this.camera.x = Math.max(0, Math.min(this.camera.x, this.mapWidth - this.canvas.width));
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 90;
        this.mapHeight = this.canvas.height;
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Background
        this.camera.drawBackground(this.ctx);

        // Dịch camera
        this.ctx.save();
        this.ctx.translate(-this.camera.x, 0);
        this.drawEditor(this.ctx);
        this.ctx.restore();

        requestAnimationFrame(() => this.loop());
    }
}
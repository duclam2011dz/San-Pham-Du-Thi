import { EditorTiles } from "./editorTiles.js";
import { EditorExport } from "./editorExport.js";
import { EditorInit } from "./editorInit.js";

export class EditorGUI {
    constructor(canvas, camera, mapWidth, mapHeight) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.camera = camera;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;

        this.tilesManager = new EditorTiles(50);
        this.exporter = new EditorExport();
        this.importer = new EditorInit(this.tilesManager);

        this.currentTool = "ground";
        this.initGUI();
    }

    initGUI() {
        this.currentTileEl = document.getElementById("currentTile").querySelector("span");

        // Buttons
        document.getElementById("selectGround").onclick = () => {
            this.currentTool = "ground";
            this.currentTileEl.textContent = "Ground";
        };

        document.getElementById("selectSpawn").onclick = () => {
            this.currentTool = "spawn";
            this.currentTileEl.textContent = "Checkpoint";
        };

        // Export button
        document.getElementById("exportBtn").onclick = () => {
            const spawn = this.tilesManager.getSpawnPoint();
            this.exporter.exportToJSON(this.tilesManager.tiles, spawn);
        };

        // Import button (hiện prompt chọn file)
        document.getElementById("importBtn").onclick = async () => {
            const levelName = prompt("Nhập tên file level (không cần .json):", "level1");
            if (!levelName) return;
            await this.importer.importLevel(levelName);
        };

        // Mouse events
        this.canvas.addEventListener("click", (e) => this.handleLeftClick(e));
        this.canvas.addEventListener("contextmenu", (e) => this.handleRightClick(e));
    }

    handleLeftClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left + this.camera.x;
        const mouseY = e.clientY - rect.top;

        const gridX = Math.floor(mouseX / this.tilesManager.tileSize) * this.tilesManager.tileSize;
        const gridY = Math.floor(mouseY / this.tilesManager.tileSize) * this.tilesManager.tileSize;

        if (this.currentTool === "spawn") {
            const existing = this.tilesManager.tiles.find(t => t.type === "spawn");
            if (existing) {
                existing.x = gridX;
                existing.y = gridY;
                return;
            }
        }

        this.tilesManager.addTile(gridX, gridY, this.currentTool);
    }

    handleRightClick(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left + this.camera.x;
        const mouseY = e.clientY - rect.top;

        const gridX = Math.floor(mouseX / this.tilesManager.tileSize) * this.tilesManager.tileSize;
        const gridY = Math.floor(mouseY / this.tilesManager.tileSize) * this.tilesManager.tileSize;

        this.tilesManager.removeTile(gridX, gridY);
    }

    drawEditor(ctx) {
        this.tilesManager.drawGrid(ctx, this.mapWidth, this.mapHeight);
        this.tilesManager.draw(ctx);
    }
}
import { EditorTiles } from "./editorTiles.js";
import { EditorExport } from "./editorExport.js";
import { EditorInit } from "./editorInit.js";
import { autosaveLevel } from "./editorSaving.js";

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

        document.getElementById("selectEnemy").onclick = () => {
            this.currentTool = "enemy";
            this.currentTileEl.textContent = "Enemy";
        };

        // Export button
        document.getElementById("exportBtn").onclick = () => {
            const spawn = this.tilesManager.getSpawnPoint();
            this.exporter.exportToJSON(this.tilesManager.tiles, spawn);
        };

        // Import button (hiển thị modal)
        document.getElementById("importBtn").onclick = () => {
            const modal = document.getElementById("importModal");
            modal.classList.remove("hidden");
            setTimeout(() => {
                modal.style.opacity = "1";
                modal.querySelector("div").classList.remove("scale-95");
                modal.querySelector("div").classList.add("scale-100");
            }, 10);
        };

        // Modal events
        document.getElementById("closeModalBtn").onclick = () => {
            const modal = document.getElementById("importModal");
            modal.style.opacity = "0";
            modal.querySelector("div").classList.remove("scale-100");
            modal.querySelector("div").classList.add("scale-95");
            setTimeout(() => modal.classList.add("hidden"), 500);
        };

        // Dev import (workspace)
        document.getElementById("importDevBtn").onclick = async () => {
            const levelName = prompt("Nhập tên file level (không cần .json):", "level1");
            if (!levelName) return;
            await this.importer.importLevel(levelName);
            document.getElementById("importModal").classList.add("hidden");
        };

        // Local import (từ máy tính)
        document.getElementById("importLocalBtn").onclick = () => {
            document.getElementById("fileInput").click();
        };

        // Khi chọn file JSON từ máy
        document.getElementById("fileInput").addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            await this.importer.importLocalFile(file);
            document.getElementById("importModal").classList.add("hidden");
            e.target.value = ""; // reset input
        });

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
                autosaveLevel(this.tilesManager);
                return;
            }
        }

        this.tilesManager.addTile(gridX, gridY, this.currentTool);
        autosaveLevel(this.tilesManager);
    }

    handleRightClick(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left + this.camera.x;
        const mouseY = e.clientY - rect.top;

        const gridX = Math.floor(mouseX / this.tilesManager.tileSize) * this.tilesManager.tileSize;
        const gridY = Math.floor(mouseY / this.tilesManager.tileSize) * this.tilesManager.tileSize;

        this.tilesManager.removeTile(gridX, gridY);
        autosaveLevel(this.tilesManager);
    }

    drawEditor(ctx) {
        this.tilesManager.drawGrid(ctx, this.mapWidth, this.mapHeight);
        this.tilesManager.draw(ctx);
    }
}
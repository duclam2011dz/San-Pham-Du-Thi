export class EditorTiles {
    constructor(tileSize = 50) {
        this.tileSize = tileSize;
        this.tiles = [];
    }

    addTile(x, y, type) {
        const exists = this.tiles.some(t => t.x === x && t.y === y);
        if (!exists) {
            this.tiles.push({ x, y, type, width: this.tileSize, height: this.tileSize });
        }
    }

    removeTile(x, y) {
        this.tiles = this.tiles.filter(t => !(t.x === x && t.y === y));
    }

    getSpawnPoint() {
        const spawn = this.tiles.find(t => t.type === "spawn");
        return spawn ? { x: spawn.x, y: spawn.y } : null;
    }

    draw(ctx) {
        for (let t of this.tiles) {
            ctx.fillStyle = t.type === "ground" ? "gray" : "limegreen";
            ctx.fillRect(t.x, t.y, t.width, t.height);
        }
    }

    drawGrid(ctx, mapWidth, mapHeight) {
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        for (let x = 0; x < mapWidth; x += this.tileSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, mapHeight);
            ctx.stroke();
        }
        for (let y = 0; y < mapHeight; y += this.tileSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(mapWidth, y);
            ctx.stroke();
        }
    }
}
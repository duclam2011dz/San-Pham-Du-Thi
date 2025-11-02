export class EditorExport {
    constructor() { }

    validate(tiles) {
        const checkpoints = tiles.filter(t => t.type === "spawn");
        if (checkpoints.length !== 1) {
            alert("⚠️ Map phải có đúng 1 checkpoint (điểm spawn)!");
            return false;
        }
        return true;
    }

    exportToJSON(tiles, spawnPoint) {
        if (!this.validate(tiles)) return;

        const data = {
            // Compact key version:
            // t = tile type, x, y, w = width, h = height, e = enemy
            t: tiles.map(tile => ({
                t: tile.type === "ground" ? "g" :
                    tile.type === "spawn" ? "s" :
                        "e",
                x: tile.x,
                y: tile.y,
                w: tile.width,
                h: tile.height,
            })),
            // Compact spawn (sx, sy)
            s: spawnPoint ? { sx: spawnPoint.x, sy: spawnPoint.y } : null,
            meta: {
                version: "1.1",
                exportedAt: new Date().toISOString(),
                tileCount: tiles.length,
            },
        };

        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "level_export.json";
        a.click();
        URL.revokeObjectURL(url);
    }
}
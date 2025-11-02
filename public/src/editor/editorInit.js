import { loadLevelJSON } from "../utils/sharedImport.js";

export class EditorInit {
    constructor(tilesManager) {
        this.tilesManager = tilesManager;
    }

    async importLevel(fileName) {
        try {
            const levelData = await loadLevelJSON(fileName);

            // Xóa map cũ trước khi load mới
            this.tilesManager.tiles = [];

            // Load ground tiles
            for (const t of levelData.platforms) {
                this.tilesManager.addTile(t.x, t.y, "ground");
            }

            // Load spawn
            if (levelData.spawn) {
                this.tilesManager.addTile(levelData.spawn.x, levelData.spawn.y, "spawn");
            }

            console.log(`✅ Đã import level: ${fileName}`);
        } catch (err) {
            console.error("❌ Lỗi import level:", err);
        }
    }
}
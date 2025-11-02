import { loadLevelJSON } from "../utils/sharedImport.js";
import { clearAutosave } from "./editorSaving.js";

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

    async importLocalFile(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);

            // Clear map cũ
            this.tilesManager.tiles = [];

            // Load ground tiles
            for (const t of data.t) {
                const type = t.t === "g" ? "ground" : "spawn";
                this.tilesManager.addTile(t.x, t.y, type);
            }

            // Load spawn
            if (data.s) {
                this.tilesManager.addTile(data.s.sx, data.s.sy, "spawn");
            }

            console.log(`✅ Đã import file local: ${file.name}`);
        } catch (err) {
            console.error("❌ Lỗi import local:", err);
            alert("File không hợp lệ hoặc bị hỏng!");
        }
    }

    autoloadFromSession() {
        try {
            const autosaveData = sessionStorage.getItem("editor_autosave_data");
            if (!autosaveData) return;

            if (confirm("🧩 Phát hiện bản autosave trước đó. Bạn có muốn khôi phục không?")) {
                const data = JSON.parse(autosaveData);

                this.tilesManager.tiles = [];

                for (const t of data.t) {
                    const type = t.t === "g" ? "ground" : "spawn";
                    this.tilesManager.addTile(t.x, t.y, type);
                }

                if (data.s) {
                    this.tilesManager.addTile(data.s.sx, data.s.sy, "spawn");
                }

                console.log("✅ Đã khôi phục level từ autosave sessionStorage");
            } else {
                clearAutosave(); // ✅ xóa dữ liệu nếu người dùng chọn "Không"
                console.log("❌ Người dùng từ chối khôi phục autosave, dữ liệu cũ đã bị xóa.");
            }
        } catch (err) {
            console.error("❌ Lỗi khi autoload autosave:", err);
        }
    }
}
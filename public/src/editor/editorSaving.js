// public/src/editor/editorSaving.js
export function autosaveLevel(tilesManager) {
    const autosaveEnabled = sessionStorage.getItem("editor_autosave") === "true";
    if (!autosaveEnabled) return;

    const tiles = tilesManager.tiles.map(tile => ({
        t: tile.type === "ground" ? "g" : "s",
        x: tile.x,
        y: tile.y,
        w: tile.width,
        h: tile.height,
    }));

    const spawn = tilesManager.getSpawnPoint();
    const jsonData = {
        t: tiles,
        s: spawn ? { sx: spawn.x, sy: spawn.y } : null,
    };

    sessionStorage.setItem("editor_autosave_data", JSON.stringify(jsonData));
    console.log("💾 Autosaved level vào sessionStorage");
}

export function clearAutosave() {
    sessionStorage.removeItem("editor_autosave_data");
    console.log("🗑️ Đã xóa dữ liệu autosave cũ khỏi sessionStorage");
}
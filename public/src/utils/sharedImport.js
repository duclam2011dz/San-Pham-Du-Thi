export async function loadLevelJSON(levelName) {
    try {
        const response = await fetch(`../assets/levels/${levelName}.json`);
        if (!response.ok) throw new Error(`Không thể tải level: ${levelName}`);
        const data = await response.json();

        // Giải mã JSON compact từ editorExport
        const tiles = data.t.map(t => ({
            type: t.t === "g" ? "ground" : "spawn",
            x: t.x,
            y: t.y,
            width: t.w,
            height: t.h,
        }));

        const platforms = tiles.filter(t => t.type === "ground");
        const spawn = data.s ? { x: data.s.sx, y: data.s.sy } : { x: 0, y: 0 };

        return { platforms, spawn, meta: data.meta || {} };
    } catch (err) {
        console.error("Lỗi khi load level:", err);
        return { platforms: [], spawn: { x: 0, y: 0 }, meta: {} };
    }
}
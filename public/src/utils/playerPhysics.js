// Gói toàn bộ logic vật lý: trọng lực, ma sát, va chạm + respawn khi rơi
export function applyPlayerPhysics(player, platforms, mapWidth, canvasHeight) {
    const gravity = player.gravity;
    const friction = 0.85; // ma sát ngang
    const respawnDelay = 500; // thời gian delay hồi sinh (ms)

    // Trọng lực
    player.dy += gravity;

    // Giảm tốc độ ngang dần nếu không bấm phím
    if (!player.movingHorizontally) player.dx *= friction;

    // Cập nhật vị trí
    player.x += player.dx;
    player.y += player.dy;

    // Giới hạn map ngang
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > mapWidth) player.x = mapWidth - player.width;

    // Reset trạng thái tiếp đất
    player.onGround = false;

    // Va chạm với platform
    for (let p of platforms) {
        const colliding =
            player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y < p.y + p.height &&
            player.y + player.height > p.y;

        if (colliding) {
            const playerBottom = player.y + player.height;
            const playerTop = player.y;
            const platformTop = p.y;
            const platformBottom = p.y + p.height;

            const overlapBottom = platformBottom - playerTop;
            const overlapTop = playerBottom - platformTop;

            // Nếu player rơi xuống platform
            if (overlapTop < overlapBottom && player.dy >= 0) {
                player.y = platformTop - player.height;
                player.dy = 0;
                player.onGround = true;
            }
            // Nếu player nhảy đụng đầu
            else if (player.dy < 0) {
                player.y = platformBottom;
                player.dy = 0;
            }
        }
    }

    // ========================
    // 🧨 Kiểm tra rơi khỏi màn hình
    // ========================
    if (player.y > canvasHeight + 200 && !player.respawning) {
        player.respawning = true;

        // "Chết" → tạm reset vận tốc
        player.dx = 0;
        player.dy = 0;

        // Respawn sau delay
        setTimeout(() => {
            if (player.spawnPoint) {
                player.x = player.spawnPoint.x;
                player.y = player.spawnPoint.y;
            } else {
                // Nếu chưa có spawnPoint (trường hợp dev test)
                player.x = 100;
                player.y = 100;
            }

            player.dx = 0;
            player.dy = 0;
            player.onGround = false;
            player.respawning = false;
        }, respawnDelay);
    }
}
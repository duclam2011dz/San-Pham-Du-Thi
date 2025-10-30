// Gói toàn bộ logic vật lý: trọng lực, ma sát, va chạm
export function applyPlayerPhysics(player, platforms, mapWidth) {
    const gravity = player.gravity;
    const friction = 0.85; // ma sát ngang

    // Trọng lực
    player.dy += gravity;

    // Giảm tốc độ ngang dần nếu không bấm phím
    if (!player.movingHorizontally) player.dx *= friction;

    // Cập nhật vị trí
    player.x += player.dx;
    player.y += player.dy;

    // Giới hạn trong map
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > mapWidth) player.x = mapWidth - player.width;

    // Reset trạng thái tiếp đất
    player.onGround = false;

    // Kiểm tra va chạm với các platform
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
}
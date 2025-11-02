# 🏃‍♂️ Chạy Trốn Khỏi Khu Tự Trị
> Một tựa game platformer 2D được phát triển bằng **HTML Canvas**, **Tailwind CSS**, và **JavaScript (ES6 Modules)**.  
> Dự án này được tạo ra từ đam mê lập trình, sáng tạo, và mong muốn xây dựng một thế giới ảo nơi sự tự do và bản lĩnh được thử thách.

---

## 🌌 Tổng quan dự án

**Chạy Trốn Khỏi Khu Tự Trị** là một game platformer 2D nơi người chơi điều khiển nhân vật vượt qua chướng ngại vật, né tránh hố sâu, và hướng tới tự do.

Phiên bản hiện tại (bản `prototype`) đã bao gồm:
- **Cơ chế di chuyển cơ bản** (trái, phải, nhảy)
- **Trọng lực & ma sát vật lý thực tế**
- **Camera scrollable** (theo dõi người chơi)
- **Respawn khi rơi xuống vực**
- **Editor tích hợp** để tạo, chỉnh sửa, export/import map JSON
- **Tự động load level từ file JSON**
- **Nền parallax background chuyên nghiệp**
- Cấu trúc dự án tách module, dễ mở rộng cho MVP & bản release sau này.

---

## 🌱 Branches

| Branch | Vai trò | Mô tả |
|:-------|:--------|:------|
| `prototype` | Bản nền đầu tiên | Hoàn thiện hệ thống core, editor, camera, respawn, và JSON. |
| `main` | Nhánh chính (ổn định) | Chứa mã nguồn đã kiểm thử, dùng làm nền để phát triển MVP. |
| `mvp` | Bản phát triển tính năng | Tiếp tục mở rộng gameplay, UI, hiệu ứng, HUD, hệ thống checkpoint và level manager. |

---

## 🚀 Roadmap – Bản **MVP**

### 🎮 Gameplay & Core
- [ ] Hệ thống **LevelManager** (chuyển level, checkpoint, restart)
- [ ] HUD hiển thị **số lần chết / mạng / level hiện tại**
- [ ] Thêm **hiệu ứng fade-in/out** khi respawn
- [ ] Cải thiện va chạm vật lý (độ chính xác pixel)
- [ ] Tích hợp **menu chính + chọn level**

### 🧠 Editor nâng cao
- [ ] Thêm **Import JSON trực quan** (dropdown + preview thumbnail)
- [ ] Cho phép **Import file local (.json)** qua drag & drop
- [ ] Hệ thống **autosave vào localStorage**
- [ ] Tùy chỉnh **parallax background & theme** trong editor

### 🪄 Hiệu ứng & mỹ thuật
- [ ] Hiệu ứng particle khi nhảy / va chạm
- [ ] Cải thiện background parallax nhiều lớp
- [ ] Thêm âm thanh (jump, death, checkpoint)
- [ ] Giao diện menu bằng Tailwind đẹp mắt hơn

### ⚙️ Dev & CI/CD
- [ ] Tự động build & deploy lên **GitHub Pages**
- [ ] Workflow GitHub Actions kiểm tra lint trước khi merge
- [ ] Tạo file `.gitattributes` để chuẩn hóa line endings
- [ ] Viết unit test cơ bản cho physics và import/export

---

## 📦 Yêu cầu hệ thống
- Trình duyệt hỗ trợ ES6 Modules (Chrome, Edge, Firefox mới)
- Không cần cài thêm backend hoặc NodeJS (chạy thẳng từ file HTML)
- TailwindCSS được link trực tiếp từ CDN

---

## ⚡ Cách chạy local
```bash
# Clone repo
git clone https://github.com/duclam2011dz/San-Pham-Du-Thi.git
cd San-Pham-Du-Thi

# Chạy game
open public/html/game.html

# Hoặc mở editor
open public/html/editor.html
```

---

## 💬 Ghi chú

> Dự án này được viết với tinh thần học hỏi và phát triển kỹ năng lập trình game web thực chiến.
> Mọi module được viết hướng đối tượng (OOP), có khả năng mở rộng thành engine game mini.

---

## ✨ Tác giả

Nguyễn Đức Lâm

> 14 tuổi – đam mê lập trình web game, sáng tạo, và thích tìm hiểu công nghệ.
> Dự án “Chạy Trốn Khỏi Khu Tự Trị” là bước đầu trong hành trình xây dựng game platformer độc lập.

---

## 📜 Giấy phép

Dự án được phát hành dưới giấy phép MIT License – bạn có thể sử dụng, chỉnh sửa, hoặc học tập từ mã nguồn thoải mái.
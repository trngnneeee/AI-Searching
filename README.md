# AI-Searching Maze Visualizer

Đây là project web trực quan hóa các thuật toán tìm kiếm đường đi trong mê cung (maze) sử dụng React, Next.js và Zustand. Bạn có thể tạo mê cung, chọn điểm bắt đầu/kết thúc, vẽ tường, và chạy các thuật toán tìm đường để xem trực quan quá trình tìm kiếm.

## Tính năng

- Tạo mê cung ngẫu nhiên hoặc tự vẽ tường, điểm bắt đầu (start), điểm kết thúc (goal)
- Hỗ trợ nhiều thuật toán tìm kiếm: DFS, BFS, UCS, A*, IDDFS, Bi-Directional Search, Beam Search, IDA*
- Hiển thị trực quan quá trình tìm kiếm và đường đi ngắn nhất
- Thống kê số node đã duyệt, độ dài đường đi, chi phí, thời gian xử lý
- So sánh kết quả các thuật toán bằng biểu đồ

## Công nghệ sử dụng

- **Next.js** (React)
- **Zustand** (quản lý state)
- **Chart.js** (vẽ biểu đồ)
- **Tailwind CSS** (giao diện)
- **React Icons**

## Cài đặt & chạy local

```bash
# Cài dependencies
yarn install

# Chạy client (web)
cd Web/client
yarn install
yarn dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để sử dụng ứng dụng.

## Cấu trúc thư mục

```
AI-Searching/
├── Web/
│   └── client/           # Source code web app (Next.js)
│       └── src/
│           └── app/
│               └── (pages)/
│                   └── (home)              # Trang menu
│                   └── analyse/            # Trang thống kê, biểu đồ
│                   └── game/               # Trang chính chơi maze
│                   └── team/               # Trang thông tin thành viên nhóm
│           └── store/                      # Zustand store
│           └── helpers/                    # Thuật toán tìm kiếm
├── README.md
```

## Đóng góp

- Fork và tạo pull request nếu bạn muốn đóng góp thêm thuật toán hoặc cải tiến giao diện!

---

**Sinh viên HCMUS - Cơ sở AI**
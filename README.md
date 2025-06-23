# 🧠 AI-Searching Maze Visualizer

**AI-Searching Maze Visualizer** là một ứng dụng web trực quan hóa quá trình tìm đường trong mê cung, được xây dựng bằng **React**, **Next.js** và **Zustand**. Người dùng có thể tương tác trực tiếp để tạo mê cung, vẽ tường, chọn điểm bắt đầu/kết thúc và quan sát quá trình các thuật toán tìm kiếm hoạt động.

---

## 🚀 Tính năng

* Tạo mê cung ngẫu nhiên hoặc tự vẽ tường, điểm start, goal
* Hỗ trợ nhiều thuật toán tìm đường:

  * DFS, BFS, UCS, A\*, IDDFS
  * Bi-Directional Search, Beam Search, IDA\*
* Hiển thị trực quan quá trình duyệt và tìm đường
* Thống kê:

  * Số node duyệt
  * Chi phí, độ dài đường đi
  * Thời gian xử lý
* So sánh kết quả các thuật toán qua biểu đồ (Chart.js)

---

## 📊 Công nghệ sử dụng

* **Next.js** (React)
* **Zustand** (State Management)
* **Chart.js** (Thống kê & Biểu đồ)
* **Tailwind CSS** (Thiết kế giao diện)
* **React Icons** (Biểu tượng giao diện)

---

## 📆 Cài đặt & Chạy local

```bash
# Tại root
$ yarn install

# Di chuyển đến folder giao diện
$ cd Web/client
$ yarn install
$ yarn dev
```

Sau đó, mở trình duyệt tại: [http://localhost:3000](http://localhost:3000)

---

## 📂 Cấu trúc thư mục

```
AI-Searching/
├── Web/
│   └── client/           # Source code web app (Next.js)
│       └── src/
│           └── app/
│               ├── (home)              # Trang menu chính
│               ├── analyse/            # Trang thống kê, biểu đồ
│               ├── game/               # Trang mê cung & thuật toán
│               ├── team/               # Trang giới thiệu nhóm
│           ├── store/                 # Zustand store
│           ├── helpers/               # Thuật toán tìm kiếm
├── README.md
```

---

## 🙌 Đóng góp

* Fork repo, tạo pull request để đóng góp thuật toán mới hoặc cải tiến giao diện.
* Chúc bạn có trải nghiệm thú vị!

---

**Sinh viên HCMUS - Cơ sở AI**

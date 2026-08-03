# MCP AI Bridge

MCP AI Bridge là cầu nối giữa:

- AndroStudio
- Termux
- MCP Server
- AI
- Git
- APKTool
- JADX
- ADB
- Frida

Toàn bộ hệ thống hoạt động theo kiến trúc:

```
AndroStudio
      │
      ▼
Node AI Bridge
      │
      ├── AI
      │
      └── MCP Server
                │
                ├── Shell
                ├── Git
                ├── APKTool
                ├── JADX
                ├── Search
                ├── Read File
                ├── Write File
                ├── ADB
                └── Frida
```

---

# Chức năng

- Chat AI
- AI phân tích project
- AI đọc file
- AI sửa file
- AI tạo patch
- AI build project
- AI tìm lỗi
- AI giải thích code
- Git Integration
- MCP Integration
- Workspace Memory

---

# Project Structure

```
mcp-ai-bridge/

config/

src/

scripts/

README.md
```

---

# Cài đặt

```bash
npm install
```

Khởi động

```bash
npm start
```

---

# API

```
POST /initialize

POST /chat

POST /analyze

POST /search

POST /edit

POST /build

POST /patch
```

---

# MCP

Bridge sẽ tự động kết nối tới

```
http://127.0.0.1:6767
```

---

# Workspace

Workspace mặc định lấy từ

```
PROJECT_HOME
```

---

# License

MIT


# 📝 Todo List App (React)

Aplikasi **Todo List** sederhana menggunakan React, yang memungkinkan pengguna untuk menambah, mengedit, menghapus, memilih, dan memperbarui status tugas (todo).

## 📌 Deskripsi

Aplikasi ini dirancang untuk membantu pengguna mengelola daftar tugas harian. Anda bisa menambahkan tugas baru, memperbarui status tugas menjadi "Selesai" atau "Belum", serta menghapus satu atau beberapa tugas sekaligus.

## 🎯 Fitur

- Tambah tugas baru dengan status "Belum" atau "Selesai"
- Edit tugas yang sudah ada
- Pilih beberapa tugas dan ubah status secara massal
- Hapus satu tugas atau beberapa sekaligus
- Hapus semua tugas sekaligus
- Indikator jumlah total, selesai, dan belum selesai
- UI responsif dan bersih dengan Tailwind CSS

## 📁 Struktur Folder

```
todo-app/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/                      # Folder untuk aset tambahan (jika ada)
│   ├── components/                 # Komponen Todo
│   │   ├── TodoActions.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoItem.jsx
│   │   ├── TodoList.jsx
│   │   └── TodoStats.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx                    # Entry point aplikasi
│
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Cara Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/Rafijohari18/lsp-todo-app/blob/master/README.md
cd todo-app
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Jalankan Aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` secara default (Vite).

## 👥 Kontributor

* Rafi Johari – *https://github.com/Rafijohari18*

---

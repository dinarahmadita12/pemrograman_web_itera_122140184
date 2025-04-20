# Aplikasi Manajemen Buku Personal

Aplikasi web untuk mengelola koleksi buku pribadi dengan fitur pencarian, filter, dan statistik.

## Deskripsi

Aplikasi ini memungkinkan pengguna untuk:
- Menambah, mengedit, dan menghapus buku
- Mencari buku berdasarkan judul atau penulis
- Memfilter buku berdasarkan status (Dimiliki, Sedang Dibaca, Wishlist)
- Menyimpan data secara lokal di browser

## Instalasi

1. Install dependensi:
   ```bash
   npm install
   ```
2. Jalankan aplikasi :
   ```bash
   npm run dev
   ```
3. Buka browser dan akses `http://localhost:5173`

## Screenshot antarmuka
1. Halaman Utama 
![halaman utama](https://github.com/user-attachments/assets/acdd8888-7589-4b5a-a13c-51f49b25843f)

2. Halaman Tambah Buku
![tambah buku](https://github.com/user-attachments/assets/40e8e18a-0a61-419f-8fd1-c7df8ca803b9)

3. Halaman Edit Buku
![edit buku](https://github.com/user-attachments/assets/81e1545e-1007-44fc-8dd2-90871e4f4269)


## Fitur React yang Digunakan

### 1. Hooks
- `useState`: Manajemen state lokal di komponen
- `useContext`: Manajemen state global aplikasi
- `useMemo`: Optimasi performa untuk kalkulasi dan filtering
- `useEffect`: Efek samping dan sinkronisasi dengan localStorage
- Custom hooks:
  - `useLocalStorage`: Persistensi data di localStorage
  - `useBookFilter`: Logika filtering buku

### 2. Context API
- `BookContext`: Menyediakan state global untuk data buku
- Implementasi CRUD operations untuk buku

### 3. React Router
- Routing untuk navigasi antar halaman
- Dynamic routing untuk halaman edit buku

## Struktur Folder

```
src/
├── __tests__/
│   ├── BookForm.test.tsx        # Pengujian untuk komponen BookForm
│   └── BookList.test.tsx        # Pengujian untuk komponen BookList
├── components/
│   ├── BookForm.tsx             # Form untuk menambah atau mengedit buku
│   ├── BookList.tsx             # Daftar buku yang ditampilkan dalam grid
│   └── SearchBar.tsx            # Komponen pencarian buku berdasarkan judul atau pengarang
├── context/
│   └── BookContext.tsx          # Context untuk mengelola state buku secara global
├── hooks/
│   ├── useBookFilter.ts         # Hook untuk memfilter buku berdasarkan status dan pencarian
│   └── useLocalStorage.ts       # Hook untuk menyimpan dan mengambil data dari localStorage
├── pages/
│   ├── EditPage.tsx             # Halaman untuk mengedit data buku
│   └── HomePage.tsx             # Halaman utama yang menampilkan daftar buku dan statistik
├── types/
│   └── book.ts                  # Tipe data untuk objek buku (judul, pengarang, status, dll.)
├── App.tsx                      # Komponen utama aplikasi yang mengatur seluruh halaman
├── index.css                    # Gaya CSS utama untuk aplikasi
├── main.tsx                     # Tempat React DOM di-render
└── index.html                   # Template HTML untuk aplikasi

```

## Komentar dalam kode untuk bagian penting
- Penggunaan `useState` untuk mengelola state lokal. Contoh di file useLocalStorage.ts
![Screenshot 2025-04-20 102708](https://github.com/user-attachments/assets/bd2f66c8-154a-4409-b40c-1b7688bd4540)

- Penggunaan `useEffect` untuk efek samping dan sinkronisasi dengan localStorage. Contoh di file useLocalStorage.ts
![Screenshot 2025-04-20 102800](https://github.com/user-attachments/assets/29d04f39-8019-4bc4-beb9-a6b353d8c7d9)

- Penggunaan `useMemo` untuk menghindari re-render yang tidak perlu. Contoh di file useBookFilter.ts
![Screenshot 2025-04-20 103239](https://github.com/user-attachments/assets/037c2d3d-eff8-4cb3-a319-9e87a767ff7b)

- Penggunaan Error Handling. Contoh di file useLocalStorage.ts
![Screenshot 2025-04-20 103446](https://github.com/user-attachments/assets/50437996-c53f-4f00-8fe1-3409593ce9ce)

## Testing

Aplikasi menggunakan Vitest dan React Testing Library untuk testing. Jalankan test dengan:

```bash
npm run test atau npm test
```

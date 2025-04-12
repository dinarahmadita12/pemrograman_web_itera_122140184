1. Penjelasan Singkat tentang Fungsi Aplikasi dan Fitur-fiturnya
Aplikasi ini adalah Personal Academic Dashboard yang dirancang untuk membantu mahasiswa mengelola jadwal kuliah, tugas, dan catatan mereka dalam satu platform terintegrasi. Aplikasi ini menyediakan fitur untuk menambah, mengedit, dan menghapus kelas, tugas, serta catatan pribadi. Dengan antarmuka yang sederhana dan responsif, mahasiswa dapat dengan mudah mengatur dan mengakses informasi akademik mereka secara efisien.
Fitur-fitur utama aplikasi:
•	Jadwal Kelas: Menyediakan kemampuan untuk menambahkan dan mengelola jadwal kuliah, termasuk hari, jam mulai dan berakhir, serta lokasi kelas.
•	Tugas: Memungkinkan pengguna untuk menambah, mengedit, dan menghapus tugas, serta mengatur tanggal jatuh tempo dan prioritas.
•	Catatan: Pengguna dapat menambahkan, mengedit, dan menghapus catatan pribadi dengan konten bebas.
•	Pengelolaan Data: Semua data kelas, tugas, dan catatan disimpan secara lokal menggunakan localStorage dan dapat dipulihkan ketika aplikasi dibuka kembali.
•	Tampilan Responsif: Aplikasi dirancang untuk bekerja dengan baik di berbagai perangkat, dari desktop hingga perangkat mobile.
2. Screenshot Aplikasi yang Sudah Jadi
Tampilan halaman utama 
 ![image](https://github.com/user-attachments/assets/81d0ae77-9f54-47ac-aeda-89243b50dfc9)






Pop up add class schedule
 
Pop up add assignment
 








Pop up add notes
 
Tampilan dengan mode responsif
 

3. Daftar Fitur ES6+ yang Diimplementasikan
1.	Arrow Functions
o	Diterapkan di file : app.js, assignments.js, classSchedule.js, notes.js
o	Contoh: Arrow function menggunakan sintaks () => {}
 
2.	Template Literals
o	Diterapkan di file : app.js, assignments.js, classSchedule.js, notes.js
o	Contoh: penggunaan backticks (`)
 
3.	Default Parameters
o	Diterapkan di file : assignments.js, classSchedule.js, notes.js
o	Contoh: memberikan nilai default pada parameter fungsi, dalam hal ini adalah "isEdit = false dan assignmentId = null"
 
4.	Promises & Async/Await
o	Diterapkan di file : mockData.js, app.js
o	Contoh: Async/Await untuk menangani operasi asynchronous dan Promises untuk menangani operasi yang membutuhkan waktu (seperti delay menggunakan setTimeout).
 
5.	Classes
o	Diterapkan di file : storage.js, app.js, assignments.js, classSchedule.js, notes.js
o	Contoh:
 
6.	Modules (import/export)
o	Diterapkan di file : app.js, assignments.js, classSchedule.js, notes.js, mockData.js, storage.js, utils.js
o	Contoh:
 
7.	Let & Const
o	Diterapkan di file : Semua file yang digunakan dalam aplikasi (termasuk app.js, storage.js, dll.)
o	Contoh: 
 
 
8.	Spread Operator (...)
o	Diterapkan di file : assignments.js, classSchedule.js, notes.js
o	Contoh: spread operator (...) untuk "menyebarkan" elemen-elemen dari array items ke dalam array baru. Artinya, semua elemen yang ada dalam items akan dimasukkan ke dalam array newItems
 
9.	Destructuring
o	Diterapkan di file : app.js
o	Contoh:
  
10.	Array Methods (map(), filter(), reduce())
o	Diterapkan di file : assignments.js, classSchedule.js, notes.js
o	Contoh:
 
 


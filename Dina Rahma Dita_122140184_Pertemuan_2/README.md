A. Penjelasan Singkat tentang Fungsi Aplikasi dan Fitur-fiturnya
Aplikasi ini adalah Personal Academic Dashboard yang dirancang untuk membantu mahasiswa mengelola jadwal kuliah, tugas, dan catatan mereka dalam satu platform terintegrasi. Aplikasi ini menyediakan fitur untuk menambah, mengedit, dan menghapus kelas, tugas, serta catatan pribadi. Dengan antarmuka yang sederhana dan responsif, mahasiswa dapat dengan mudah mengatur dan mengakses informasi akademik mereka secara efisien.
Fitur-fitur utama aplikasi:
•	Jadwal Kelas: Menyediakan kemampuan untuk menambahkan dan mengelola jadwal kuliah, termasuk hari, jam mulai dan berakhir, serta lokasi kelas.

•	Tugas: Memungkinkan pengguna untuk menambah, mengedit, dan menghapus tugas, serta mengatur tanggal jatuh tempo dan prioritas.

•	Catatan: Pengguna dapat menambahkan, mengedit, dan menghapus catatan pribadi dengan konten bebas.

•	Pengelolaan Data: Semua data kelas, tugas, dan catatan disimpan secara lokal menggunakan localStorage dan dapat dipulihkan ketika aplikasi dibuka kembali.

•	Tampilan Responsif: Aplikasi dirancang untuk bekerja dengan baik di berbagai perangkat, dari desktop hingga perangkat mobile.

B. Screenshot Aplikasi yang Sudah Jadi
   
a. Tampilan halaman utama 
![Screenshot 2025-04-12 165443](https://github.com/user-attachments/assets/ecbda374-becd-4115-950c-1380a22a661c)

b. Pop up add class schedule
![Screenshot 2025-04-12 165513](https://github.com/user-attachments/assets/c3ba7fb9-2f3b-4397-a348-436455ef51f9)

c. Pop up add assignment
![Screenshot 2025-04-12 165537](https://github.com/user-attachments/assets/e388bb1a-8d1c-4903-819c-174a0b8ea48e)

d. Pop up add notes
![Screenshot 2025-04-12 165603](https://github.com/user-attachments/assets/4dd08262-9aa8-4e58-aab8-5fe8081794a4)

 
e. Tampilan dengan mode responsif
 ![Screenshot 2025-04-12 174022](https://github.com/user-attachments/assets/a161dd01-21d8-49d9-a427-5169bb5508bd)

C. Daftar Fitur ES6+ yang Diimplementasikan

1.	Arrow Functions
   
   Diterapkan di file : app.js, assignments.js, classSchedule.js, notes.js
   
  	Contoh: Arrow function menggunakan sintaks () => {}
  	
 ![image](https://github.com/user-attachments/assets/77a95d36-b7bd-4319-b240-d2c4291cc616)

2. Template Literals
   
   Diterapkan di file : app.js, assignments.js, classSchedule.js, notes.js
   
  	Contoh: penggunaan backticks (`)

  	 ![image](https://github.com/user-attachments/assets/ba4d5f50-399d-4029-bd8a-c9caa31d441a)

4. Default Parameters
   
   Diterapkan di file : assignments.js, classSchedule.js, notes.js
   
  	Contoh: memberikan nilai default pada parameter fungsi, dalam hal ini adalah "isEdit = false dan assignmentId = null"

 ![image](https://github.com/user-attachments/assets/58c2d47a-a5c0-4bb3-97db-287bdb1ae3d9)

4. Promises & Async/Await

   Diterapkan di file : mockData.js, app.js
   
  	Contoh: Async/Await untuk menangani operasi asynchronous dan Promises untuk menangani operasi yang membutuhkan waktu (seperti delay menggunakan setTimeout).
 
 ![image](https://github.com/user-attachments/assets/2ae8cd68-6eac-4683-a698-a7a2bc213e78)

5. Classes
   
    Diterapkan di file : storage.js, app.js, assignments.js, classSchedule.js, notes.js
   
  	Contoh:

 ![image](https://github.com/user-attachments/assets/ce578445-340b-4d5b-8377-528037bc3755)

6. Modules (import/export)
   
    Diterapkan di file : app.js, assignments.js, classSchedule.js, notes.js, mockData.js, storage.js, utils.js
   
    Contoh:
 
 ![image](https://github.com/user-attachments/assets/561d9af2-8027-449c-a4a0-b5eb900425b5)

7. Let & Const
   
    Diterapkan di file : Semua file yang digunakan dalam aplikasi (termasuk app.js, storage.js, dll.)
   
    Contoh: 
 
 ![image](https://github.com/user-attachments/assets/b4bc7af4-ee08-45e3-9879-d4166e1cd1f9)

 ![image](https://github.com/user-attachments/assets/c68c6184-4c03-49fe-9ffa-a1d3bdf88c18)

8. Spread Operator (...)
   
    Diterapkan di file : assignments.js, classSchedule.js, notes.js
   
    Contoh: spread operator (...) untuk "menyebarkan" elemen-elemen dari array items ke dalam array baru. Artinya, semua elemen yang ada dalam items akan dimasukkan ke dalam array newItems
 
 ![image](https://github.com/user-attachments/assets/9db01135-b2d4-4fb1-b98c-b66a6bb02e20)

9. Destructuring
    
    Diterapkan di file : app.js
   
    Contoh:
  
  ![image](https://github.com/user-attachments/assets/bffce895-c1c3-46aa-87dc-eabf5ac33e1c)

10. Array Methods (map(), filter(), reduce())
    
    Diterapkan di file : assignments.js, classSchedule.js, notes.js
    
   	Contoh:
 
 ![image](https://github.com/user-attachments/assets/32d4b91f-21aa-4866-ab5f-661ac3e9d025)
 
 ![image](https://github.com/user-attachments/assets/323e42fa-e619-433a-b057-c8d9d22a1859)

 


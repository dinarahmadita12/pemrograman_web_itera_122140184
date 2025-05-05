from abc import ABC, abstractmethod

# ABSTRAK CLASS: LibraryItem adalah kelas abstrak yang mendefinisikan atribut dasar
# dan method abstrak `get_item_info()`, yang harus diimplementasikan oleh subclass.
class LibraryItem(ABC):
    def __init__(self, id, judul, penulis):
        self.id = id
        self.judul = judul
        self.penulis = penulis

    # ABSTRAK METHOD: Method ini harus diimplementasikan oleh subclass yang mewarisi LibraryItem
    @abstractmethod
    def get_item_info(self):
        pass

# INHERITANCE: Buku mewarisi dari LibraryItem dan mengimplementasikan method get_item_info()
class Buku(LibraryItem):
    def __init__(self, id, judul, penulis, genre):
        super().__init__(id, judul, penulis)
        self.__genre = genre  # ENCAPSULATION: genre diubah menjadi private (dengan double underscore)

    # POLYMORPHISM: Implementasi method get_item_info() yang berbeda di subclass Buku
    def get_item_info(self):
        return f"Buku ID: {self.id}, Judul: {self.judul}, Penulis: {self.penulis}, Genre: {self.__genre}"

    # ENCAPSULATION: Property untuk genre
    @property
    def genre(self):
        return self.__genre

    @genre.setter
    def genre(self, value):
        if value not in ['Fiksi', 'Non-Fiksi', 'Sci-Fi', 'Fantasi']:
            print("Genre tidak valid.")
        else:
            self.__genre = value

# INHERITANCE: Majalah mewarisi dari LibraryItem dan mengimplementasikan method get_item_info()
class Majalah(LibraryItem):
    def __init__(self, id, judul, penulis, nomor_terbit):
        super().__init__(id, judul, penulis)
        self.__nomor_terbit = nomor_terbit  

    def get_item_info(self):
        return f"Majalah ID: {self.id}, Judul: {self.judul}, Penulis: {self.penulis}, Terbit: {self.__nomor_terbit}"

# Kelas Perpustakaan untuk mengelola koleksi item
class Perpustakaan:
    def __init__(self):
        self.__koleksi = []   

    # Method untuk menambahkan item ke perpustakaan
    def tambah_item(self, item):
        if isinstance(item, LibraryItem): 
            self.__koleksi.append(item)

    # Method untuk menampilkan semua item
    def tampilkan_item(self):
        if not self.__koleksi:
            print("Tidak ada item di perpustakaan.")
        else:
            for item in self.__koleksi:
                print(item.get_item_info())

    # Method untuk mencari item berdasarkan judul atau id
    def cari_item(self, cari):
        item_ditemukan = [item for item in self.__koleksi if cari.lower() in item.judul.lower() or cari.lower() in str(item.id)]
        if item_ditemukan:
            for item in item_ditemukan:
                print(item.get_item_info())
        else:
            print("Item tidak ditemukan.")

# Program Utama untuk interaksi dengan pengguna
def main():
    perpustakaan = Perpustakaan()

    while True:
        print("\nMenu Perpustakaan:")
        print("1. Tambah item ke perpustakaan")
        print("2. Tampilkan daftar item")
        print("3. Cari item berdasarkan judul atau ID")
        print("4. Keluar")

        pilihan = input("Pilih menu (1/2/3/4): ")

        if pilihan == '1':
            print("\nMenambah item baru:")
            jenis_item = input("Masukkan jenis item (Buku/Majalah): ").strip().lower()
            id_item = int(input("Masukkan ID item: "))
            judul = input("Masukkan judul item: ").strip()
            penulis = input("Masukkan penulis item: ").strip()

            if jenis_item == 'buku':
                genre = input("Masukkan genre buku (Fiksi, Non-Fiksi, Sci-Fi, Fantasi): ").strip()
                buku = Buku(id_item, judul, penulis, genre)
                perpustakaan.tambah_item(buku)
                print(f"Buku '{judul}' telah ditambahkan ke perpustakaan.")
            elif jenis_item == 'majalah':
                nomor_terbit = input("Masukkan nomor terbit majalah: ").strip()
                majalah = Majalah(id_item, judul, penulis, nomor_terbit)
                perpustakaan.tambah_item(majalah)
                print(f"Majalah '{judul}' telah ditambahkan ke perpustakaan.")
            else:
                print("Jenis item tidak dikenal.")

        elif pilihan == '2':
            print("\nDaftar item di perpustakaan:")
            perpustakaan.tampilkan_item()

        elif pilihan == '3':
            cari = input("\nMasukkan judul atau ID item yang dicari: ").strip()
            perpustakaan.cari_item(cari)

        elif pilihan == '4':
            print("Terima kasih! Keluar dari program.")
            break

        else:
            print("Pilihan tidak valid. Silakan pilih menu yang benar.")

if __name__ == "__main__":
    main()

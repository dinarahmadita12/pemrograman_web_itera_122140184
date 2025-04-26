# Data mahasiswa dalam bentuk list of dictionaries
mahasiswa = [
    {'nama': 'Abe', 'nim': '1140001', 'nilai_uts': 75, 'nilai_uas': 80, 'nilai_tugas': 70},
    {'nama': 'Dina', 'nim': '1140089', 'nilai_uts': 85, 'nilai_uas': 90, 'nilai_tugas': 80},
    {'nama': 'Mila', 'nim': '1140191', 'nilai_uts': 65, 'nilai_uas': 70, 'nilai_tugas': 60},
    {'nama': 'Beni', 'nim': '1140200', 'nilai_uts': 55, 'nilai_uas': 60, 'nilai_tugas': 65},
    {'nama': 'Rahma', 'nim': '1140211', 'nilai_uts': 95, 'nilai_uas': 90, 'nilai_tugas': 85}
]

# Menghitung nilai akhir dan memberikan grade
for mhs in mahasiswa:
    # Hitung nilai akhir
    nilai_akhir = (0.3 * mhs['nilai_uts']) + (0.4 * mhs['nilai_uas']) + (0.3 * mhs['nilai_tugas'])
    mhs['nilai_akhir'] = nilai_akhir
    
    # Tentukan grade berdasarkan nilai akhir
    if nilai_akhir >= 80:
        mhs['grade'] = 'A'
    elif 70 <= nilai_akhir < 80:
        mhs['grade'] = 'B'
    elif 60 <= nilai_akhir < 70:
        mhs['grade'] = 'C'
    elif 50 <= nilai_akhir < 60:
        mhs['grade'] = 'D'
    else:
        mhs['grade'] = 'E'

# Menampilkan data mahasiswa dalam tabel
print(f"{'Nama':<10} {'NIM':<10} {'UTS':<10} {'UAS':<10} {'Tugas':<10} {'Nilai Akhir':<15} {'Grade':<10}")
for mhs in mahasiswa:
    print(f"{mhs['nama']:<10} {mhs['nim']:<10} {mhs['nilai_uts']:<10} {mhs['nilai_uas']:<10} {mhs['nilai_tugas']:<10} {mhs['nilai_akhir']:<15} {mhs['grade']:<10}")

# Menentukan mahasiswa dengan nilai tertinggi dan terendah
tertinggi = mahasiswa[0]
terendah = mahasiswa[0]
for mhs in mahasiswa:
    if mhs['nilai_akhir'] > tertinggi['nilai_akhir']:
        tertinggi = mhs
    if mhs['nilai_akhir'] < terendah['nilai_akhir']:
        terendah = mhs

# Menampilkan mahasiswa dengan nilai tertinggi dan terendah
print("\nMahasiswa dengan nilai tertinggi:")
print(f"Nama: {tertinggi['nama']}, NIM: {tertinggi['nim']}, Nilai Akhir: {tertinggi['nilai_akhir']}, Grade: {tertinggi['grade']}")

print("\nMahasiswa dengan nilai terendah:")
print(f"Nama: {terendah['nama']}, NIM: {terendah['nim']}, Nilai Akhir: {terendah['nilai_akhir']}, Grade: {terendah['grade']}")

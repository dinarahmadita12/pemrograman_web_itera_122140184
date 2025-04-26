# Mengimpor seluruh modul dan fungsi tertentu
import math_operations
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin

# Menggunakan fungsi dari modul math_operations
sisi_persegi = 5
panjang_persegi_panjang = 8
lebar_persegi_panjang = 4
jari_jari_lingkaran = 7
suhu_celsius = 25

# Menghitung luas dan keliling persegi
luas_persegi = math_operations.luas_persegi(sisi_persegi)
keliling_persegi = math_operations.keliling_persegi(sisi_persegi)

# Menghitung luas dan keliling persegi panjang
luas_persegi_panjang = math_operations.luas_persegi_panjang(panjang_persegi_panjang, lebar_persegi_panjang)
keliling_persegi_panjang = math_operations.keliling_persegi_panjang(panjang_persegi_panjang, lebar_persegi_panjang)

# Menghitung luas dan keliling lingkaran
luas_lingkaran = math_operations.luas_lingkaran(jari_jari_lingkaran)
keliling_lingkaran = math_operations.keliling_lingkaran(jari_jari_lingkaran)

# Konversi suhu
fahrenheit = celsius_ke_fahrenheit(suhu_celsius)
kelvin = celsius_ke_kelvin(suhu_celsius)

# Menampilkan hasil perhitungan
print(f"Luas Persegi: {luas_persegi} m²")
print(f"Keliling Persegi: {keliling_persegi} m")

print(f"Luas Persegi Panjang: {luas_persegi_panjang} m²")
print(f"Keliling Persegi Panjang: {keliling_persegi_panjang} m")

print(f"Luas Lingkaran: {luas_lingkaran} m²")
print(f"Keliling Lingkaran: {keliling_lingkaran} m")

print(f"Suhu {suhu_celsius}°C dalam Fahrenheit: {fahrenheit}°F")
print(f"Suhu {suhu_celsius}°C dalam Kelvin: {kelvin}K")

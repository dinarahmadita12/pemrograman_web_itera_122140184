from sqlalchemy import (
    Column,
    Integer,
    String,
    Text
)

from .meta import Base


class Matakuliah(Base):
    """ Model untuk tabel matakuliah """
    __tablename__ = 'matakuliah'
    
    id = Column(Integer, primary_key=True)  # Kolom id sebagai primary key
    kode_mk = Column(String(10), unique=True, nullable=False)  # Kolom kode_mk dengan tipe String dan batas panjang 10
    nama_mk = Column(String(100), nullable=False)  # Kolom nama_mk dengan tipe String dan panjang 100 karakter
    sks = Column(Integer, nullable=False)  # Kolom sks dengan tipe Integer
    semester = Column(String(20), nullable=False)  # Kolom semester dengan tipe String dan panjang 20 karakter

    def to_dict(self):
        """ Mengubah objek Matakuliah menjadi dictionary untuk JSON response """
        return {
            'id': self.id,
            'kode_mk': self.kode_mk,
            'nama_mk': self.nama_mk,
            'sks': self.sks,
            'semester': self.semester
        }

import { useMemo } from 'react';
import { Book, BookStatus } from '../types/book';

// Hook untuk memfilter daftar buku berdasarkan status dan query pencarian
export function useBookFilter(books: Book[], status: BookStatus | 'all', searchQuery: string) {
  return useMemo(() => {
    return books.filter((book) => {
      // Memeriksa apakah status buku cocok dengan status yang dipilih
      const matchesStatus = status === 'all' || book.status === status;

      // Memeriksa apakah judul atau pengarang buku mencocokkan query pencarian
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());

      // Mengembalikan buku yang sesuai dengan kondisi status dan pencarian
      return matchesStatus && matchesSearch;
    });
  }, [books, status, searchQuery]); // Fungsi useMemo Hanya menghitung ulang filter ketika books, status, atau searchQuery berubah
}

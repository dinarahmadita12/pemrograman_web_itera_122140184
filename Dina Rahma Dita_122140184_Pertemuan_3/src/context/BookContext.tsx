import React, { createContext, useContext, ReactNode } from 'react';
import { Book, BookStatus } from '../types/book';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface BookContextType {
  books: Book[]; // Daftar buku
  addBook: (book: Omit<Book, 'id' | 'createdAt'>) => void; // Fungsi untuk menambahkan buku baru (tanpa id dan createdAt)
  updateBook: (id: string, book: Partial<Book>) => void; // Fungsi untuk memperbarui buku berdasarkan id
  deleteBook: (id: string) => void; // Fungsi untuk menghapus buku berdasarkan id
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  // Menggunakan hook useLocalStorage untuk menyimpan dan mengambil data buku dari localStorage
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);

  // Fungsi untuk menambahkan buku baru
  const addBook = (book: Omit<Book, 'id' | 'createdAt'>) => {
    const newBook: Book = {
      ...book,
      id: crypto.randomUUID(), // Membuat id unik untuk buku baru
      createdAt: new Date().toISOString(), // Menyimpan tanggal pembuatan buku
    };
    setBooks([...books, newBook]); // Menambahkan buku baru ke dalam daftar buku
  };

  const updateBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, ...updatedBook } : book 
    ));
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}

// Hook untuk mengakses konteks BookContext
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider'); // Menangani error jika hook digunakan di luar BookProvider
  }
  return context;
}

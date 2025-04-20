import React, { useState } from 'react';
import { useBooks } from '../context/BookContext'; 
import { BookList } from '../components/BookList'; 
import { SearchBar } from '../components/SearchBar'; 
import { BookForm } from '../components/BookForm'; 
import { BookStatus } from '../types/book'; 
import { useBookFilter } from '../hooks/useBookFilter'; 
import { Library, BookOpen, BookMarked } from 'lucide-react'; 

export function HomePage() {
  const { books, addBook, deleteBook } = useBooks(); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [statusFilter, setStatusFilter] = useState<BookStatus | 'all'>('all'); 
  const [showForm, setShowForm] = useState(false); // State untuk menampilkan atau menyembunyikan form tambah buku

  const filteredBooks = useBookFilter(books, statusFilter, searchQuery); // Menggunakan hook untuk memfilter buku berdasarkan pencarian dan status

  // Menghitung jumlah buku berdasarkan status
  const stats = books.reduce(
    (acc, book) => {
      acc[book.status]++; // Menghitung jumlah buku per status
      return acc;
    },
    { owned: 0, reading: 0, wishlist: 0 }
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Book Collection</h1>
        <p className="text-gray-600">Keep track of your reading journey</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card p-6 flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 rounded-full">
            <Library className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Owned Books</p>
            <p className="text-2xl font-bold text-gray-900">{stats.owned}</p>
          </div>
        </div>
        <div className="card p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Currently Reading</p>
            <p className="text-2xl font-bold text-gray-900">{stats.reading}</p>
          </div>
        </div>

        <div className="card p-6 flex items-center space-x-4">
          <div className="p-3 bg-amber-100 rounded-full">
            <BookMarked className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Wishlist</p>
            <p className="text-2xl font-bold text-gray-900">{stats.wishlist}</p>
          </div>
        </div>
      </div>
      
      {/* Tombol untuk menampilkan atau menyembunyikan form tambah buku */}
      <div className="mb-8">
        <button
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary mb-4"
        >
          {showForm ? 'Hide Form' : '+ Add New Book'}
        </button>
        {showForm && (
          <div className="card">
            <BookForm onSubmit={(book) => {
              addBook(book); // Menambahkan buku baru ke dalam daftar
              setShowForm(false); // Sembunyikan form setelah buku ditambahkan
            }} />
          </div>
        )}
      </div>

      {/* Pencarian dan Filter */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as BookStatus | 'all')} 
            className="input-field sm:w-48"
          >
            <option value="all">All Books</option>
            <option value="owned">Owned</option>
            <option value="reading">Reading</option>
            <option value="wishlist">Wishlist</option>
          </select>
        </div>
      </div>

      {/* Menampilkan daftar buku yang difilter */}
      {filteredBooks.length > 0 ? (
        <BookList books={filteredBooks} onDelete={deleteBook} /> 
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found.</p> 
          <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}

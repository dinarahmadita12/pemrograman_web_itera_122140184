import React from 'react';
import PropTypes from 'prop-types';
import { Book } from '../types/book';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// Properti BookList menerima daftar buku (books) dan fungsi untuk menghapus buku (onDelete).
interface BookListProps {
  books: Book[]; // Daftar buku yang akan ditampilkan
  onDelete: (id: string) => void; // Fungsi untuk menghapus buku berdasarkan ID
}

export function BookList({ books, onDelete }: BookListProps) {
  // Fungsi untuk mendapatkan kelas status berdasarkan status buku (owned, reading, wishlist)
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'owned':
        return 'bg-emerald-100 text-emerald-800';
      case 'reading':
        return 'bg-blue-100 text-blue-800';
      case 'wishlist':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fungsi untuk memformat tanggal agar tampil dalam format yang mudah dibaca
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <div key={book.id} className="card p-6 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-4">{book.author}</p>
            <div className="flex items-center space-x-4 mb-4">
              <span className={`status-badge ${getStatusStyles(book.status)}`}>
                {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(book.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <Link
              to={`/edit/${book.id}`} 
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
              title="Edit book"
            >
              <Edit className="w-5 h-5" />
            </Link>
            <button
              onClick={() => onDelete(book.id)} 
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
              title="Delete book"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Validasi properti menggunakan PropTypes
BookList.propTypes = {
  books: PropTypes.arrayOf( 
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['owned', 'reading', 'wishlist']).isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired, 
};

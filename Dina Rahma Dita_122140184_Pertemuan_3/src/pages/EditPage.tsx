import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { useBooks } from '../context/BookContext'; 
import { BookForm } from '../components/BookForm'; 
import { ArrowLeft } from 'lucide-react'; 

export function EditPage() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate(); // Hook untuk melakukan navigasi
  const { books, updateBook } = useBooks(); 

  const book = books.find(b => b.id === id); // Mencari buku berdasarkan id yang diambil dari URL

  // Jika buku tidak ditemukan, tampilkan pesan error dan tombol untuk kembali ke halaman utama
  if (!book) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <p className="text-red-500 text-lg mb-4">Book not found</p> 
          <Link to="/" className="btn-primary inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link> 
        </div>
      </div>
    );
  }

  // Fungsi untuk menangani submit form, memperbarui buku, dan mengarahkan kembali ke halaman utama
  const handleSubmit = (updatedBook: Omit<typeof book, 'id' | 'createdAt'>) => {
    updateBook(book.id, updatedBook); // Memperbarui buku dengan data baru
    navigate('/'); // Navigasi kembali ke halaman utama setelah penyimpanan
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Book</h1>
      <BookForm
        onSubmit={handleSubmit}
        initialData={book} 
        buttonText="Save Changes" 
      />
    </div>
  );
}

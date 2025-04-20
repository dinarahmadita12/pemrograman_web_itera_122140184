import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Book, BookStatus } from '../types/book';
import { PlusCircle, Save, BookOpen, User } from 'lucide-react';

// Properti BookForm menerima onSubmit (fungsi untuk menangani submit), initialData (untuk data awal saat edit), 
// dan buttonText (untuk teks pada tombol).
interface BookFormProps {
  onSubmit: (book: Omit<Book, 'id' | 'createdAt'>) => void; 
  initialData?: Book; // Data awal buku jika sedang melakukan edit
  buttonText?: string; // Teks tombol, default-nya 'Add Book'
}

export function BookForm({ onSubmit, initialData, buttonText = 'Add Book' }: BookFormProps) {
  // State untuk menyimpan data form, diatur berdasarkan initialData jika ada
  const [formData, setFormData] = useState({
    title: initialData?.title || '', 
    author: initialData?.author || '', 
    status: initialData?.status || 'owned' as BookStatus, 
  });

  // State untuk menyimpan kesalahan validasi
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fungsi untuk memvalidasi inputan form
  const validate = () => {
    const newErrors: Record<string, string> = {}; 
    if (!formData.title.trim()) newErrors.title = 'Title is required'; 
    if (!formData.author.trim()) newErrors.author = 'Author is required'; 
    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; 
  };

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) { 
      onSubmit(formData); 
      if (!initialData) { 
        setFormData({ title: '', author: '', status: 'owned' }); 
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-6">
      <div>
        <label htmlFor="book-title" className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <BookOpen className="w-4 h-4 mr-2" />
          Book Title
        </label>
        <input
          id="book-title"
          type="text"
          value={formData.title} // Tampilkan nilai title dari formData
          onChange={(e) => setFormData({ ...formData, title: e.target.value })} // Update formData saat input berubah
          placeholder="Enter book title"
          className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`} // Menampilkan error jika ada
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>} 
      </div>

      <div>
        <label htmlFor="book-author" className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <User className="w-4 h-4 mr-2" />
          Author
        </label>
        <input
          id="book-author"
          type="text"
          value={formData.author} // Tampilkan nilai author dari formData
          onChange={(e) => setFormData({ ...formData, author: e.target.value })} // Update formData saat input berubah
          placeholder="Enter author name"
          className={`input-field ${errors.author ? 'border-red-500 focus:ring-red-500' : ''}`} // Menampilkan error jika ada
        />
        {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>} 
      </div>

      <div>
        <label htmlFor="book-status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select
          id="book-status"
          value={formData.status} // Tampilkan nilai status dari formData
          onChange={(e) => setFormData({ ...formData, status: e.target.value as BookStatus })} 
          className="input-field"
        >
          <option value="owned">Owned</option>
          <option value="reading">Currently Reading</option>
          <option value="wishlist">Wishlist</option>
        </select>
      </div>

      <button type="submit" className="btn-primary w-full flex items-center justify-center">
        {initialData ? <Save className="w-4 h-4 mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />} 
        {buttonText} 
      </button>
    </form>
  );
}

// PropTypes untuk validasi tipe properti
BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
  initialData: PropTypes.shape({
    id: PropTypes.string, 
    title: PropTypes.string, 
    author: PropTypes.string, 
    status: PropTypes.oneOf(['owned', 'reading', 'wishlist']), 
    createdAt: PropTypes.string, 
  }),
  buttonText: PropTypes.string, 
};

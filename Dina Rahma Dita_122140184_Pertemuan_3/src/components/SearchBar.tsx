import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

// Properti SearchBar menerima nilai pencarian dan fungsi untuk menangani perubahan (onChange).
interface SearchBarProps {
  value: string; // Nilai input pencarian
  onChange: (value: string) => void; 
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      
      <input
        type="text"
        value={value} // Nilai input berasal dari state 'value'
        onChange={(e) => onChange(e.target.value)} 
        placeholder="Search books by title or author..." 
        className="input-field pl-12" 
      />
    </div>
  );
}

// Validasi properti dengan PropTypes
SearchBar.propTypes = {
  value: PropTypes.string.isRequired, // value harus berupa string
  onChange: PropTypes.func.isRequired, // onChange harus berupa fungsi
};

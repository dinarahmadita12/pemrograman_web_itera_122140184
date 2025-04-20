import { useState, useEffect } from 'react';

// Hook untuk menyimpan dan mengambil data dari localStorage dengan tipe generik
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State untuk menyimpan nilai yang diambil dari localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Mencoba untuk mengambil item dari localStorage berdasarkan key
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue; // Jika item ada, parse dan kembalikan, jika tidak, gunakan initialValue
    } catch (error) {
      console.error(error); 
      return initialValue; 
    }
  });

  // Efek untuk menyimpan nilai ke localStorage setiap kali storedValue berubah
  useEffect(() => {
    try {
      // Menyimpan nilai ke localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error); 
    }
  }, [key, storedValue]); 

  return [storedValue, setStoredValue] as const;
}

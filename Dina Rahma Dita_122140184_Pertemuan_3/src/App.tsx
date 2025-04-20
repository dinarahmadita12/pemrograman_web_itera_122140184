import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import { HomePage } from './pages/HomePage';
import { EditPage } from './pages/EditPage';

function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </BookProvider>
  );
}

export default App;
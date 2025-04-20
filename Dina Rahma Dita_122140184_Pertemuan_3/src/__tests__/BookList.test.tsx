import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookList } from '../components/BookList';
import { BrowserRouter } from 'react-router-dom';

const mockBooks = [
  {
    id: '1',
    title: 'Test Book 1',
    author: 'Author 1',
    status: 'owned' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Test Book 2',
    author: 'Author 2',
    status: 'reading' as const,
    createdAt: new Date().toISOString(),
  },
];

describe('BookList', () => {
  it('renders all books', () => {
    render(
      <BrowserRouter>
        <BookList books={mockBooks} onDelete={() => {}} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    expect(screen.getByText('Test Book 2')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(
      <BrowserRouter>
        <BookList books={mockBooks} onDelete={onDelete} />
      </BrowserRouter>
    );
    
    const deleteButtons = screen.getAllByRole('button');
    fireEvent.click(deleteButtons[0]);
    
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
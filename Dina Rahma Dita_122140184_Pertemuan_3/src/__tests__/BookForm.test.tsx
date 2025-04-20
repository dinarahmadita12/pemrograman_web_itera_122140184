import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookForm } from '../components/BookForm';

describe('BookForm', () => {
  it('renders form fields correctly', () => {
    render(<BookForm onSubmit={() => {}} />);
    expect(screen.getByLabelText('Book Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Author')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<BookForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByRole('button'));
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/author is required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form data when valid', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Book Title'), { target: { value: 'Test Book' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'Test Author' } });
    fireEvent.click(screen.getByRole('button'));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Test Book',
      author: 'Test Author',
      status: 'owned',
    });
  });

  it('pre-fills form with initial data', () => {
    const initialData = {
      id: '1',
      title: 'Existing Book',
      author: 'Existing Author',
      status: 'reading' as const,
      createdAt: new Date().toISOString(),
    };

    render(<BookForm onSubmit={() => {}} initialData={initialData} />);
    
    expect(screen.getByLabelText('Book Title')).toHaveValue('Existing Book');
    expect(screen.getByLabelText('Author')).toHaveValue('Existing Author');
    expect(screen.getByLabelText('Status')).toHaveValue('reading');
  });
});
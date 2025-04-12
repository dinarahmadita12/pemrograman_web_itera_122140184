import { Storage } from '../storage.js';
import { generateId } from '../utils.js';

const noteStorage = new Storage('notes');

export const renderNotes = () => {
  const notes = noteStorage.getAll();
  const notesList = document.getElementById('notes-list');
  
  const sortedNotes = [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  notesList.innerHTML = sortedNotes.length === 0 ?
    `<div class="col-span-full text-center text-gray-500 py-4">No notes yet. Add your first note!</div>` :
    sortedNotes.map(note => `
      <div class="note-card bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow-sm fade-in">
        <div class="flex justify-between items-start">
          <h3 class="font-medium text-gray-900">${note.title}</h3>
          <span class="text-xs text-gray-500">${new Date(note.createdAt).toLocaleDateString()}</span>
        </div>
        <p class="text-gray-700 mt-2 whitespace-pre-wrap">${note.content}</p>
        <div class="flex justify-end mt-4 space-x-2">
          <button class="text-blue-600 hover:text-blue-900 text-sm edit-note" data-id="${note.id}">Edit</button>
          <button class="text-red-600 hover:text-red-900 text-sm delete-note" data-id="${note.id}">Delete</button>
        </div>
      </div>
    `).join('');
    
  addNoteEventListeners();
};

const addNoteEventListeners = () => {
  document.querySelectorAll('.edit-note').forEach(button => {
    button.addEventListener('click', () => showNoteModal(true, button.dataset.id));
  });
  
  document.querySelectorAll('.delete-note').forEach(button => {
    button.addEventListener('click', () => window.showDeleteConfirmation('note', button.dataset.id));
  });
};

export const showNoteModal = (isEdit = false, noteId = null) => {
  document.getElementById('note-modal-title').textContent = isEdit ? 'Edit Note' : 'Add Note';
  document.getElementById('note-modal').classList.remove('hidden');
  
  if (isEdit && noteId) {
    const note = noteStorage.getAll().find(n => n.id === noteId);
    if (note) {
      document.getElementById('note-id').value = note.id;
      document.getElementById('note-title').value = note.title;
      document.getElementById('note-content').value = note.content;
    }
  } else {
    document.getElementById('note-form').reset();
    document.getElementById('note-id').value = '';
  }
};

export const hideNoteModal = () => {
  document.getElementById('note-modal').classList.add('hidden');
  document.getElementById('note-form').reset();
};

export const saveNote = (event) => {
  event.preventDefault();
  
  const noteId = document.getElementById('note-id').value;
  const noteData = {
    title: document.getElementById('note-title').value,
    content: document.getElementById('note-content').value
  };
  
  if (noteId) {
    noteStorage.update(noteId, noteData);
  } else {
    noteData.id = generateId();
    noteData.createdAt = new Date().toISOString();
    noteStorage.add(noteData);
  }
  
  hideNoteModal();
  renderNotes();
};
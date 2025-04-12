class Storage {
  constructor(key) {
    this.key = key;
  }
  
  getAll() {
    try {
      const items = localStorage.getItem(this.key);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error(`Error getting items from localStorage: ${error}`);
      return [];
    }
  }
  
  add(item) {
    try {
      const items = this.getAll();
      const newItems = [...items, item];
      localStorage.setItem(this.key, JSON.stringify(newItems));
      return newItems;
    } catch (error) {
      console.error(`Error adding item to localStorage: ${error}`);
      return this.getAll();
    }
  }
  
  update(id, updatedItem) {
    try {
      const items = this.getAll();
      const newItems = items.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      );
      localStorage.setItem(this.key, JSON.stringify(newItems));
      return newItems;
    } catch (error) {
      console.error(`Error updating item in localStorage: ${error}`);
      return this.getAll();
    }
  }
  
  delete(id) {
    try {
      const items = this.getAll();
      const newItems = items.filter(item => item.id !== id);
      localStorage.setItem(this.key, JSON.stringify(newItems));
      return newItems;
    } catch (error) {
      console.error(`Error deleting item from localStorage: ${error}`);
      return this.getAll();
    }
  }
}

// Initial storage
const classStorage = new Storage('classSchedule');
const assignmentStorage = new Storage('assignments');
const noteStorage = new Storage('notes');

// Helper Functions
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Current Date and Time Display
const updateDateTime = () => {
  const now = new Date();
  document.getElementById('current-date').textContent = now.toLocaleDateString(undefined, 
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('current-time').textContent = now.toLocaleTimeString(undefined, 
    { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

// Delete Confirmation Variables and Functions
let currentDeleteInfo = { type: null, id: null };

const showDeleteConfirmation = (type, id) => {
  currentDeleteInfo = { type, id };
  
  let message = 'Are you sure you want to delete this item?';
  
  switch (type) {
    case 'class':
      const classItem = classStorage.getAll().find(c => c.id === id);
      message = `Are you sure you want to delete the class "${classItem.name}"?`;
      break;
    case 'assignment':
      const assignment = assignmentStorage.getAll().find(a => a.id === id);
      message = `Are you sure you want to delete the assignment "${assignment.title}"?`;
      break;
    case 'note':
      const note = noteStorage.getAll().find(n => n.id === id);
      message = `Are you sure you want to delete the note "${note.title}"?`;
      break;
  }
  
  document.getElementById('delete-message').textContent = message;
  document.getElementById('delete-modal').classList.remove('hidden');
};

const hideDeleteModal = () => {
  document.getElementById('delete-modal').classList.add('hidden');
  currentDeleteInfo = { type: null, id: null };
};

const confirmDelete = () => {
  const { type, id } = currentDeleteInfo;
  
  switch (type) {
    case 'class':
      classStorage.delete(id);
      renderClassSchedule();
      break;
    case 'assignment':
      assignmentStorage.delete(id);
      renderAssignments();
      break;
    case 'note':
      noteStorage.delete(id);
      renderNotes();
      break;
  }
  
  hideDeleteModal();
};

window.showDeleteConfirmation = showDeleteConfirmation;

// Class Schedule Functions
const renderClassSchedule = () => {
  const classes = classStorage.getAll();
  const classScheduleList = document.getElementById('class-schedule-list');
  
  // Sort classes(day and time)
  const dayOrder = { 'Senin': 1, 'Selasa': 2, 'Rabu': 3, 'Kamis': 4, 'Jumat': 5, 'Sabtu': 6, 'Minggu': 7 };
  const sortedClasses = [...classes].sort((a, b) => {
    if (dayOrder[a.day] !== dayOrder[b.day]) return dayOrder[a.day] - dayOrder[b.day];
    return a.startTime.localeCompare(b.startTime);
  });
  
  classScheduleList.innerHTML = sortedClasses.length === 0 ? 
    `<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No classes scheduled. Add your first class!</td></tr>` :
    sortedClasses.map(classItem => `
      <tr class="fade-in">
        <td class="px-6 py-4 whitespace-nowrap">${classItem.name}</td>
        <td class="px-6 py-4 whitespace-nowrap">${classItem.day}</td>
        <td class="px-6 py-4 whitespace-nowrap">${formatTime(classItem.startTime)} - ${formatTime(classItem.endTime)}</td>
        <td class="px-6 py-4 whitespace-nowrap">${classItem.location}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button class="text-blue-600 hover:text-blue-900 mr-3 edit-class" data-id="${classItem.id}">Edit</button>
          <button class="text-red-600 hover:text-red-900 delete-class" data-id="${classItem.id}">Delete</button>
        </td>
      </tr>
    `).join('');
  
  // Add event listeners
  document.querySelectorAll('.edit-class').forEach(button => {
    button.addEventListener('click', () => showClassModal(true, button.dataset.id));
  });
  
  document.querySelectorAll('.delete-class').forEach(button => {
    button.addEventListener('click', () => showDeleteConfirmation('class', button.dataset.id));
  });
};

const showClassModal = (isEdit = false, classId = null) => {
  document.getElementById('class-modal-title').textContent = isEdit ? 'Edit Class' : 'Add Class';
  document.getElementById('class-modal').classList.remove('hidden');
  
  if (isEdit && classId) {
    const classItem = classStorage.getAll().find(c => c.id === classId);
    if (classItem) {
      document.getElementById('class-id').value = classItem.id;
      document.getElementById('class-name').value = classItem.name;
      document.getElementById('class-day').value = classItem.day;
      document.getElementById('class-start-time').value = classItem.startTime;
      document.getElementById('class-end-time').value = classItem.endTime;
      document.getElementById('class-location').value = classItem.location;
    }
  } else {
    document.getElementById('class-form').reset();
    document.getElementById('class-id').value = '';
  }
};

const hideClassModal = () => {
  document.getElementById('class-modal').classList.add('hidden');
  document.getElementById('class-form').reset();
};

const saveClass = (event) => {
  event.preventDefault();
  
  const classId = document.getElementById('class-id').value;
  const classData = {
    name: document.getElementById('class-name').value,
    day: document.getElementById('class-day').value,
    startTime: document.getElementById('class-start-time').value,
    endTime: document.getElementById('class-end-time').value,
    location: document.getElementById('class-location').value
  };
  
  if (classId) {
    classStorage.update(classId, classData);
  } else {
    classData.id = generateId();
    classStorage.add(classData);
  }
  
  hideClassModal();
  renderClassSchedule();
};

// Assignment Functions
const renderAssignments = () => {
  const assignments = assignmentStorage.getAll();
  const assignmentsList = document.getElementById('assignments-list');
  
  // Sort assignments
  const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
  const sortedAssignments = [...assignments].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const dateComparison = new Date(a.dueDate) - new Date(b.dueDate);
    if (dateComparison !== 0) return dateComparison;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  assignmentsList.innerHTML = sortedAssignments.length === 0 ? 
    `<div class="text-center text-gray-500 py-4">No assignments yet. Add your first assignment!</div>` :
    sortedAssignments.map(assignment => `
      <div class="assignment-card border rounded-lg p-4 fade-in ${assignment.completed ? 'completed' : ''}">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center">
              <input type="checkbox" class="toggle-assignment mr-3" data-id="${assignment.id}" 
                ${assignment.completed ? 'checked' : ''}>
              <h3 class="font-medium text-gray-900 ${assignment.completed ? 'completed' : ''}">${assignment.title}</h3>
            </div>
            <p class="text-sm text-gray-600 mt-1">Course: ${assignment.course}</p>
            <p class="text-sm text-gray-600">Due: ${formatDate(assignment.dueDate)}</p>
          </div>
          <span class="text-xs px-2 py-1 rounded-full priority-${assignment.priority}">
            ${assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
          </span>
        </div>
        <div class="flex justify-end mt-4 space-x-2">
          <button class="text-blue-600 hover:text-blue-900 text-sm edit-assignment" data-id="${assignment.id}">Edit</button>
          <button class="text-red-600 hover:text-red-900 text-sm delete-assignment" data-id="${assignment.id}">Delete</button>
        </div>
      </div>
    `).join('');
  
  // Add event listeners
  document.querySelectorAll('.toggle-assignment').forEach(checkbox => {
    checkbox.addEventListener('change', () => toggleAssignment(checkbox.dataset.id, checkbox.checked));
  });
  
  document.querySelectorAll('.edit-assignment').forEach(button => {
    button.addEventListener('click', () => showAssignmentModal(true, button.dataset.id));
  });
  
  document.querySelectorAll('.delete-assignment').forEach(button => {
    button.addEventListener('click', () => showDeleteConfirmation('assignment', button.dataset.id));
  });
};

const showAssignmentModal = (isEdit = false, assignmentId = null) => {
  document.getElementById('assignment-modal-title').textContent = isEdit ? 'Edit Assignment' : 'Add Assignment';
  document.getElementById('assignment-modal').classList.remove('hidden');
  
  if (isEdit && assignmentId) {
    const assignment = assignmentStorage.getAll().find(a => a.id === assignmentId);
    if (assignment) {
      document.getElementById('assignment-id').value = assignment.id;
      document.getElementById('assignment-title').value = assignment.title;
      document.getElementById('assignment-course').value = assignment.course;
      document.getElementById('assignment-due-date').value = assignment.dueDate;
      document.getElementById('assignment-priority').value = assignment.priority;
    }
  } else {
    document.getElementById('assignment-form').reset();
    document.getElementById('assignment-id').value = '';
    document.getElementById('assignment-due-date').value = new Date().toISOString().split('T')[0];
  }
};

const hideAssignmentModal = () => {
  document.getElementById('assignment-modal').classList.add('hidden');
  document.getElementById('assignment-form').reset();
};

const saveAssignment = (event) => {
  event.preventDefault();
  
  const assignmentId = document.getElementById('assignment-id').value;
  const assignmentData = {
    title: document.getElementById('assignment-title').value,
    course: document.getElementById('assignment-course').value,
    dueDate: document.getElementById('assignment-due-date').value,
    priority: document.getElementById('assignment-priority').value,
    completed: assignmentId ? assignmentStorage.getAll().find(a => a.id === assignmentId)?.completed || false : false
  };
  
  if (assignmentId) {
    assignmentStorage.update(assignmentId, assignmentData);
  } else {
    assignmentData.id = generateId();
    assignmentStorage.add(assignmentData);
  }
  
  hideAssignmentModal();
  renderAssignments();
};

const toggleAssignment = (assignmentId, completed) => {
  assignmentStorage.update(assignmentId, { completed });
  renderAssignments();
};

// Notes Functions
const renderNotes = () => {
  const notes = noteStorage.getAll();
  const notesList = document.getElementById('notes-list');
  
  // Sort notes (created date)
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
  
  // Add event listeners
  document.querySelectorAll('.edit-note').forEach(button => {
    button.addEventListener('click', () => showNoteModal(true, button.dataset.id));
  });
  
  document.querySelectorAll('.delete-note').forEach(button => {
    button.addEventListener('click', () => showDeleteConfirmation('note', button.dataset.id));
  });
};

const showNoteModal = (isEdit = false, noteId = null) => {
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

const hideNoteModal = () => {
  document.getElementById('note-modal').classList.add('hidden');
  document.getElementById('note-form').reset();
};

const saveNote = (event) => {
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

const loadMockData = async () => {
  if (classStorage.getAll().length === 0 && 
      assignmentStorage.getAll().length === 0 && 
      noteStorage.getAll().length === 0) {
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample data
      const sampleClasses = [
        {
          id: generateId(),
          name: "Pemrograman Web",
          day: "Kamis",
          startTime: "09:30",
          endTime: "12:00",
          location: "GK2-307"
        },
        {
          id: generateId(),
          name: "Pengembangan Aplikasi Mobile",
          day: "Selasa",
          startTime: "07:30",
          endTime: "09:30",
          location: "GK2-306"
        }
          ];
      
      const sampleAssignments = [
        {
          id: generateId(),
          title: "Praktikum Pemweb 2",
          course: "Pemweb",
          dueDate: "2025-11-13",
          priority: "high",
          completed: false
        }
      ];
      
      const sampleNotes = [
        {
          id: generateId(),
          title: "Hari selasa UTS KWU",
          content: "Ingat untuk belajar",
          createdAt: new Date().toISOString()
        }
      ];
      
      // Save sample data to localStorage
      localStorage.setItem('classSchedule', JSON.stringify(sampleClasses));
      localStorage.setItem('assignments', JSON.stringify(sampleAssignments));
      localStorage.setItem('notes', JSON.stringify(sampleNotes));
      
      console.log("Sample data loaded successfully!");
    } catch (error) {
      console.error("Error loading sample data:", error);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setInterval(updateDateTime, 1000);
  updateDateTime();
  
  // Initial render
  renderClassSchedule();
  renderAssignments();
  renderNotes();
  
  // Class Schedule Event Listeners
  document.getElementById('add-class-btn').addEventListener('click', () => showClassModal());
  document.getElementById('class-cancel-btn').addEventListener('click', hideClassModal);
  document.getElementById('class-form').addEventListener('submit', saveClass);
  
  // Assignment Event Listeners
  document.getElementById('add-assignment-btn').addEventListener('click', () => showAssignmentModal());
  document.getElementById('assignment-cancel-btn').addEventListener('click', hideAssignmentModal);
  document.getElementById('assignment-form').addEventListener('submit', saveAssignment);
  
  // Note Event Listeners
  document.getElementById('add-note-btn').addEventListener('click', () => showNoteModal());
  document.getElementById('note-cancel-btn').addEventListener('click', hideNoteModal);
  document.getElementById('note-form').addEventListener('submit', saveNote);
  
  // Delete Event Listeners
  document.getElementById('delete-cancel-btn').addEventListener('click', hideDeleteModal);
  document.getElementById('delete-confirm-btn').addEventListener('click', confirmDelete);
  
  loadMockData();
});
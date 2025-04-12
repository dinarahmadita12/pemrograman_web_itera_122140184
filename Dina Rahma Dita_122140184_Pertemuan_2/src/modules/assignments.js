import { Storage } from '../storage.js';
import { generateId, formatDate } from '../utils.js';

const assignmentStorage = new Storage('assignments');

export const renderAssignments = () => {
  const assignments = assignmentStorage.getAll();
  const assignmentsList = document.getElementById('assignments-list');
  
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
    
  addAssignmentEventListeners();
};

const addAssignmentEventListeners = () => {
  document.querySelectorAll('.toggle-assignment').forEach(checkbox => {
    checkbox.addEventListener('change', () => toggleAssignment(checkbox.dataset.id, checkbox.checked));
  });
  
  document.querySelectorAll('.edit-assignment').forEach(button => {
    button.addEventListener('click', () => showAssignmentModal(true, button.dataset.id));
  });
  
  document.querySelectorAll('.delete-assignment').forEach(button => {
    button.addEventListener('click', () => window.showDeleteConfirmation('assignment', button.dataset.id));
  });
};

export const showAssignmentModal = (isEdit = false, assignmentId = null) => {
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

export const hideAssignmentModal = () => {
  document.getElementById('assignment-modal').classList.add('hidden');
  document.getElementById('assignment-form').reset();
};

export const saveAssignment = (event) => {
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

export const toggleAssignment = (assignmentId, completed) => {
  assignmentStorage.update(assignmentId, { completed });
  renderAssignments();
};
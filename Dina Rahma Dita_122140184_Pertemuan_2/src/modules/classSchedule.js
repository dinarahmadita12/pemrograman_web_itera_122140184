import { Storage } from '../storage.js';
import { generateId, formatTime } from '../utils.js';

const classStorage = new Storage('classSchedule');

export const renderClassSchedule = () => {
  const classes = classStorage.getAll();
  const classScheduleList = document.getElementById('class-schedule-list');
  
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
    
  addClassEventListeners();
};

const addClassEventListeners = () => {
  document.querySelectorAll('.edit-class').forEach(button => {
    button.addEventListener('click', () => showClassModal(true, button.dataset.id));
  });
  
  document.querySelectorAll('.delete-class').forEach(button => {
    button.addEventListener('click', () => window.showDeleteConfirmation('class', button.dataset.id));
  });
};

export const showClassModal = (isEdit = false, classId = null) => {
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

export const hideClassModal = () => {
  document.getElementById('class-modal').classList.add('hidden');
  document.getElementById('class-form').reset();
};

export const saveClass = (event) => {
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
import { Storage } from '../storage.js';
import { generateId } from '../utils.js';

export const loadMockData = async () => {
  const classStorage = new Storage('classSchedule');
  const assignmentStorage = new Storage('assignments');
  const noteStorage = new Storage('notes');
  
  if (classStorage.getAll().length === 0 && 
      assignmentStorage.getAll().length === 0 && 
      noteStorage.getAll().length === 0) {
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
          dueDate: "2025-04-13",
          priority: "high",
          completed: false
        },
      ];
      
      const sampleNotes = [
        {
          id: generateId(),
          title: "Hari selasa UTS KWU",
          content: "Ingat untuk belajar",
          createdAt: new Date().toISOString()
        }
      ];
      
      localStorage.setItem('classSchedule', JSON.stringify(sampleClasses));
      localStorage.setItem('assignments', JSON.stringify(sampleAssignments));
      localStorage.setItem('notes', JSON.stringify(sampleNotes));
      
      console.log("Sample data loaded successfully!");
    } catch (error) {
      console.error("Error loading sample data:", error);
    }
  }
};
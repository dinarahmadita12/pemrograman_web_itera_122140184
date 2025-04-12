export class Storage {
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
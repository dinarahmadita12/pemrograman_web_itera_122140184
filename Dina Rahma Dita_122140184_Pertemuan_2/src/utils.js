export const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const updateDateTime = () => {
  const now = new Date();
  document.getElementById('current-date').textContent = now.toLocaleDateString(undefined, 
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('current-time').textContent = now.toLocaleTimeString(undefined, 
    { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};
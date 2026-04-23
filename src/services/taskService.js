import api from './api';

export async function getTasks() {
  const response = await api.get('/tasks');
  return response.data;
}

export async function createTask(taskData) {
  const response = await api.post('/tasks', taskData);
  return response.data;
}

export async function deleteTask(id) {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
}

export async function updateTask(id, taskData) {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
}
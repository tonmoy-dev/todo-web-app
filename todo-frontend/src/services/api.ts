import axios from 'axios';
import type { Todo, TodoCreate, TodoUpdate } from '../types/todo';

const API_BASE_URL = 'http://localhost:8000/api/todos/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoService = {
  /**
   * Fetch all todos
   */
  getTodos: async (): Promise<Todo[]> => {
    const response = await api.get('');
    return response.data;
  },

  /**
   * Fetch a single todo by ID
   */
  getTodo: async (id: number): Promise<Todo> => {
    const response = await api.get(`${id}/`);
    return response.data;
  },

  /**
   * Create a new todo
   */
  createTodo: async (todo: TodoCreate): Promise<Todo> => {
    const response = await api.post('', todo);
    return response.data;
  },

  /**
   * Update an existing todo (Partial update)
   */
  updateTodo: async (id: number, todo: TodoUpdate): Promise<Todo> => {
    const response = await api.patch(`${id}/`, todo);
    return response.data;
  },

  /**
   * Delete a todo
   */
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`${id}/`);
  },
};

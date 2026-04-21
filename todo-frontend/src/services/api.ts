import axios from 'axios';
import type { Todo, TodoCreate, TodoUpdate } from '../types/todo';

const API_BASE_URL = 'http://localhost:8000/todos/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoService = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await api.get('');
    return response.data;
  },

  createTodo: async (todo: TodoCreate): Promise<Todo> => {
    const response = await api.post('', todo);
    return response.data;
  },

  updateTodo: async (id: number, todo: TodoUpdate): Promise<Todo> => {
    const response = await api.put(`${id}/`, todo);
    return response.data;
  },

  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`${id}/`);
  },
};

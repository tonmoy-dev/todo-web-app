# Development Guidelines: Frontend & Backend Integration

This document outlines how the React frontend communicates with the Django REST Framework (DRF) backend and how to perform CRUD operations.

## 1. Connection Architecture

### How they connect
- **Backend:** Runs on `http://localhost:8000`. It serves as a JSON API.
- **Frontend:** Runs on `http://localhost:5173`. It makes asynchronous HTTP requests to the backend.
- **CORS (Cross-Origin Resource Sharing):** The backend is configured to allow requests from the frontend origin. This is handled by `django-cors-headers` in the Django settings.

### API Base URL
The frontend uses a centralized configuration in `src/services/api.ts` to define the base URL:
```typescript
const API_BASE_URL = 'http://localhost:8000/api/todos/';
```

---

## 2. CRUD Operations (Frontend)

Use the `todoService` located in `src/services/api.ts` to perform data operations.

### **Read** (Get all Todos)
Fetches the list of todos from the backend.
```tsx
import { todoService } from '../services/api';

const fetchTodos = async () => {
  try {
    const data = await todoService.getTodos();
    console.log('Todos:', data);
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};
```

### **Create** (Add a new Todo)
Sends a POST request with the new todo data.
```tsx
const addNewTodo = async () => {
  const newTodo = {
    title: "New Task",
    description: "Task details...",
    is_active: true
  };
  
  const savedTodo = await todoService.createTodo(newTodo);
  console.log('Saved:', savedTodo);
};
```

### **Update** (Modify an existing Todo)
Sends a PUT request to a specific ID.
```tsx
const updateTodo = async (id: number) => {
  const updatedData = { is_active: false };
  const result = await todoService.updateTodo(id, updatedData);
  console.log('Updated:', result);
};
```

### **Delete** (Remove a Todo)
Sends a DELETE request to a specific ID.
```tsx
const removeTodo = async (id: number) => {
  await todoService.deleteTodo(id);
  console.log('Todo deleted');
};
```

---

## 3. Best Practices
1. **Async/Await:** Always use `async/await` with `try/catch` to handle API errors gracefully.
2. **State Management:** After a successful Create/Update/Delete operation, update your local React state to reflect the changes immediately or re-fetch the list.
3. **Typing:** Use the TypeScript interfaces defined in `src/types/todo.ts` to ensure data consistency.
4. **Environment Variables:** In a production environment, move the `API_BASE_URL` to a `.env` file instead of hardcoding it.

## 4. Backend-Frontend Mapping

| Action | HTTP Method | Endpoint | DRF View Class |
| :--- | :--- | :--- | :--- |
| List Todos | `GET` | `/api/todos/` | `TodoListCreateView` |
| Create Todo | `POST` | `/api/todos/` | `TodoListCreateView` |
| Get Single | `GET` | `/api/todos/{id}` | `TodoDetailView` |
| Update | `PUT` | `/api/todos/{id}` | `TodoDetailView` |
| Delete | `DELETE` | `/api/todos/{id}` | `TodoDetailView` |

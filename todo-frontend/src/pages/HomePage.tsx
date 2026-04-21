import React, { useState, useEffect } from 'react';
import { todoService } from '../services/api';
import type { Todo, TodoCreate } from '../types/todo';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
// Removed unused Layout import

const HomePage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);


  useEffect(() => {
    let ignore = false;

    const startFetching = async () => {
      try {
        const data = await todoService.getTodos();
        if (!ignore) {
          setTodos(data);
          setLoading(false);
        }
      } catch (error) {
        if (!ignore) {
          console.error('Failed to fetch todos:', error);
          setLoading(false);
        }
      }
    };

    startFetching();

    return () => {
      ignore = true;
    };
  }, []);

  const handleCreateOrUpdate = async (todoData: TodoCreate) => {
    try {
      if (editingTodo) {
        const updated = await todoService.updateTodo(editingTodo.id, todoData);
        setTodos(todos.map((t) => (t.id === editingTodo.id ? updated : t)));
        setEditingTodo(null);
      } else {
        const created = await todoService.createTodo(todoData);
        setTodos([created, ...todos]);
      }
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleToggleStatus = async (todo: Todo) => {
    try {
      const updated = await todoService.updateTodo(todo.id, {
        is_active: !todo.is_active,
      });
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    } catch (error) {
      console.error('Toggle failed:', error);
    }
  };

  return (
    <div className="home-page">
      <header>
        <h1>Task Master</h1>
      </header>

      <TodoForm
        key={editingTodo?.id || 'new'}
        onSubmit={handleCreateOrUpdate}
        initialData={editingTodo}
        onCancel={editingTodo ? () => setEditingTodo(null) : undefined}
      />

      <div className="todo-list">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            Your Tasks ({todos.length})
          </h2>
          {loading && <div className="loading-spinner" style={{ width: '1rem', height: '1rem', margin: 0 }} />}
        </div>

        {todos.length === 0 && !loading ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', margin: 0 }}>No tasks found. Start by creating one above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onEdit={setEditingTodo}
              onToggleStatus={handleToggleStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onToggleStatus: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit, onToggleStatus }) => {
  return (
    <div className={`glass-card todo-item ${!todo.is_active ? 'completed' : ''}`}>
      <div className="todo-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => onToggleStatus(todo)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: todo.is_active ? 'var(--text-muted)' : 'var(--accent-success)' }}
          >
            {todo.is_active ? <Circle size={20} /> : <CheckCircle size={20} />}
          </button>
          <h3 className="todo-title">{todo.title}</h3>
          <span className={`todo-status ${todo.is_active ? 'status-active' : 'status-inactive'}`}>
            {todo.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
        {todo.description && <p className="todo-description">{todo.description}</p>}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          className="btn btn-ghost"
          onClick={() => onEdit(todo)}
          title="Edit"
          style={{ padding: '0.5rem' }}
        >
          <Edit2 size={18} />
        </button>
        <button
          className="btn btn-ghost btn-danger"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this task?')) {
              onDelete(todo.id);
            }
          }}
          title="Delete"
          style={{ padding: '0.5rem' }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

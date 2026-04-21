import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import type { Todo, TodoCreate } from '../types/todo';

interface TodoFormProps {
  onSubmit: (todo: TodoCreate) => Promise<void>;
  initialData?: Todo | null;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        title,
        description,
        is_active: isActive,
      });
      if (!initialData) {
        setTitle('');
        setDescription('');
        setIsActive(true);
      }
    } catch (error) {
      console.error('Failed to submit todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem' }}>
        {initialData ? 'Edit Task' : 'Create New Task'}
      </h2>

      <div className="input-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add some details..."
          rows={3}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="checkbox"
          id="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          style={{ width: 'auto', margin: 0 }}
        />
        <label htmlFor="isActive" style={{ cursor: 'pointer' }}>Mark as Active</label>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ flex: 1 }}>
          {isSubmitting ? (
            <div className="loading-spinner" style={{ width: '1rem', height: '1rem', margin: 0 }} />
          ) : initialData ? (
            <><Save size={18} /> Update Task</>
          ) : (
            <><Plus size={18} /> Add Task</>
          )}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-ghost">
            <X size={18} /> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;

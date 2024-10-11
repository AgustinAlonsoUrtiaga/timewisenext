"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTask } from '@/services/taskService';
import '../styles/CreateTask.css';
import { useAppContext } from '@/context/AppContext';
import useAuth from '../middleware/authMiddleware';

const CreateTask = () => {
  const router = useRouter();
  const { env } = useAppContext();
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null;
  }
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    priority: 3,
    status: 'To Do',
    dueDate: '',
    environment: env || 'SMP CH TEST'
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(formData);
      router.push('/tasks'); // Redirige a la lista de tareas después de crear la tarea
    } catch (error) {
      setError('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="create-task-container">
      <h2>Create a New Task</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-task-form">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
          className="form-input"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="form-textarea"
        />
        <input
          type="number"
          name="estimatedTime"
          value={formData.estimatedTime}
          onChange={handleChange}
          placeholder="Estimated Time (hours)"
          required
          className="form-input"
          min="0.1"
          step="0.1"
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="form-select"
        >
          <option value="1">Priority 1 (High)</option>
          <option value="2">Priority 2</option>
          <option value="3">Priority 3 (Normal)</option>
          <option value="4">Priority 4</option>
          <option value="5">Priority 5 (Low)</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="form-input"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-select"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <select
          name="environment"
          value={formData.environment}
          onChange={handleChange}
          className="form-select"
        >
          <option value="SMP CH TEST">SMP CH TEST</option>
          <option value="SMP CH PROD">SMP CH PROD</option>
          <option value="SMP US TEST">SMP US TEST</option>
          <option value="SMP US PROD">SMP US PROD</option>
        </select>
        <button type="submit" className="submit-button">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
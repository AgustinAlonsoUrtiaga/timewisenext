"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/services/taskService";
import "../styles/CreateTask.css";
import { useAppContext } from "@/context/AppContext";
import useAuth from "../middleware/authMiddleware";

const CreateTask = () => {
  const router = useRouter();
  const { env } = useAppContext();
  const isAuthenticated = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    priority: 3,
    status: 'To Do',
    dueDate: '',
    environment: env || 'Server 1',
  });
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(formData);
      router.push('/tasks');
    } catch (error) {
      setError('Failed to create task. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div className="create-task-container">
      <h2>Create a New Task</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="estimatedTime">Estimated Time (hours)</label>
          <input
            type="number"
            id="estimatedTime"
            name="estimatedTime"
            value={formData.estimatedTime}
            onChange={handleChange}
            placeholder="Estimated Time (hours)"
            required
            className="form-input"
            min="0.1"
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
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
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="environment">Environment</label>
          <select
            id="environment"
            name="environment"
            value={formData.environment}
            onChange={handleChange}
            className="form-select"
          >
            <option value="SERVER 1">SERVER 1</option>
            <option value="SERVER 2">SERVER 2</option>
            <option value="SERVER 3">SERVER 3</option>
            <option value="SERVER 4">SERVER 4</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
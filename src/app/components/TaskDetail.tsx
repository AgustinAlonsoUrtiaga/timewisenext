"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { deleteTask, getTaskById } from '@/services/taskService';
import '../styles/TaskDetail.css';
import useAuth from '../middleware/authMiddleware';

interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  timeUnit: string;
  status: string;
  priority: number;
  createdDate: string;
  dueDate: string;
  urgent: boolean;
}

const TaskDetail: React.FC = () => {
  const isAuthenticated = useAuth();
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
        setEditedTask(data);
      } catch (error) {
        setError('Error fetching task data');
        console.error('Failed to fetch task', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      router.push('/tasks');
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const priorityClass = `priority-${task?.priority || 3}`; // Default to priority 3 if not defined

  if (!isAuthenticated) {
    router.push('/auth'); // Redirect to the login page if not authenticated.
    return null;
  }

  if (loading) return <p>Loading task details...</p>;
  if (error) return <p>{error}</p>;

  if (!task) {
    return <p>No task found.</p>;
  }

  return (
    <div className="task-detail">
      <div className={`task-detail-card ${priorityClass}`}>
        {isEditing ? (
          <form className="task-edit-form">
            {/* Editable fields go here */}
          </form>
        ) : (
          <>
            <h2>{task.title}</h2>
            <p className="task-detail-description">{task.description}</p>
            <div className="task-info">
              <div className="task-info-item">
                <span className="task-info-label">Status:</span>
                <span className="task-info-value">{task.status}</span>
              </div>
              <div className="task-info-item">
                <span className="task-info-label">Estimated Time:</span>
                <span className="task-info-value">
                  {task.estimatedTime} {task.timeUnit}
                </span>
              </div>
              <div className="task-info-item">
                <span className="task-info-label">Priority:</span>
                <span className="task-info-value">{task.priority}</span>
              </div>
              <div className="task-info-item">
                <span className="task-info-label">Created Date:</span>
                <span className="task-info-value">
                  {new Date(task.createdDate).toLocaleDateString()}
                </span>
              </div>
              <div className="task-info-item">
                <span className="task-info-label">Due Date:</span>
                <span className="task-info-value">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
              {task.urgent && (
                <div className="task-info-item urgent">
                  <span className="task-info-value">Urgent</span>
                </div>
              )}
            </div>
            <div className="task-actions">
              <button onClick={handleEdit} className="edit-button">Edit</button>
              <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
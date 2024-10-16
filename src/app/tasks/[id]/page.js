"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTask, getTaskById, updateTask } from '@/services/taskService';
import '../../styles/TaskDetail.css';

const TaskDetail = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const dummyTask = {
    id: "1",
    title: "Create Wireframes",
    description: "Design wireframes for the upcoming project. Ensure that all user interactions and major flows are covered.",
    estimatedTime: 3,
    timeUnit: "hours",
    status: "In Progress",
    priority: 1,
    createdDate: "2023-10-01",
    dueDate: "2023-10-15",
    urgent: true,
  };
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = dummyTask;
        setTask(data);
        setEditedTask(data);
      } catch (error) {
        setError('Error fetching task data');
        console.error('Failed to fetch task', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTask();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateTask(id, editedTask);
      setTask(editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      router.push('/tasks'); // Redirige a la lista de tareas después de eliminar
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const priorityClass = `priority-${task?.priority || 3}`;

  if (loading) return <p>Loading task details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="task-detail">
      <div className={`task-detail-card ${priorityClass}`}>
        {isEditing ? (
          <form className="task-edit-form">
            {/* Campos de edición aquí */}
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
                <span className="task-info-value">{task.estimatedTime} {task.timeUnit}</span>
              </div>
              <div className="task-info-item">
                <span className="task-info-label">Priority:</span>
                <span className="task-info-value">{task.priority}</span>
              </div>
              <div className="task-info-item">
                <span className="task-info-label">Created Date:</span>
                <span className="task-info-value">{new Date(task.createdDate).toLocaleDateString()}</span>
              </div>
              <div className="task-info-item">
                <span className="task-info-label">Due Date:</span>
                <span className="task-info-value">{new Date(task.dueDate).toLocaleDateString()}</span>
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
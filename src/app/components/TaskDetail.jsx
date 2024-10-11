import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteTask, getTaskById, updateTask } from '../services/taskService';
import '../styles/TaskDetail.css';
import useAuth from '../middleware/authMiddleware';

const TaskDetail = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null;
  }
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});

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
      navigate('/');
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const priorityClass = `priority-${task?.priority || 3}`; // Usa prioridad 3 por defecto si no se define

  if (loading) return <p>Loading task details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="task-detail">
      <div className={`task-detail-card ${priorityClass}`}>
        {isEditing ? (
          // Modo edición: muestra un formulario para editar la tarea
          <form className="task-edit-form">
            {/* Campos de edición */}
          </form>
        ) : (
          // Modo visualización: muestra los detalles de la tarea
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
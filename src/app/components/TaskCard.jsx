"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import '../styles/TaskCard.css';
import useAuth from '../middleware/authMiddleware';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TaskCard = ({ task, onStart }) => {
  const router = useRouter();
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null;
  }
  const { id, title, urgent, estimatedTime, timeUnit, status, priority } = task;

  const goToDetail = () => {
    router.push(`/tasks/${id}`);
  };

  return (
    <div
      className={`task-card priority-${priority} ${urgent ? 'urgent' : ''}`}
      onClick={goToDetail}
    >
      <div className="task-card-content">
        <h3>{title}</h3>
        <p>Status: <span className="task-status">{status}</span></p>
        <p>Estimated Time: <span className="task-time">{estimatedTime} {timeUnit}</span></p>
        <p>Priority: <span className="task-priority">{priority}</span></p>
      </div>
      <button
        className="start-button"
        onClick={(e) => {
          e.stopPropagation();
          onStart();
        }}
      >
        <i className="bi bi-caret-right"></i>
      </button>
    </div>
  );
};

export default TaskCard;
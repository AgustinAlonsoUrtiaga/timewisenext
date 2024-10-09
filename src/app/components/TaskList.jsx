"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskCard from './TaskCard';
import TimerModal from './TimerModal';
import '../styles/TaskList.css';
import { FaPlus } from 'react-icons/fa';
import { getTasks } from '../../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTimers, setActiveTimers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };
    fetchTasks();
  }, []);

  const handleOpenTimer = (task) => {
    const existingTimer = activeTimers.find((timer) => timer.id === task.id);
    if (!existingTimer) {
      setActiveTimers([...activeTimers, { id: task.id, title: task.title, duration: task.estimatedTime }]);
    } else {
      const timerElement = document.getElementById(`timer-${task.id}`);
      if (timerElement) {
        timerElement.classList.add('pulse');
        setTimeout(() => {
          timerElement.classList.remove('pulse');
        }, 1000);
      }
    }
  };

  const handleCloseTimer = (id) => {
    setActiveTimers(activeTimers.filter((timer) => timer.id !== id));
  };

  const handleCreateTask = () => {
    router.push('/tasks/create'); // Utiliza router.push para la navegación en Next.js
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <button className="create-task-button" onClick={handleCreateTask}>
          <FaPlus /> New Task
        </button>
      </div>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onStart={() => handleOpenTimer(task)} />
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
      {activeTimers.map((timer) => (
        <TimerModal
            key={timer.id}
            id={timer.id}
            title={timer.title}
            totalDuration={timer.duration}
            onClose={() => handleCloseTimer(timer.id)}
        />
        ))}
    </div>
  );
};

export default TaskList;
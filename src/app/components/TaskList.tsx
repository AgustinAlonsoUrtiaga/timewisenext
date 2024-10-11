"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import TaskCard from "./TaskCard";
import TimerModal from "./TimerModal";
import { FaPlus } from "react-icons/fa";
import { getTaskByEnvironment } from "@/services/taskService";
import "../styles/TaskList.css";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  estimatedTime: number;
  priority: number;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTimers, setActiveTimers] = useState<{ id: string; title: string; duration: number }[]>([]);
  const { environment } = useAppContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch tasks based on the current environment
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await getTaskByEnvironment(environment);
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [environment]);

  const handleCreateTask = () => {
    router.push("/tasks/create"); // Adjust this path according to your routing structure for task creation
  };

  const handleOpenTimer = (task: Task) => {
    const existingTimer = activeTimers.find((timer) => timer.id === task.id);
    if (!existingTimer) {
      setActiveTimers([...activeTimers, { id: task.id, title: task.title, duration: task.estimatedTime }]);
    } else {
      // Handle the case where a timer already exists for this task
    }
  };

  const handleCloseTimer = (id: string) => {
    setActiveTimers(activeTimers.filter((timer) => timer.id !== id));
  };

  // Display a loading indicator while tasks are being fetched
  if (loading) {
    return <div>Loading tasks...</div>;
  }

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
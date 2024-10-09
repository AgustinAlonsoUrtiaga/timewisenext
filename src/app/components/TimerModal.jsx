import React, { useState, useEffect } from 'react';
import '../styles/TimerModal.css';

const TimerModal = ({ id, title, onClose, totalDuration }) => {
  const totalSeconds = totalDuration * 3600;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  // Formatea el tiempo restante en horas, minutos y segundos
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      id={`timer-${id}`}
      className="timer-modal"
      style={{ left: position.x, top: position.y }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="timer-modal-header" onMouseDown={handleMouseDown}>
        <span>{title}</span>
        <button onClick={onClose} className="close-button">X</button>
      </div>
      <div className="timer-modal-content">
        <h3>{formatTime(timeLeft)}</h3>
      </div>
    </div>
  );
};

export default TimerModal;
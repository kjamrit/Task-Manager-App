import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const handleComplete = async () => {
    try {
      await axios.put(`http://localhost:5000/tasks/${task.id}/complete`);
      onTaskUpdated(task.id);
    } catch (err) {
      console.error(err);
      alert('Error marking task as completed');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${task.id}`);
      onTaskDeleted(task.id);
    } catch (err) {
      console.error(err);
      alert('Error deleting task');
    }
  };

  return (
    <div
      style={{
        marginBottom: '1rem',
        padding: '1rem',
        border: '1px solid #ccc',
        backgroundColor: task.is_completed ? '#e0ffe0' : '#fff',
        textDecoration: task.is_completed ? 'line-through' : 'none',
      }}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div>
        {!task.is_completed && (
          <button onClick={handleComplete}>Mark Completed</button>
        )}
        <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

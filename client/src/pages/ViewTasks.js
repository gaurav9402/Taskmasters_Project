import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ViewTasks.css";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/tasks");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5001/api/tasks/${taskToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskToDelete));
        setShowModal(false);
        setTaskToDelete(null);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="view-tasks-container">
      <h1>TaskMaster - View Tasks</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Title/Description</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-tasks">
                  No tasks available
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task._id.slice(-4)}</td>
                  <td>
                    <strong>{task.title}</strong>
                    <br />
                    {task.description}
                  </td>
                  <td>{task.priority}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/tasks/edit/${task._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        setTaskToDelete(task._id);
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this task?</p>
            <button className="confirm-btn" onClick={handleDelete}>
              Confirm
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setShowModal(false);
                setTaskToDelete(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTasks;

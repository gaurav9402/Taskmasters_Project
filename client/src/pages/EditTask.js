import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditTask.css";

const EditTask = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate(); // For redirecting after saving changes
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });

  // Fetch the task details for the given ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/tasks/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await response.json();
        setTaskData({
          title: data.title,
          description: data.description,
          dueDate: data.dueDate.split("T")[0], // Format date for input
          priority: data.priority,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        alert("Task updated successfully!");
        navigate("/tasks"); // Redirect to the View Tasks page
      } else {
        alert("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="edit-task-container">
      <h1>Edit Task</h1>
      <form className="edit-task-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Priority:
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <div className="edit-task-buttons">
          <button type="submit" className="save-btn">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/tasks")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;

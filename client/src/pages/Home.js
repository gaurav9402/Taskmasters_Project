import React, { useEffect, useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/tasks");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched tasks:", data); // Log the fetched tasks
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        height: "100vh",
        backgroundImage: "url('/logo.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain", // or "cover" if you want it stretched
        backgroundPosition: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Welcome to Taskmasters</h1>
      <p style={{ textAlign: "center" }}>
        Manage your tasks efficiently with our simple and effective tool.
      </p>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <strong>Title:</strong> {task.title} <br />
              <strong>Description:</strong> {task.description} <br />
              <strong>Status:</strong> {task.status} <br />
              <strong>Due Date:</strong>{" "}
              {new Date(task.dueDate).toLocaleDateString()} <br />
              <strong>Priority:</strong> {task.priority} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
  
  
  
};

export default Home;

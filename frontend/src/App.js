import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Walk the dog", completed: true },
    // Add more tasks here as needed
  ]);

  const [newTask, setNewTask] = useState({ title: "", completed: false });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    if (newTask.title.trim() === "") return;
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", completed: false });
  };

  const handleToggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const getTasks = async () => {
    const res = axios.get("http://localhost:8000/").then((res) => res);
    console.log(res);
  };

  useEffect(() => {
    console.log("sk");
    getTasks();
  }, []);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="task-form">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span>{task.title}</span>
            <div>
              <button onClick={() => handleToggleCompletion(task.id)}>
                {task.completed ? "Undo" : "Done"}
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

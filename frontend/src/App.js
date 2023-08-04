import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({ title: "", completed: false });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async () => {
    if (newTask.title.trim() === "") return;
    await axios.post("http://localhost:8000/", {
      title: newTask.title,
      completed: newTask.completed,
    });
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", completed: false });
  };

  const handleToggleCompletion = async (taskId) => {
    console.log(taskId);
    const updatedTasks = tasks.filter((task) => {
      if (task._id === taskId) return task;
    });
    console.log(updatedTasks);
    await axios.patch(`http://localhost:8000/${taskId}`, {
      completed: !updatedTasks[0].completed,
    });
    setTasks([...tasks]);
  };

  const handleDeleteTask = async (taskId) => {
    console.log(taskId);
    await axios.delete(`http://localhost:8000/${taskId}`);
    setTasks([...tasks]);
  };

  const getTasks = async () => {
    console.log("sks");
    const res = await axios.get("http://localhost:8000/");
    const data = res.data;
    setTasks(data);
  };
  useEffect(() => {
    console.log(tasks);
    getTasks();
  }, [tasks]);

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
          <li key={task._id} className={task.completed ? "completed" : ""}>
            <span>{task.title}</span>
            <div>
              <button onClick={() => handleToggleCompletion(task._id)}>
                {task.completed ? "Undo" : "Done"}
              </button>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

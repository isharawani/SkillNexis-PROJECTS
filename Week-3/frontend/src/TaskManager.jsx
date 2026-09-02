import ImageUpload from "./ImageUpload";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

function TaskManager() {
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  // Get tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await axios.post(
        `${API_URL}/tasks`,
        {
          title: title.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) => [
        ...prevTasks,
        response.data,
      ]);

      setTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task
  const toggleTask = async (task) => {
    try {
      const response = await axios.put(
        `${API_URL}/tasks/${task._id}`,
        {
          completed: !task.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item._id === task._id
            ? response.data
            : item
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;
  });

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <p>Week 3 — React + Express + MongoDB</p>

        <button
          type="button"
          onClick={logout}
          style={{ marginTop: "15px" }}
        >
          Logout
        </button>
      </header>

      <main>
        {/* Add Task */}
        <form
          onSubmit={addTask}
          className="task-form"
        >
          <input
            type="text"
            placeholder="Enter a task..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <button type="submit">
            Add Task
          </button>
        </form>

        {/* Task Filters */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            type="button"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* Task List */}
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty">
              No tasks found.
            </p>
          ) : (
            filteredTasks.map((task) => (
              <div
                className="task"
                key={task._id}
              >
                <span
                  className={
                    task.completed
                      ? "completed"
                      : ""
                  }
                  onClick={() =>
                    toggleTask(task)
                  }
                >
                  {task.title}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    deleteTask(task._id)
                  }
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Image Upload */}
        <ImageUpload />
      </main>
    </div>
  );
}

export default TaskManager;
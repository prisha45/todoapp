import { useEffect, useState } from "react";
import axios from "axios";



function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
  try {
    await axios.post("http://localhost:5000/todos", {
      title: title,
      completed: false,
    });

    setTitle("");
    fetchTodos();
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  } catch (err) {
    console.log(err);
  }
};
const toggleComplete = async (todo) => {
  try {
    await axios.put(`http://localhost:5000/todos/${todo._id}`, {
      title: todo.title,
      completed: !todo.completed,
    });

    fetchTodos();
  } catch (err) {
    console.log(err);
  }
};

  return (
  <div style={{ padding: "30px" }}>
    <h1>Todo App</h1>

    <input
      type="text"
      placeholder="Enter a todo"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <button onClick={addTodo}>Add</button>

    <br />
    <br />

    {todos.map((todo) => (
  <div
    key={todo._id}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px",
    }}
  >
    <span>
      {todo.title} {todo.completed ? "✅" : "❌"}
    </span>

    <button onClick={() => toggleComplete(todo)}>
      {todo.completed ? "Undo" : "Complete"}
    </button>

    <button onClick={() => deleteTodo(todo._id)}>
      Delete
    </button>
  </div>
))}
  </div>
);
}

export default App;
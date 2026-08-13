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
  <div className="min-h-screen bg-[#D5C5C8] flex justify-center items-center -mt-10">


    <div className="mt-10 w-[1200px] min-h-[650px] bg-[#FFDBDA] rounded-3xl border border-[#9DA3A4] shadow-xl px-20 py-15">


    <div className="w-full flex justify-between items-center">

      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Hi Prisha!!
        </h1>

        <p className="text-gray-800 mt-2">
          
        </p>

        <p className="text-gray-800 mt-6">
          Tasks Remaining: {todos.filter(todo => !todo.completed).length}
        </p>

        <p className="text-gray-800">
         Tasks Completed: {todos.filter(todo => todo.completed).length}
        </p>
      </div>

      <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter your task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-72 px-4 py-2 rounded-lg border border-[#9DA3A4] bg-white focus:outline-none"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 rounded-xl bg-[#DB7F8E] text-white hover:bg-[#c96b7b] transition"
          >
            Add
          </button>
      </div>
      

    </div>

    <div className="mt-12">
  {todos.map((todo) => (
    <div
      key={todo._id}
      className="flex justify-between items-center py-5 border-b border-[#d8aeb5]"
    >
      <span
        className={`text-lg ${
          todo.completed
            ? "line-through text-gray-400"
            : "text-gray-800"
        }`}
      >
        {todo.title}
      </span>

      <div className="flex gap-3">
        <button
          onClick={() => toggleComplete(todo)}
          className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => deleteTodo(todo._id)}
          className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

    </div>

  </div>
);
}

export default App;
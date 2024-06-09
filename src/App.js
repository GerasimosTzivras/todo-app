import React, { useState, useRef, lazy, Suspense, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setFilter, setSearch } from "./store";
import { fetchTodos } from "./actions";

const TodoList = lazy(() => import("./TodoList"));

function App() {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo("");
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") {
        return todo.completed;
      } else if (filter === "active") {
        return !todo.completed;
      } else {
        return true;
      }
    })
    .filter((todo) => {
      return todo.title.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        ref={inputRef}
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <div>
        <button onClick={() => dispatch(setFilter("all"))}>All</button>
        <button onClick={() => dispatch(setFilter("active"))}>Active</button>
        <button onClick={() => dispatch(setFilter("completed"))}>
          Completed
        </button>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Search todos"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <MemoizedTodoList todos={filteredTodos} />
      </Suspense>
    </div>
  );
}

const MemoizedTodoList = React.memo(TodoList);

export default App;

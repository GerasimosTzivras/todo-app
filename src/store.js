import { configureStore, createSlice } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const initialState = {
  todos: [],
  filter: "all",
  search: "",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        title: action.payload,
        completed: false,
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    fetchTodosSuccess: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleComplete,
  updateTodo,
  setFilter,
  setSearch,
  fetchTodosSuccess,
} = todosSlice.actions;

const store = configureStore({
  reducer: todosSlice.reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

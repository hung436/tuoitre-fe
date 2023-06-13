// import { store } from "../Store/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  filter: "all",
  search: "",
  sort: "ascend",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { addTodo, removeTodo, editTodo, setSearch, setSort, setFilter } =
  todoSlice.actions;
export default todoSlice.reducer;

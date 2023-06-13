import React from "react";

import "./TodoList.css";

import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { Divider } from "antd";

const TodoApp = () => {
  return (
    <div className="todo-list">
      <h1>TodoApp</h1>
      <Divider />
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodoApp;

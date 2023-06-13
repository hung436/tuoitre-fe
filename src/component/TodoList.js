import React, { useEffect, useState } from "react";
import { Input, List } from "antd";
import { useSelector } from "react-redux";
import { editTodo, removeTodo } from "../app/slice/todoSlice";
import { dispatch } from "../app/store";
import {
  DeleteFilled,
  CheckSquareOutlined,
  BorderOutlined,
} from "@ant-design/icons";
const TodoList = () => {
  const { todos, filter, search, sort } = useSelector((state) => state.todo);
  const [filteredAndSortedTodos, setFilteredAndSortedTodos] = useState([]);
  const handleDeleteTodo = (id) => {
    dispatch(removeTodo({ id }));
  };

  const handleMarkDone = (id) => {
    dispatch(editTodo({ id }));
  };

  useEffect(() => {
    filterAndSortTodos();
  }, [todos, filter, search, sort]);

  const filterAndSortTodos = () => {
    let filteredTodos = [...todos];

    // Filter todos based on selectedFilter
    if (filter === "done") {
      filteredTodos = filteredTodos.filter((todo) => todo.isDone);
    } else if (filter === "undone") {
      filteredTodos = filteredTodos.filter((todo) => !todo.isDone);
    }

    // Search todos based on searchValue
    if (search.trim() !== "") {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.value.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort todos based on sortOrder
    if (sort === "ascend") {
      filteredTodos.sort((a, b) => a.value.localeCompare(b.value));
    } else if (sort === "descend") {
      filteredTodos.sort((a, b) => b.value.localeCompare(a.value));
    }

    setFilteredAndSortedTodos(filteredTodos);
  };

  return (
    <List
      className="todo-list-items"
      dataSource={filteredAndSortedTodos}
      renderItem={(todo, index) => (
        <List.Item
          className={`todo-item ${todo.isDone ? "todo-item-done" : ""}`}
          actions={[
            <div
              onClick={() => handleMarkDone(todo.id)}
              className="todo-item-icon"
            >
              {todo.isDone ? (
                <CheckSquareOutlined style={{ color: "green" }} />
              ) : (
                <BorderOutlined />
              )}
            </div>,
            <div
              onClick={() => handleDeleteTodo(todo.id)}
              className="todo-item-icon"
            >
              <DeleteFilled style={{ color: "red" }} />
            </div>,
          ]}
        >
          <Input
            value={todo.value}
            // onChange={(e) => handleEditTodo(index, e.target.value)}
          />
        </List.Item>
      )}
    />
  );
};

export default TodoList;

import React, { useEffect, useState } from "react";
import { Input, List, Modal, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { editTodo, markDoneTodo, removeTodo } from "../app/slice/todoSlice";
import { dispatch } from "../app/store";
import {
  DeleteFilled,
  CheckSquareOutlined,
  BorderOutlined,
} from "@ant-design/icons";

const TodoList = () => {
  //
  const { todos, filter, search, sort } = useSelector((state) => state.todo);
  const [filteredAndSortedTodos, setFilteredAndSortedTodos] = useState([]);
  const [todoSelected, setTodoSelected] = useState();

  //Delete
  const handleDeleteTodo = (id) => {
    dispatch(removeTodo({ id }));
  };
  //Done
  const handleMarkDone = (id) => {
    dispatch(markDoneTodo({ id }));
  };
  //Edit
  const handleEditTodo = (value) => {
    dispatch(editTodo({ id: todoSelected.id, value: value }));
    setOpen(false);
    setTodoSelected({});
  };
  useEffect(() => {
    filterAndSortTodos();
  }, [todos, filter, search, sort]);

  const filterAndSortTodos = () => {
    let filteredTodos = [...todos].reverse();

    // Filter
    if (filter === "done") {
      filteredTodos = filteredTodos.filter((todo) => todo.isDone);
    } else if (filter === "undone") {
      filteredTodos = filteredTodos.filter((todo) => !todo.isDone);
    }

    // Search
    if (search.trim() !== "") {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.value.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sort === "ascend") {
      filteredTodos.sort((a, b) => a.id - b.id);
    } else if (sort === "descend") {
      filteredTodos.sort((a, b) => b.id - a.id);
    }

    setFilteredAndSortedTodos(filteredTodos);
  };
  //Modal
  const [open, setOpen] = useState(false);
  const handleOpenPopUp = (todo) => {
    setTodoSelected(todo);
    setOpen(true);
  };
  return (
    <>
      <EditTodoPopUp
        open={open}
        handleCancel={() => setOpen(false)}
        value={todoSelected?.value || ""}
        handleOk={handleEditTodo}
      />
      <List
        className="todo-list-items"
        dataSource={filteredAndSortedTodos}
        renderItem={(todo, index) => (
          <List.Item
            key={index}
            className={`todo-item ${todo.isDone ? "todo-item-done" : ""}`}
            onClick={() => handleOpenPopUp(todo)}
            actions={[
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkDone(todo.id);
                }}
                className="todo-item-icon"
              >
                <Tooltip
                  placement="leftTop"
                  title={todo.isDone ? "UnDone" : "Done"}
                >
                  {todo.isDone ? (
                    <CheckSquareOutlined style={{ color: "green" }} />
                  ) : (
                    <BorderOutlined />
                  )}
                </Tooltip>
              </div>,
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTodo(todo.id);
                }}
                className="todo-item-icon"
              >
                <DeleteFilled style={{ color: "red" }} />
              </div>,
            ]}
          >
            <div>{todo.value}</div>
          </List.Item>
        )}
      />
    </>
  );
};

export default TodoList;

function EditTodoPopUp({ open, handleOk, handleCancel, value }) {
  const [inputValue, setInputValue] = useState();
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <Modal
      title="Edit Todo"
      open={open}
      onOk={() => handleOk(inputValue)}
      onCancel={handleCancel}
    >
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Modal>
  );
}

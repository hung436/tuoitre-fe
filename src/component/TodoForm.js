import React, { useState } from "react";
import { Input, Button, Select } from "antd";
import { dispatch } from "../app/store";
import { addTodo, setFilter, setSearch, setSort } from "../app/slice/todoSlice";
import { useSelector } from "react-redux";

const TodoForm = () => {
  const { search, filter, sort } = useSelector((state) => state.todo);

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("ascend"); // ascend, Descend
  const [selectedFilter, setSelectedFilter] = useState("all"); // all, done, undone
  const [error, setEror] = useState();
  const handleAddTodo = () => {
    //Validate input
    if (!inputValue) {
      setEror("Please enter input value");
      return;
    }
    dispatch(
      addTodo({
        id: Date.now(), // Giả sử sử dụng timestamp làm id
        value: inputValue,
        isDone: false,
      })
    );
    setInputValue("");
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e));
  };

  const handleSearchQueryChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSort(e));
  };

  return (
    <div className="todo-list-header">
      <Input
        placeholder="Add a todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleAddTodo}
        className="todo-list-input"
      />
      <Button onClick={handleAddTodo} className="todo-list-button">
        Add
      </Button>
      <Input
        placeholder="Search"
        value={search}
        onChange={handleSearchQueryChange}
        className="todo-list-search"
      />
      <Select
        defaultValue="ascend"
        value={sort}
        onChange={handleSortChange}
        className="todo-list-sort"
      >
        <Select.Option value="ascend">Ascend</Select.Option>
        <Select.Option value="descend">Descend</Select.Option>
      </Select>
      <Select
        defaultValue="all"
        value={filter}
        onChange={handleFilterChange}
        className="todo-list-filter"
      >
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="done">Done</Select.Option>
        <Select.Option value="undone">Undone</Select.Option>
      </Select>
    </div>
  );
};

export default TodoForm;

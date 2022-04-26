import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import About from '../pages/About';
import NotMatch from '../pages/NotMatch';
import Navbar from './Navbar';

const TodoContainer = () => {
  function getInitialTodos() {
    // getting stored items
    const temp = localStorage.getItem('todos');
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  }

  const [todos, setTodos] = useState(getInitialTodos());

  const handleChange = (id) => {
    setTodos((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    }));
  };

  const delTodo = (id) => {
    setTodos([
      ...todos.filter((todo) => todo.id !== id),
    ]);
  };

  const addTodoItem = (title2) => {
    const newTodo = {
      id: uuidv4(),
      title: title2,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        // const newTodo = todo;
        if (todo.id === id) {
          // newTodo.title = updatedTitle;
          return { ...todo, title: updatedTitle };
        }
        return todo;
      }),
    );
  };

  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos', temp);
  }, [todos]);

  function ContainerJSX() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={addTodoItem} />
          <TodosList
            todos={todos}
            handleChangeProps={handleChange}
            deleteTodoProps={delTodo}
            setUpdate={setUpdate}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ContainerJSX />} />
        <Route path="/about/*" element={<About />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </>
  );
};

export default TodoContainer;

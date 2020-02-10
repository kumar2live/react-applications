import React, {useState, useEffect, useReducer, useMemo } from 'react';
import './todo.css'

import ListComponent from './list';
import { useFormInput } from '../hooks/formsHook';

import axios from 'axios';

const todoListReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return state.concat(action.payload);
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
}

const TodoComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [todoState, todoDispatcher] = useReducer(todoListReducer, []);
  const toDoInput = useFormInput();

  const addTodoHandler = () => {
    setLoading(true);
    const Todo = toDoInput.value;

    axios.post('https://mandesmuthukumar.firebaseio.com/todos.json', {name: Todo})
      .then((response) => {
        const newTodo = {name: Todo, id: response.data.name}
        todoDispatcher({type: 'ADD', payload: newTodo});
        setLoading(false);
        // todoInputRef.current.value = null;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })
  }

  const todoRemoveHandler = (todo) => {
    setLoading(true);
    axios.delete(`https://mandesmuthukumar.firebaseio.com/todos/${todo.id}.json`)
      .then((response) => {
        setLoading(false);
        todoDispatcher({type: 'REMOVE', payload: todo});
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })

  }

  useEffect(() => {
    setLoading(true);
    axios.get('https://mandesmuthukumar.firebaseio.com/todos.json')
      .then((response) => {
        const todos = response.data;
        const todosArr = [];
        for (const key in todos) {
          todosArr.push({id: key, name: todos[key].name});
        }
        todoDispatcher({type: 'SET', payload: todosArr});
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      })

    return () => {
      console.log('Clearing');
    }
  }, []);

  return (

    <React.Fragment>
      <div className="TodoList">
        <div className="Heading"> Todo List </div>

        <input
          className="inputStyles"
          type="text"
          placeholder="Please enter todo"
          onChange={toDoInput.onChange}
          value={toDoInput.value}
          style={{backgroundColor: toDoInput.validity ? 'transparent': '#292727cc'}}
          />
        {/* <input className="inputStyles" type="text" placeholder="Please enter todo" ref={todoInputRef} /> */}

        <button type="button" className="buttonStyles"
          onClick={addTodoHandler} >Add</button>

        {loading && 'Please wait..!'}

        <ul>
          { useMemo(() => <ListComponent items={todoState} onClick={todoRemoveHandler}/>, [todoState])}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default TodoComponent;
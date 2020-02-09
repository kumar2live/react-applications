import React, {useState, useEffect, useReducer, useRef } from 'react';
import './todo.css'

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
  // const [Todo, setTodo] = useState('');
  // const [SubmittedTodo, setSubmittedTodo] = useState(null);
  // const [TodoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [todoState, todoDispatcher] = useReducer(todoListReducer, []);

  const todoInputRef = useRef();

  // const [TodoState, setTodoState] = useState({Todo: '', TodoList: []});

  // const setTodoValue = (event) => {
  //   const todoName = event.target.value;
  //   setTodo(todoName)
  //   // setTodoState({TodoList: TodoState.TodoList, Todo: event.target.value})
  // }

  const addTodoHandler = () => {
    // setTodoState({
    //   TodoList: TodoState.TodoList.concat(TodoState.Todo),
    //   Todo: TodoState.Todo,
    // })
    setLoading(true);
    const Todo = todoInputRef.current.value;

    axios.post('https://mandesmuthukumar.firebaseio.com/todos.json', {name: Todo})
      .then((response) => {
        const newTodo = {name: Todo, id: response.data.name}
        // setTodoList(TodoList.concat(newTodo));
        todoDispatcher({type: 'ADD', payload: newTodo});
        // setSubmittedTodo(newTodo);
        setLoading(false);
        todoInputRef.current.value = null;
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
        // setTodoList(todosArr);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      })

    return () => {
      console.log('Clearing');
    }
  }, []);

  // useEffect(() => {
  //   if (SubmittedTodo) {
  //     // setTodoList(TodoList.concat(SubmittedTodo));
  //     todoDispatcher({type: 'ADD', payload: SubmittedTodo});
  //   }
  // }, [SubmittedTodo]);


  // const mousemoveHandler = (event) => {
  //   console.log(event.clientX, event.clientY);
  // }

  // useEffect(() => {
  //   document.addEventListener('mousemove', mousemoveHandler);

  //   return () => {
  //     document.removeEventListener('mousemove', mousemoveHandler);
  //   };
  // }, []);

  return (

    <React.Fragment>
      <div className="TodoList">
        <div className="Heading"> Todo List </div>

        {/* <input className="inputStyles" type="text" placeholder="Please enter todo"
          value={Todo}
          onChange={setTodoValue} /> */}

        <input className="inputStyles" type="text" placeholder="Please enter todo" ref={todoInputRef} />

        <button type="button" className="buttonStyles"
          onClick={addTodoHandler} >Add</button>

        {loading && 'Please wait..!'}

        <ul>
          {todoState.map((todo) => {
            return (
              <li key={todo.id}>
                <div className="todo-item">
                  <div>{todo.name} </div>
                  <div>
                    <button type="button" onClick={todoRemoveHandler.bind(this, todo)}>Delete</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default TodoComponent;
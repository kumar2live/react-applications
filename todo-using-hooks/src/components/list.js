import React from 'react';

import './list.css';

const ListComponent = (props) => {
  return (
    <div>
      {props.items.map((todo) => {
        return (
          <li key={todo.id}>
            <div className="todo-item">
              <div>{todo.name} </div>
              <div>
                <button type="button" onClick={props.onClick.bind(this, todo)}>Delete</button>
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default ListComponent;
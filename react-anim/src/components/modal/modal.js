import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './modal.css';

const modal = (props) => {
  console.log(props);

  return (
    <React.Fragment>
      <CSSTransition 
        // classNames="fade-slide"
        classNames={{
          enter: 'ModalOpen',
          enterActive: 'ModalOpen',
          enterDone: 'ModalOpen',
          exit: 'ModalClose',
          exitActive: 'ModalClose',
          exitDone: 'ModalClose',
        }}
        in={props.show}
        timeout={{enter: 500, exit: 500}}
        mountOnEnter unmountOnExit>

          <div className='Modal'>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>Dismiss</button>
          </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default modal;
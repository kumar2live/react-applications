import React from 'react';

import CssClasses from './Model.module.css';
import BackDropComponent from '../BackDrop/BackDropComponent';

const ModelComponent = (props) => {

  return (
    <div>
      <BackDropComponent show={props.showModal} backDropClicked={props.modalClosed}/>
      <div style={{
              transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
              opacity: props.showModal ? '1' : '0'
            }} 
            className={CssClasses.Modal}>
        {props.children}
      </div>
    </div>
  );

}

export default React.memo(
  ModelComponent,
  ((prevProps, nextProps) =>
  (nextProps.showModal === prevProps.showModal) &&
  (nextProps.children === prevProps.children)));
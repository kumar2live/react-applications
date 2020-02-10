import React from 'react';

import CssStyles from './Spinner.module.css';

const SpinnerComponent = (props) => {
  return (
    <div className={CssStyles.Spinner}>Loading...</div>
  );
};

export default SpinnerComponent;
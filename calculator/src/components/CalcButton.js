import React, {Component} from 'react';
import PropTypes from 'prop-types';



const CalcButton = ( {className, children, mytag, onButtonClick = f=> f}) => {

  const extraClass = className || '';
  const onButtonKeyDown = () => {
    onButtonClick(mytag);
  }
  return (  
    <button
      className={`calc-btn ${extraClass}`}
      onClick={onButtonKeyDown}
    >
      {children}
    </button>
  );
};




CalcButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CalcButton.defaultProps = {
 
};

export default CalcButton;

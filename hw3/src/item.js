import React, {Component} from 'react';
import {v4} from 'uuid';
import PropTypes from 'prop-types'
import './item.css'

const Item = ({id, title, checked, onRemoveItem= f => f, onChangeScoreByRemoval = f => f,onChecktem =f => f}) => {
    const removeTheItem = (e) => {
        onRemoveItem(id);
    }
    const changeScore = (e) => {
        onChangeScoreByRemoval(checked);
    }
    const checkTheItem = (e) => {
        onChecktem(id, checked);
    }
    const done_Style = {textDecoration: 'line-through'};
    const undone_Style = {textDecoration: 'none'};
    return(
        <li style={checked? done_Style : undone_Style}>
            <div className='each_Item' >
                <div style={{width: '90%', marginLeft: '2%'}}  onClick={checkTheItem}>{title}</div>
                <div onClick={changeScore}>
                    <div style={{width: '100%'}}><button className='rm_item' onClick={removeTheItem }>x</button></div>
                </div>
            </div>
        </li>
        
    );
}

export default Item;



/*
<div className='item'>
<>
<p>{title}</p>

</div>
*/
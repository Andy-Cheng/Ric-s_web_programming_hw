import React, {Component} from 'react';
import {v4} from 'uuid';
import PropTypes from 'prop-types'
import './item.css'

const Item = ({id, title, checked, onRemoveItem= f => f, onChecktem =f => f}) => {
    const removeTheItem = (e) => {
        onRemoveItem(id);
    }
    const checkTheItem = (e) => {
        onChecktem(id);
    }
    return(
        <li >
            <div className='each_Item'>
                <div style={{width: '90%', marginLeft: '2%'}}>{title}</div>
                <div style={{width: '10%'}}><button className='rm_item' onClick={removeTheItem}>x</button></div>
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
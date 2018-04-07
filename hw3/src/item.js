import React, {Component} from 'react';
import {v4} from 'uuid';
import PropTypes from 'prop-types'
import './item.css'

const Item = ({id, title, checked, onRemoveItem= f => f}) => {
    const removeTheItem = (e) => {
        onRemoveItem(id);
    }
    return(
        <div className='item'>
            <p>{title}</p>
            <button className='rm_item' onClick={removeTheItem}>x</button>
        </div>
    );
}

export default Item;
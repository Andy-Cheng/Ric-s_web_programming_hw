import React, {Component} from 'react';
import {v4} from 'uuid';
import PropTypes from 'prop-types'
import './addnewlists.css'
const AddANewList = ({onNewList = f => f}) => {
    let _title;
    const submit = e => {
        e.preventDefault();
        onNewList(_title.value);
        _title.value = '';
        _title.focus();
    }
    return(
        <form className='addnewlist' onSubmit={submit}>
            <input ref={input => _title =input} type='text' placeholder='Add a new list!' required/>
            <button>Add</button>
        </form>
    );


} 
    
export default AddANewList;
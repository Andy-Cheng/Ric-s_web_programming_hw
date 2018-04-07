import React, {Component} from 'react';
import {v4} from 'uuid';
import PropTypes from 'prop-types'
import './list.css'
import Item from './item'
class List extends Component{
    constructor(props){
        super(props);
        let the_First_Item_Id = v4();
        this.state = {done:0, undone:0, items:[{id: the_First_Item_Id, title:'test', checked: false}]};
        this.remove_The_List = this.remove_The_List.bind(this);
        this.add_A_New_Item = this.add_A_New_Item.bind(this);
        this.remove_A_Item = this.remove_A_Item.bind(this);
        this.change_List_Title= this.change_List_Title.bind(this);
    }
    change_List_Title(e){
        let new_Title = prompt('Type your new job!', 'New Job');
        this.props.onTitleChange(this.props.id, new_Title)
    }
    remove_The_List(e){
        this.props.onRemove(this.props.id);
    }
    add_A_New_Item(e){
        e.preventDefault();
        const {_title} = this.refs;
        const  title =_title.value
        let new_Item_Id = v4();
        this.setState(prevState => ({items: [...prevState.items, {id: new_Item_Id, title: title, checked: false}]}));
        _title.value = '';
        _title.focus();
    }
    remove_A_Item(id){
        this.setState(prevState => ({items: prevState.items.filter(the_Item => the_Item.id !== id)}));
    }

    render(){
        const {change_List_Title, remove_The_List, add_A_New_Item, remove_A_Item} =this;
        return(
            <div className='list'>
                <div className='list_header'>
                <h className='detailed_score'> done: {this.state.done}</h>
                <h className='detailed_score'>undone: {this.state.undone}</h>
                <button className='rmlist' onClick={remove_The_List}> x</button>
                </div>
                <div className='list_title'>
                    <h className='list_title'>{this.props.title}</h>
                    <button onClick={change_List_Title}/>
                </div>
                <div className='new_a_item'>
                    <form onSubmit={add_A_New_Item}>
                    <input className='add_New_Item' placeholder='Add an item !' ref='_title' required/>
                    <button>Add</button>
                    </form>
                </div>
                <div className='items'>
                    {this.state.items.map(
                        item =>
                        (<Item
                            key={item.id}
                            {...item}
                            onRemoveItem={remove_A_Item}
                        />)
                    )}
                </div>
            </div>
        )
    }
}

export default List;
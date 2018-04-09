import React, {Component} from 'react';
import {v4} from 'uuid';
import PropTypes from 'prop-types'
import './list.css'
import Item from './item'
import editpng from './edit.png'
class List extends Component{
    constructor(props){
        super(props);
        let the_First_Item_Id = v4();
        this.state = {items:[]};
        this.remove_The_List = this.remove_The_List.bind(this);
        this.add_A_New_Item = this.add_A_New_Item.bind(this);
        this.remove_A_Item = this.remove_A_Item.bind(this);
        this.change_List_Title= this.change_List_Title.bind(this);
        this.check_The_Item = this.check_The_Item.bind(this);
        this.remove_And_Change_Scores = this.remove_And_Change_Scores.bind(this);
    }

    change_List_Title(e){
        let new_Title = prompt('Type your new job!', 'New Job');
        this.props.onTitleChange(this.props.id, new_Title)
    }
    remove_The_List(e){
        this.props.onRemove(this.props.id);
        this.props.onChangeScore(this.props.id, 0, 0);
    }
    add_A_New_Item(e){
        e.preventDefault();
        const {_title} = this.refs;
        const  title =_title.value
        let new_Item_Id = v4();
        this.setState(prevState => ({items: [...prevState.items, {id: new_Item_Id, title: title, checked: false}]}));
        _title.value = '';
        _title.focus();
        let new_unDone = this.props.undone + 1;
        this.props.onChangeScore(this.props.id, this.props.done, new_unDone);
    }
    remove_A_Item(id){
        this.setState(prevState => ({items: prevState.items.filter(item => item.id !== id)}));
    }
    remove_And_Change_Scores(check){
        if(check){
            let new_done = this.props.done -1 ;
            this.props.onChangeScore(this.props.id, new_done, this.props.undone);
        }
        else{
            let new_undone = this.props.undone -1 ;
            this.props.onChangeScore(this.props.id, this.props.done, new_undone);
        }
    }
    check_The_Item(id, check){
        let new_Checked = check? false : true;
        this.setState(prevState => {
            for(let i =0; i < prevState.items.length; i++ ){
                if(prevState.items[i].id === id){
                    prevState.items[i].checked = new_Checked;
                    break;
                }
            }
            let items = prevState.items;
            return  {items: items};
        });
        if(check){
            this.props.onChangeScore(this.props.id, (this.props.done -1), (this.props.undone +1));
        }
        else{
            this.props.onChangeScore(this.props.id, (this.props.done +1), (this.props.undone -1));
        }
    }
    

    render(){
        const {sum_The_Score ,change_List_Title, remove_The_List, add_A_New_Item, remove_A_Item, check_The_Item, remove_And_Change_Scores} =this;
        return(
            <div className='list'>
                <div className='list_header'>
                <h className='detailed_score'> done: {this.props.done}</h>
                <h className='detailed_score'>undone: {this.props.undone}</h>
                <button className='rmlist' onClick={remove_The_List}> x</button>
                </div>
                <div className='list_title'>
                    <div style={{width: '10%'}}>
                        <img src={editpng} alt='edit' className='changetitlebutton' onClick={change_List_Title}/>
                    </div>
                        <h className='list_title'>{this.props.title}</h>
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
                            onChangeScoreByRemoval = {remove_And_Change_Scores}
                            onChecktem = {check_The_Item}
                        />)
                    )}  
                </div>
            </div>
        )
    }
}

export default List;
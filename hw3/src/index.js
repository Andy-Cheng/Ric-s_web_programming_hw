import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {v4} from 'uuid';
import PropTypes from 'prop-types'
import './index.css'
import List from './list';
import AddANewList from './addnewlists';

class TodoApp extends Component {
  constructor(props){
    super(props);
    let first_List_Id = v4();
    let first_List_Title = 'Demo';
    this.state={
      completed: 0,
      uncompleted: 0,
      lists: [{id: first_List_Id, title: first_List_Title, done: 0, undone: 0}]
    }
    this.add_A_List = this.add_A_List.bind(this);
    this.remove_A_List = this.remove_A_List.bind(this);
    this.edit_List_Title = this.edit_List_Title.bind(this);
    this.change_List_Score = this.change_List_Score.bind(this);
  }
  edit_List_Title(id,new_Title){ 
    this.setState(prevState => {
      for(let i=0; i < prevState.lists.length; i++){
        if (prevState.lists[i].id === id){
          prevState.lists[i].title = new_Title;
          break;
        }
      }
      return {lists: prevState.lists}
    });
  }
  add_A_List(new_Title){
    let new_List_Id = v4();
    this.setState(prevState =>({lists: [...prevState.lists, {id: new_List_Id, title: new_Title, done: 0, undone: 0}]}));
  }
  remove_A_List(list_Id){
    this.setState(prevState => {return{
      lists: prevState.lists.filter(the_List => the_List.id !== list_Id)
    }});
  }
  change_List_Score(list_Id, done, undone){
    this.setState(prevState => {
      let completed = 0;
      let uncompleted = 0 ;
      for(let i = 0; i < prevState.lists.length; i++){
        if(prevState.lists[i].id === list_Id){
          prevState.lists[i].done = done;
          prevState.lists[i].undone = undone;
        }
        completed += prevState.lists[i].done;
        uncompleted += prevState.lists[i].undone;
      }
      return {completed, uncompleted, lists: prevState.lists}
    });
  }
  render() {
    const {add_A_List, remove_A_List, edit_List_Title, change_List_Score} = this
    return (
        <div id='main_board'>
          <AddANewList onNewList={add_A_List}/>
          <div id='general_score'>
            <h id='completed'>done: {this.state.completed}</h>
            <h id='uncompleted'>undone: {this.state.uncompleted}</h>
          </div>
          <div id ='lists'>
            {this.state.lists.map( list=> 
              (<List key={list.id}
                    {...list}
                    onRemove={remove_A_List}
                    onTitleChange = {edit_List_Title}
                    onChangeScore = {change_List_Score}
              />)
            )}
          </div>
        </div>
      ); 
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));

/*
      lists:[{
        id: v4(),
        title: 'Todo list demo',
        items: [{
          id: v4(),
          name: 'test1',
          checked: false
        }],
        done: 0,
        undone: 0
      }]

        constructor(props){
    super(props);
    this.state = {
      lists: [{id: v4(), list: <List/ >}],
      completed:0,
      uncompleted: 0,
    };
    this.add_A_List = this.add_A_List.bind(this);
    this.remove_A_List = this.remove_A_List.bind(this);
  }

  add_A_List(){
    this.setState(prevState => {
      lists:[
        ...prevState.lists,
        {
          id: v4(),
          title,
          items,
          done,
          undone
        }
      ]
    });
  }

  remove_A_List(id){
    let list_Will_Be_Removed = this.lists.filter(list => list.id === id);
    this.setState(prevState => {
      return {
        lists: prevState.lists.filter(list => list.id !== id),
        completed: (prevState.completed - list_Will_Be_Removed.done),
        uncompleted: (prevState.uncompleted -list_Will_Be_Removed.undone)
      }
    })// Use Array.filter to filter out element we don't want anymore.
  }






*/
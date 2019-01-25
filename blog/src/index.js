import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './Layout';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { selectBlog, receiveAllBlog, userStatus, refreshStatus } from './reducers/index'
 

const blogApp = combineReducers({
    selectBlog,
    receiveAllBlog,
    userStatus,
    refreshStatus,
});

const initialState = {
    selectBlog: { selectedBlogId: '11a44683-f25d-4de2-b5b3-c45f4d79146a',
    blogContent: 
     { id: '',
       date: '',
       title: '',
       content: '',
       authorID: '',
       author: '',
       images: '' },
    receivedAt: '',
    blogReceivedFail: '',
    error: '' },
 receiveAllBlog: [],
 userStatus: {
     error: null,
     status: 'LOGOUT',
     userID: null,
     userName: null,

 },
};

export const store = createStore(
    blogApp,
    initialState,
    applyMiddleware(thunkMiddleware)
  );




ReactDOM.render(
<Provider store={store}>
<div>
<BrowserRouter>
<Layout />
</BrowserRouter>
</div>
</Provider>
, document.getElementById('root'));
registerServiceWorker();

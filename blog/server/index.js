const  thunkMiddleware = require('redux-thunk').default
// const fetch = require('cross-fetch')
const axios = require('axios')
const { createLogger } = require('redux-logger');
const { combineReducers, createStore, applyMiddleware } = require('redux')


const actionType = {
    User_Login : 'User_Login',
    User_Logout : 'User_Logout',
    Select_Blog: 'Select_Blog',
    Update_Blog: 'Update_Blog',
    Upload_A_Blog: 'Upload_A_Blog',
    Delete_Blog: 'Delete_Blog',
    RECEIVE_USERINFO: 'RECEIVE_USERINFO',
    REQUEST_BLOG: 'REQUEST_BLOG',
    RECEIVE_BLOG: 'RECEIVE_BLOG',
    RECEIVE_ERROR: 'RECEIVE_ERROR',
    RECEIVE_ALL_BLOG_INFO: 'RECEIVE_ALL_BLOG_INFO',
    FETCH_BLOG_REQUEST: 'FETCH_BLOG_REQUEST',
    FETCH_BLOG_FAILURE: 'FETCH_BLOG_FAILURE',
    FETCH_BLOG_SUCCESS: 'FETCH_BLOG_SUCCESS',
};


// user actions
const receiveUserInfo = (user)=>{
    return({
        type: actionType.RECEIVE_USERINFO,
        status: 'LOGIN',
        user,
    });
};

// const userLogout = ()=>{
//     return({
//         type: actionType.User_Logout,
//         status: 'LOGOUT',
//     })    
// }

// blogs management
const receiveAllBlogInfo = (data) =>{
    return({
        type: actionType.RECEIVE_ALL_BLOG_INFO,
        blogsInfo: data,
    });
};

// const requestBlog = (blogID) => {
//     return({
//         type: actionType.REQUEST_BLOG,
//         isFetchingBlog: blogID,
//     });
// };

const receiveBlog = (blogID, data) => {
    return({
        type: actionType.RECEIVE_BLOG,
        blogID,
        blogContent: data[0],
        receivedAt: new Date(),
    });
}

const receiveError = (blogID, error) => {
    return({
        type: actionType.RECEIVE_ERROR,
        blogID,
        error,
    });
};


const fetchBlog = (blogID) => {
    return (dispatch => {
        //dispatch(requestBlog(blogID));
        const axiosOption = {
            url: `http://localhost:8000/blogs/blog?id=${blogID}`,
            method: 'get',
            responseType: 'json',            
        };
        return axios(axiosOption)
                .then(
                    (response) => {
                        dispatch(receiveBlog(blogID, response.data));
                        //console.log('response:',response.data)
                        dispatch(receiveError(blogID, 'error'));
                    }
                )
                .catch(
                    (err) => {
                       // dispatch(receiveError(blogID, err));
                        console.log('error:', err)
                    }
                )
    });
};

const fetchAllBlogInfo = () => {
    return (dispatch => {
        const axiosOption = {
            url: `http://localhost:8000/blogs`,
            method: 'get',
            responseType: 'json',            
        };
        return axios(axiosOption)
                .then(
                    (response) => {
                        dispatch(receiveAllBlogInfo(response.data));
                        //console.log('response:',response.data)

                    }
                )
                .catch(
                    (err) => {
                        console.log('error:', err)
                    }
                )
    });
};


const userLogin = (id, password) => {
    return (
        dispatch => {
            const userLoginForm = new FormData();
            userLoginForm.append('id', id);
            userLoginForm.append('password', password);
            const axiosOption = {
                url: `http://localhost:8000/user/login`,
                method: 'post',
                responseType: 'json',
                headers:{ 'content-type': 'multipart/form-data'},
                data: userLoginForm,
            };
            return axios(axiosOption)
            .then(
                (response) => {
                    console.log('user response:', response)
                    dispatch(receiveUserInfo());
                }
            )
            .catch(
                (err) => {
                    console.log('user error:', err)
                }
            )

        }
    );
};

//Reducers
const selectBlog = (state={}, action) => {
    switch (action.type) {
        case actionType.RECEIVE_BLOG:
            return ({   
                selectedBlogId: action.blogID,
                blogContent: action.blogContent,
                receivedAt: action.receivedAt,
            });
            break;
        case actionType.RECEIVE_ERROR:
        console.log('counter error')
        return ({ ...state, blogReceivedFail: action.blogID, error: action.error });

        default:
            return state;
            break;
    }
};

const receiveAllBlog = (state=[], action) => {
    switch (action.type) {
        case actionType.RECEIVE_ALL_BLOG_INFO:
            return([
                ...action.blogsInfo,
            ]);
            break;
    
        default:
        return state;
            break;
    }
};

const userStatus = (state={}, action) => {
    switch (action.type) {
        case actionType.RECEIVE_USERINFO:
            return {user: action.user, status: action.status};
            break;
        case actionType.User_Logout:
            return {user: null, status: action.status}
            break;
        default:
            return state
            break;
    }
};


const blogApp = combineReducers({
    selectBlog,
    receiveAllBlog,
    userStatus,

});


const loggerMiddleware = createLogger();
const store = createStore(
    blogApp,
    applyMiddleware(thunkMiddleware)
  );

  /*
  console.log('Initial state:',store.getState());

store.dispatch(fetchBlog('11a44683-f25d-4de2-b5b3-c45f4d79146a')).then(()=>{
 console.log('APP state1:', store.getState())
    
})
store.dispatch(fetchBlog('272f9a69-37ed-4b63-ac4b-122ab648d9c6')).then(()=>{
    console.log('APP state2:', store.getState())
       
   })
   

store.dispatch(fetchAllBlogInfo()).then( ()=>{
    console.log('App state3', store.getState())
});




store.dispatch(userLogin('teresa', '0506')).then( ()=>{
    console.log('App state', store.getState())
});
*/

// store.dispatch(fetchAllBlogInfo()).then( ()=>{
//     console.log('App state3', store.getState())
// });
store.dispatch(fetchBlog('11a44683-f25d-4de2-b5b3-c45f4d79146a')).then(()=>{
    console.log('APP state1:', store.getState())
       
   })
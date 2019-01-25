import axios from 'axios'

export const actionType = {
    User_Login : 'User_Login',
    User_Logout : 'User_Logout',
    User_Login_Fail: 'User_Login_Fail',
    Select_Blog: 'Select_Blog',
    Update_Blog: 'Update_Blog',
    Upload_A_Blog: 'Upload_A_Blog',
    Delete_Blog: 'Delete_Blog',
    RECEIVE_USERINFO: 'RECEIVE_USERINFO',
    REQUEST_BLOG: 'REQUEST_BLOG',
    RECEIVE_BLOG: 'RECEIVE_BLOG',
    RECEIVE_ERROR: 'RECEIVE_ERROR',
    RECEIVE_ALL_BLOG_INFO: 'RECEIVE_ALL_BLOG_INFO',
    Should_Refresh: 'Should_Refresh',
    Should_Not_Refresh: 'Should_Not_Refresh', 
};


// user actions
export const receiveUserInfo = (userID, userName)=>{
    return({
        type: actionType.RECEIVE_USERINFO,
        status: 'LOGIN',
        userID: userID,
        userName: userName,
    });
};

export const userLogout = ()=>{
    return({
        type: actionType.User_Logout,
        userID: null,
        userName: '訪客',
        status: 'LOGOUT',
    })    
}

export const userLoginError = (error) =>{
    return({
        type: actionType.User_Login_Fail,
        userID: null,
        userName: '訪客',
        status: error,
    });
}

// blogs management
const receiveAllBlogInfo = (data) =>{
    return({
        type: actionType.RECEIVE_ALL_BLOG_INFO,
        blogsInfo: data,
    });
};

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

export const refresh = () =>{
    return({
        type: actionType.Should_Refresh
    });
}

export const notRefresh = () =>{
    return({
        type: actionType.Should_Not_Refresh
    });
}

export  const  fetchBlog =   (blogID) => {
    return (dispatch => {
        const axiosOption = {
            url: `http://localhost:8000/blogs/blog?id=${blogID}`,
            method: 'get',
            responseType: 'json',            
        };
        return   axios(axiosOption)
                .then(
                    async (response) => (response.data)
                )
                .then(
                    async (data) => {
                        // console.log('data',data)
                      return  dispatch(receiveBlog(blogID, data))

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

export const fetchAllBlogInfo = () => {
    return (dispatch => {
        const axiosOption = {
            url: `http://localhost:8000/blogs`,
            method: 'get',
            responseType: 'json',            
        };
        return axios(axiosOption)
                .then(
                    async (response) => (response.data)
                ).then(
                    async (data)=>{
                        dispatch(receiveAllBlogInfo(data));
                    }
                )
                .catch(
                    (err) => {
                        console.log('error:', err)
                    }
                )
    });
};


// export const userLogin = (id, password) => {
//     return (
//         dispatch => {
//             const userLoginForm = new FormData();
//             userLoginForm.append('id', id);
//             userLoginForm.append('password', password);
//             const axiosOption = {
//                 url: `http://localhost:8000/user/login`,
//                 method: 'post',
//                 responseType: 'json',
//                 headers:{ 'content-type': 'multipart/form-data'},
//                 data: userLoginForm,
//             };
//             return axios(axiosOption)
//             .then(
//                 (response) => {
//                     console.log('user response:', response)
//                     if (response.data == 'successful authentication'){
//                         dispatch(receiveUserInfo(id));
//                         dispatch(userLoginError(null));
//                     }
//                     else if(response.data == 'Wrong password!'){
//                         dispatch(userLoginError('Wrong password!'));
//                         console.log(response.data)
//                     }
//                     else{
//                         dispatch(userLoginError('User ID not found!'));
//                         console.log(response.data)

//                     }
//                 }
//             )
//             .catch(
//                 (err) => {
//                     console.log('user error:', err)
//                 }
//             )

//         }
//     );
// };

//Reducers
export const selectBlog = (state={}, action) => {
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

export const receiveAllBlog = (state=[], action) => {
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

export const userStatus = (state={}, action) => {
    switch (action.type) {
        case actionType.RECEIVE_USERINFO:
            return {userID: action.userID, userName: action.userName, status: action.status};
            break;
        case actionType.User_Logout:
            return {userID: null, userName: null, status: action.status}
            break;
        case actionType.User_Login_Fail:
            return {error: action.status}
            break;
        default:
            return state
            break;
    }
};
export const refreshStatus = (state={}, action) =>{
    switch (action.type) {
        case actionType.Should_Refresh:
            return {refresh: true}
            break;
        case actionType.Should_Not_Refresh:
            return {refresh: false}
            break;
        default:
            return {refresh: false}
            break;
    }
}
import actions from './actions';

const { Register_User } = actions; 

const registerUser = (id, userName, password) => {

    return ({
        type: Register_User,
        id,
        userName,
        password,
    });
}
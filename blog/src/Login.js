import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {  receiveUserInfo, userLoginError }  from './reducers/index';
import { stat } from 'fs';
import axios from 'axios'

const RegisterLink = props => (<Link to="/register" {...props} />);

const styles = theme => ({
    loginform:{
        marginTop: '15vh',
        height: '70vh',
        borderRadius: 3,
        border: 0,
        padding: '0 30px',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',     
    },
    formtitle:{
        marginTop: '5vh',
        color: 'white',

    },
    formitem:{
        marginTop: '5vh',
        marginLeft: theme.spacing.unit*3,
        color: 'white',

    },
    formbutton: {
        marginTop: '5vh',
        color: 'white',

    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { id: null, password: null, error: null, };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    handleSubmit =  event => {
        const {dispatch, userStatus} = this.props;
        const userLoginForm = new FormData();
        userLoginForm.append('id', this.state.id);
        userLoginForm.append('password', this.state.password);
        const axiosOption = {
            url: `http://localhost:8000/user/login`,
            method: 'post',
            responseType: 'json',
            headers:{ 'content-type': 'multipart/form-data'},
            data: userLoginForm,
        };
        axios(axiosOption).then(
            (response) => {
                    return response.data               
            }
        )
        .then(
            (res) => {
                if(res.msg == 'successful authentication'){
                    dispatch(receiveUserInfo(this.state.id, res.userName));
                    // dispatch(userLoginError(null));
                    this.props.history.push("/");
                    console.log('user state:', this.props.userStatus)
                }
                else if(res.msg == 'Wrong password!'){
                    dispatch(userLoginError('Wrong password!'));
                    this.setState({error: '密碼輸入錯誤'});
                    window.alert('密碼輸入錯誤');
                }
                else if(res.msg == 'User ID not found!'){
                    dispatch(userLoginError('User ID not found!'));
                    this.setState({error:'此使用者帳號不存在'});
                    window.alert('此使用者帳號不存在');

                }
                else{
                    window.alert('空格皆為必填');
                }
            }
        )
        .catch(
            (err) => {
                console.log('user error:', err)
            }
        )
      }
    render() {
        const { classes, } = this.props;
        return (
            <Grid container spacing={0} >
                <Grid item xs={1} sm={3}></Grid>
                <Grid item xs={10} sm={6}>
                    <Paper className={classes.loginform}>
                        <Grid container >
                            <Grid item xs={12} >
                            <Grid container>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                <Typography align="center" variant="headline" className={classes.formtitle}>
                                    Login
                                </Typography>
                                </Grid>
                                <Grid item xs={4}></Grid>
                            </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={0} sm={2} lg={3}></Grid>
                                    <Grid item xs={12} sm={8} lg={6}>
                                        <Typography  align="left" variant="subheading" className={classes.formitem}>
                                            User Id
                                        </Typography>
                                        <TextField style={{width: '100%',}} onChange={this.handleChange('id')}/>
                                    </Grid>
                                    <Grid item xs={0} sm={2} lg={3}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={0} sm={2} lg={3}></Grid>
                                    <Grid item xs={12} sm={8} lg={6}>
                                         <Typography  align="left" variant="subheading" className={classes.formitem}>
                                            Password
                                        </Typography>
                                        <TextField style={{width: '100%',}} onChange={this.handleChange('password')}  helperText={this.state.error}/>
                                    </Grid>
                                    <Grid item xs={0} sm={2} lg={3}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={2} sm={4} lg={5}></Grid>
                                    <Grid item xs={8} sm={4} lg={2}>
                                    <Button className={classes.formbutton} fullWidth="true" onClick={this.handleSubmit}>
                                        Login
                                    </Button>
                                    <Button className={classes.formbutton} fullWidth="true" style={{marginTop: '1vh',}} component={RegisterLink}>
                                        Register
                                    </Button>
                                    </Grid>
                                    <Grid item xs={2} sm={4} lg={5}></Grid>
                                </Grid>
                            </Grid>
                        </Grid> 
                    </Paper>
                </Grid>
                <Grid item xs={1} sm={3} ></Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) =>{
    return ({
        userStatus: state.userStatus,
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        dispatch: dispatch,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
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
import axios from 'axios';
const LoginLink = props => (<Link to="/login" {...props} />);

const styles = theme => ({
    root:{
        height: '100vh',
    },
    registerform:{
        marginTop: '15vh',
        height: '70vh',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { id: null,username: null, password: null, };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);        
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit =  event => {
        const userRegisterForm = new FormData();
        userRegisterForm.append('id', this.state.id);
        userRegisterForm.append('name', this.state.username);
        userRegisterForm.append('password', this.state.password);
        const axiosOption = {
            url: `http://localhost:8000/user/register`,
            method: 'post',
            responseType: 'json',
            headers:{ 'content-type': 'multipart/form-data'},
            data: userRegisterForm  ,
        };
        axios(axiosOption).then(
            (response) => {
                // console.log('user response:', response)
                if (response.data == 'User added Successfully!'){
                    window.alert('成功註冊！');
                    this.props.history.push("/login");
                }
                else if(response.data == 'This id has already been used.'){
                    window.alert('此ID已有人使用！');
                    // console.log(response.data)
                }
                else if(response.data == 'blank'){
                    window.alert('空格皆為必填！');
                }
            }
        )
        .catch(
            (err) => {
                console.log('user error:', err)
            }
        )
      };
    render() {
        const { classes, } = this.props;
        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={1} sm={3}></Grid>
                <Grid item xs={10} sm={6} >
                    <Paper className={classes.registerform}>
                        <Grid container >
                            <Grid item xs={12} >
                            <Grid container>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                <Typography align="center" variant="headline" className={classes.formtitle}>
                                    Register
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
                                        <TextField style={{width: '100%',}}  onChange={this.handleChange('id')} required/>
                                    </Grid>
                                    <Grid item xs={0} sm={2} lg={3}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={0} sm={2} lg={3}></Grid>
                                    <Grid item xs={12} sm={8} lg={6}>
                                        <Typography  align="left" variant="subheading" className={classes.formitem}>
                                            User Name
                                        </Typography>
                                        <TextField style={{width: '100%',}}  onChange={this.handleChange('username')} required/>
                                    </Grid>
                                    <Grid item xs={0} sm={2} lg={3}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={0} sm={2} lg={3}></Grid>
                                    <Grid item xs={12} sm={8} lg={6}>
                                         <Typography  align="left" variant="subheading" className={classes.formitem} >
                                            Password
                                        </Typography>
                                        <TextField style={{width: '100%',}}  onChange={this.handleChange('password')} required/>
                                    </Grid>
                                    <Grid item xs={0} sm={2} lg={3}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={2} sm={4} lg={5}></Grid>
                                    <Grid item xs={8} sm={4} lg={2}>
                                    <Button className={classes.formbutton} fullWidth="true" onClick={this.handleSubmit}>
                                        Register
                                    </Button>
                                    <Button className={classes.formbutton} fullWidth="true" style={{marginTop: '1vh',}} component={LoginLink}>
                                        Login
                                    </Button>
                                    </Grid>
                                    <Grid item xs={2} sm={4} lg={5}></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1} sm={3}  ></Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Register);
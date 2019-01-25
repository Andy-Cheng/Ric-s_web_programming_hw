import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { PlusCircleIcon } from 'mdi-react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import { connect } from 'react-redux';
import {userLogout, fetchAllBlogInfo} from '../reducers/index';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';

const styles = theme => ({
    appbar:{
        flexGrow:1,
        // backgroundColor: '#00838F',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 57,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        
    },
    flex: {
        flex:1,
        textAlign: 'center',
        color: 'white'
        
    },
    modalpaper: {
        marginTop: theme.spacing.unit *4,
        padding: theme.spacing.unit *2,
        height: '73vh',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
      },
      input:{
        display: 'none',
      },
    leftButton: {
        marginRight: theme.spacing.unit,
    },
    root:{
        color: 'white'
    }


});



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            anchorEl: null,
            openModal: false,
            inputValue: null,
            inputTitle: null,
         };
         this.handleInputSubmit = this.handleInputSubmit.bind(this);
         //this.handleUploadImage = this.handleUploadImage.bind(this);
    }
   logout = () => {
        const {userLogout} = this.props;
        const { status } = this.props.userStatus;
        if(status == 'LOGIN'){
            userLogout();
        }
        this.props.history.push("/login");
        
    }

    handleTitleChange = (event) => {
        this.setState({
            inputTitle: event.target.value,

        });
    };

    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value,

        });
    };

    handleInputSubmit(event) {
        const {userID, userName, status } = this.props.userStatus
        if(status == 'LOGIN'){
            if( !Boolean(this.state.inputTitle) ){
                alert('Title is required!！'); 
             }
             else if (!Boolean(this.state.inputValue)){
                alert('Content is required!！'); 
             }
             else{
                let newPostForm = new FormData();
                let uploadDate = new Date();
                newPostForm.append('title', this.state.inputTitle);
                newPostForm.append('date', `${uploadDate.getFullYear()}-${uploadDate.getMonth()+1}-${uploadDate.getDate()}`);
                newPostForm.append('author', userName);
                newPostForm.append('content', this.state.inputValue);
                newPostForm.append('authorID', userID);
                newPostForm.append('images', this.uploadInput.files[0]);
                console.log('user:',  this.props.userStatus)
                const axiosOption = {
                    url: `http://localhost:8000/blogs/upload`,
                    method: 'post',
                    responseType: 'json',
                    headers:{ 'content-type': 'multipart/form-data'},
                    data: newPostForm,
                };
                axios(axiosOption).then(
                    (response) => {
                        if (response.data == 'blog posted successfully') {
                            return response.data
                        }
                        else{
                            throw `response msg: ${response.data}`
                        }
                    }
                )
                .then(
                    (msg) => {
                        if(msg == 'blog posted successfully'){
                            alert( `Uploaded Successfully`);
                             this.setState({
                                 openModal: false,
                                 inputValue: null,
                                 inputTitle: null,
                             });
                            this.props.fetchAllBlogInfo();
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.log('error msg:', err)
                    }
                )
              }    
        }
        else{
            alert('Sign in first');
        }

     }
      
    handleModalClose = () => {
        this.setState({ openModal: false });
      };
    handleModalOpen = () => {
        this.setState({ openModal: true });
      };

    handleClick = event => {
        this.setState(
            {
                anchorEl: event.currentTarget,

            }
        );
    }

    handleClose = () => {
        this.setState(
            {
                anchorEl: null,
                
            }
        );
    }

    render() {
        const { classes, userStatus } = this.props;
        const { anchorEl, openModal } =this.state;
        const { status } = userStatus;
        return (
          
                <AppBar className={classes.appbar} >
                    <Toolbar>
                        <Typography variant="title"  noWrap variant="title" className={classes.flex}  >
                                {
                                    (userStatus.userName == null)?(`你好 訪客`):(`你好 ${userStatus.userName}`)
                                }
                        </Typography>
                        {(status == 'LOGIN')&&(
                        <IconButton onClick={this.handleModalOpen} >
                            <PlusCircleIcon />
                        </IconButton>
                        )}
                        <IconButton onClick={this.handleClick} >
                            <AccountCircle className={classes.root}/>
                        </IconButton>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={this.handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <Button onClick={this.logout}>
                                {(status == 'LOGOUT')? 'Login':'Logout'}
                            </Button>
                        </Popover>   
                    </Toolbar>
                    <Modal
                            onClose = {this.handleModalClose}
                            open={openModal}

                    >
                        <Grid container spacing={0}>
                            <Grid item  xs={2} lg={3} onClick={this.handleModalClose}>
                            </Grid>
                            <Grid item xs={8} lg={6}>
                                <Paper className={classes.modalpaper} > 
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                        <div>
                                            <textarea value={this.state.inputTitle} onChange={this.handleTitleChange} style={{ width: '99%', height: '5vh' }} placeholder={"What's your title"} />
                                        </div>
                                        <div>
                                            <textarea value={this.state.inputValue} onChange={this.handleInputChange} style={{ width: '99%', height: '60vh' }} placeholder={"What's your story"} />
                                        </div>
                                        <div style={{ flex: 1, }} />
                                        <div style={{ display: 'flex', flexGrow: 'row-wrap' }}>
                                            <div style={{ flex: 1, }} />
                                            <div>
                                            <input ref={(ref) => { this.uploadInput = ref; }} type="file" id='contained-button-file' className={classes.input} />
                                            <label htmlFor="contained-button-file" >
                                                <Button variant="contained" component="span" className={classes.leftButton} size='small'>
                                                    Image
                                                < AddToPhotos className={classes.rightIcon} />
                                                </Button>
                                            </label>
                                                <Button variant="contained" color="default" onClick={this.handleInputSubmit} size='small'>
                                                    Publish
                                                    <CloudUploadIcon className={classes.rightIcon}/>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                                
                            </Grid>
                            <Grid item xs={2} lg={3} onClick={this.handleModalClose}>
                                </Grid>
                            </Grid>
                    </Modal>
                </AppBar>

        );
    }
}

const mapStateToProps = (state) =>{
    return({
        userStatus: state.userStatus,
    });
}
const mapDispatchToProps = (dispatch) => {
    return({
        userLogout: () => {dispatch(userLogout)},
        fetchAllBlogInfo: () => {
            dispatch(fetchAllBlogInfo());
        },
    });
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
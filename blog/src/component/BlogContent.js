import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import img1 from './breakfast.jpg'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Modal from '@material-ui/core/Modal';
import { SquareEditOutlineIcon,ArrowLeftIcon, GridOffIcon } from 'mdi-react';
import { Link  } from 'react-router-dom'
import FileUpload from '@material-ui/icons/FileUpload';
import { connect } from 'react-redux'
import { fetchBlog } from '../reducers/index';
import axios from 'axios';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Home from '@material-ui/icons/Home';

const ArticlesLink = props => (<Link to="/" {...props} />);


const styles = theme => ({
    blogroot: {
        flexGrow:1,
        // height: '100vh'

    },
    paper: {
        padding: theme.spacing.unit*4 ,
        marginTop: '30px',
    
    },
    avatar:{
        
        marginTop: '50px',
        width: 60,
        height: 60,
        color: '#fff',
        backgroundColor: deepPurple[400],
    },
    articleMeta:{
        marginTop: theme.spacing.unit * 4,
        height: '80%',
    },

    artilcetitle:{
        color: theme.palette.grey['700'],
    },
    modalpaper: {
        marginTop: theme.spacing.unit *4,
        padding: theme.spacing.unit *2,
        height: '75vh',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
      },
      input: {
        display: 'none',
      },
      button:{
          marginRight: theme.spacing.unit,
      },
      contentImg:{
        width: '100%',
        height: 'auto',
      },
      icon:{
          position: 'fixed',
          color: theme.palette.grey['800'],
      },
});


class BlogContent extends Component {
    constructor(props) {
        super(props);
        const { blogContent, userStatus } = this.props;

        this.state = {  inputTitle: null ,inputValue: null,
        openModal: false, ownsit:  false,
                    
        };
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        
    }

    componentWillMount(){
        const { getTheBlog } = this.props;
        const {blogId} = this.props.match.params;
        getTheBlog(blogId);
        // console.log('id', blogContent.authorID, userStatus.userID)
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
        const {blogId} = this.props.match.params;
        const { blogContent, userStatus, getTheBlog} = this.props;

        if(blogContent.authorID == userStatus.userID){
            if( !Boolean(this.state.inputTitle) ){
                alert('Title is required!！'); 
     
             }
             else if (!Boolean(this.state.inputValue)){
                alert('Content is required!！'); 

             }
             else{
    
                let modifiedPostForm = new FormData();
                let uploadDate = new Date();
                modifiedPostForm.append('title', this.state.inputTitle);
                modifiedPostForm.append('date', `${uploadDate.getFullYear()}-${uploadDate.getMonth()+1}-${uploadDate.getDate()}`);
                modifiedPostForm.append('content', this.state.inputValue);
                modifiedPostForm.append('id', this.props.match.params.blogId);
                const axiosOption = {
                    url: `http://localhost:8000/blogs/modify`,
                    method: 'post',
                    responseType: 'json',
                    headers:{ 'content-type': 'multipart/form-data'},
                    data: modifiedPostForm,
                };
                axios(axiosOption).then(
                    (response) => {
                        if (response.data == 'update the blog successfully') {
                            return response.data
                        }
                        else{
                            throw `response msg: ${response.data}`
                        }
                    }
                )
                .then(
                    (msg) => {
                        if(msg == 'update the blog successfully'){
                            console.log( 'Updated successfully！');
                             this.setState({
                                 openModal: false,
                                 inputValue: null,
                                 inputTitle: null,
                             });
                             getTheBlog(blogId);
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
            alert('You have no right');
        }

    //     if( !Boolean(this.state.inputTitle)|| !Boolean(this.state.inputValue)){
    //        alert('標題跟內文是必填喔！'); 

    //     }
    //     else{
    //     alert( `你已修改成功！`);
    //     console.log('uploadfile:', this.uploadInput.files[0].name)
    //     this.setState({
    //         openModal: false,

    //     });
    // }
      }

    handleModalClose = () => {
        this.setState({ openModal: false });
      };
    handleModalOpen = () => {
        const { blogContent } = this.props;
        this.setState({ 
            inputTitle: blogContent.title,
            inputValue: blogContent.content,
            openModal: true });
      };

    render() {
        // const {blogId} = this.props.match.params;
        const { blogContent, receivedAt, classes , userStatus} = this.props;       
        const { openModal, ownsit } = this.state;
        // console.log('blogContent', blogContent)
        let imgUrl = (blogContent.images == 'null')? (null):(`http://127.0.0.1:8000/images/${blogContent.images}`);        
        return (
            <Grid container spacing={0} className={classes.blogroot}  >
                <Grid item xs={12}>
                    <Grid container spacing={0}> 
                        <Grid item xs={4} md={3} sm={2} xl={1} >
                            <Grid container spacing={0}>
                                <Grid item lg={8} md={6} sm={4} xs={4} >
                                    <IconButton component={ArticlesLink} >
                                        <Home  className={classes.icon}/>
                                    </IconButton>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <Avatar alt={blogContent.author} className={classes.avatar} >
                                        {blogContent.author[0]}
                                    </Avatar>
                                </Grid> 
                                <Grid  xs={1} lg={0}></Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} md={8} >
                            <div className={classes.articleMeta} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} >
                                <div>
                                    <Typography variant='display1'>
                                        {blogContent.author}
                                    </Typography>
                                </div>
                                <div >
                                    <Typography variant=''>
                                        {blogContent.authorID}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant=''>
                                        {blogContent.date}
                                    </Typography>
                                </div>


                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Grid container spacing={0}>
                        <Grid item xs={1} md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={10} md={8} lg={6} xl={4}>
                            <Paper className={classes.paper}>           
                                {
                                    (blogContent.authorID == userStatus.userID) && (
                                        <IconButton onClick={this.handleModalOpen} >

                                            <SquareEditOutlineIcon />
                                        </IconButton>

                                    )
                                }
                                <Grid container spacing={0}>
                                    <Grid item xs={0} lg={1}></Grid>
                                    <Grid item xs={12} lg={10}>
                                        {
                                            (imgUrl != null)? (
                                                <img src={imgUrl} alt="This image can't be displayed." className={classes.contentImg}/>
                                            ):
                                            (null)
                                        }
                                    </Grid>
                                    <Grid item xs={0} lg={1}></Grid>
                                </Grid>
                                <Typography variant='title' align='center' className={classes.artilcetitle} >

                                    {blogContent.title}

                                </Typography>
                                <Typography variant='body1' >
                                    {blogContent.content}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={1} md={2} lg={3} xl={4}></Grid>

                    </Grid>

                </Grid>
                <Modal
                            onClose = {this.handleModalClose}
                            open={openModal}

                    >
                        <Grid container spacing={0}>
                            <Grid item  xs={2} lg={3} onClick={this.handleModalClose}>
                            </Grid>
                            <Grid item xs={8} lg={6}>
                                <Paper className={classes.modalpaper} > 
                                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                        <div>
                                        <textarea value={this.state.inputTitle} onChange={this.handleTitleChange} style={{width: '99%', height:'5vh'}} placeholder={"What's your title"} />
                                        </div>
                                        <div>
                                        <textarea value={this.state.inputValue} onChange={this.handleInputChange} style={{width: '99%', height:'60vh'}} placeholder={"What's your story"} />
                                        </div>
                                        <div style={{flex:1,}}/>
                                        <div style={{display: 'flex', flexGrow: 'row-wrap'}}>
                                        <div style={{flex:1,}}/>
                                        <div>
                                            <Button variant="contained" color="default"  onClick={this.handleInputSubmit}>
                                                Modify
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
                    <Grid item xs={12}>
                        <div style={{  height:'10vh' }}>
                        </div>
                    </Grid>

            </Grid>
        );
    }
}

const mapStateToProps = (state) =>{
    const { selectBlog } = state;
    return({
        blogContent: selectBlog.blogContent,
        receivedAt: selectBlog.receivedAt,
        userStatus: state.userStatus,
    });

};

const mapDispatchToProps = (dispatch) => {
    return({
        getTheBlog: (blogID)=> {dispatch(fetchBlog(blogID))},
    });
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BlogContent));
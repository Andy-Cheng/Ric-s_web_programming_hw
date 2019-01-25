import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import img1 from './breakfast.jpg'
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchAllBlogInfo } from  '../reducers/index'
import Clear from '@material-ui/icons/Clear';
import { stat } from 'fs';
import axios from 'axios';

const uuidv4 = require('uuid/v4');


const styles = theme => ({
    frameroot:{
        marginTop: '56px',
        // backgroundColor: theme.palette.grey['200'],
        
    },
    item: {
    },
});


const ArticleListItem = ({author, title, img ,blogId, authorID, userID, fetchAllBlogInfo , className}) => {

    let imgUrl = (img == 'null')? (`http://127.0.0.1:8000/images/default.png`):(`http://127.0.0.1:8000/images/${img}`);

    let ArticleLink = props => (<Link to={`/article/${blogId}`} {...props} />);
    
    const handleDelete= () =>{
        let deleteForm = new FormData();
        deleteForm.append('id', blogId);
        const axiosOption = {
            url: `http://localhost:8000/blogs/blog`,
            method: 'delete',
            headers:{ 'content-type': 'multipart/form-data'},
            responseType: 'json',
            data: deleteForm,            
        };
        axios(axiosOption)
            .then(
                async (response) => (response.data)
            )
            .then(
                async (msg)=>{
                    if(msg == 'delete the blog successfully'){
                        alert('Delete the blog successfully');
                        fetchAllBlogInfo();
                    }
                }
            )
            .catch(
                (error) => {
                    console.log('delete error:', error)
                }
            )
    };

    return(
        <Grid item xs={ 12 }   >
            {
                (authorID == userID)&&(
                    <ButtonBase onClick={handleDelete}>
                        <Clear/>
                    </ButtonBase>
                )
            }
            <Button component={ArticleLink} >
                <Paper classes={className}>
                    <img src={imgUrl} style={{width: '100%', height: 'auto'}} />
                    <Typography variant='title' align='center'>
                        {title}
                    </Typography>
                    <Typography variant='' color='textSecondary'>
                        {author}
                    </Typography>
                </Paper>
            </Button>
            
        </Grid>
    );
};



class ArticleFrame extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount(){
        const { fetchAllBlogInfo } = this.props;
        fetchAllBlogInfo();
    }

    render() {

        const { classes, blogs, userID, fetchAllBlogInfo } = this.props;
        // console.log('blogs":', blogs)
        return (
            <div className={classes.frameroot} >            
            <div style={{height:'15px'}}/>
            <Grid container> 
                <Grid item xs={1} lg={3} xl={4} />
                <Grid item xs={10} lg={6} xl={4} > 
                <Grid container spacing={ 0 } justify="center">    
                    {
                    blogs.reverse().map(
                    blog=>(
                        <ArticleListItem key={blog.id} blogId={blog.id} author={blog.author} title={blog.title} img={blog.images}  authorID={blog.authorID} userID={userID} fetchAllBlogInfo={fetchAllBlogInfo} className={classes.item}/>
                    ))
                }
                </Grid>
                </Grid>
                <Grid item xs={1} lg={3} xl={4} />
                <Grid item xs={12}>
                        <div style={{  height:'10vh', }}>
                        </div>
                    </Grid>
            </Grid>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { receiveAllBlog } = state;
    return ({
        blogs: receiveAllBlog,
        userID: state.userStatus.userID,
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchAllBlogInfo: () => {
            dispatch(fetchAllBlogInfo());
        },
    });
};



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ArticleFrame)) ;



import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './component/Header';
import ArticleFrame from './component/ArticleFrame';
import BlogContent from './component/BlogContent';
import LoginPage from './Login';
import RegisterPage from './Register';
import { Route, Switch  } from 'react-router-dom'


const ArticleOverview = ({history}) => (
    <div>
        <Header history={history}/>
        <ArticleFrame/>
    </div>
);

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
                <Switch>
                    <Route  exact path='/'   component={ArticleOverview}/>
                    <Route  path='/article/:blogId'  component={BlogContent}/>
                    <Route  exact path='/login'  component={LoginPage}/>
                    <Route  exact path='/register'  component={RegisterPage}/>
                </Switch>
        );
    }
}

export default Layout;
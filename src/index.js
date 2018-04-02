import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, hashHistory, Switch} from "react-router-dom";
import UserAddPage from './pages/UserAdd';
import HomePage from './pages/Home';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';
import BookListPage from './pages/BookList';
import BookAddPage from './pages/BookAdd';
import BookEditPage from './pages/BookEdit';
import LoginPage from './pages/Login';
import HomeLayout from './layouts/HomeLayout';

ReactDOM.render((
    <Router history={hashHistory}>
        <div>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <HomeLayout>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/user/add" component={UserAddPage}/>
                    <Route path="/user/list" component={UserListPage}/>
                    <Route path="/user/edit/:id" component={UserEditPage}/>
                    <Route path="/book/list" component={BookListPage}/>
                    <Route path="/book/add" component={BookAddPage}/>
                    <Route path="/book/edit/:id" component={BookEditPage}/>
                </HomeLayout>
            </Switch>
        </div>
    </Router>
), document.getElementById('app'))
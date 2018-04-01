import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, hashHistory} from "react-router-dom";
import UserAddPage from './pages/UserAdd';
import HomePage from './pages/Home';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';
import BookListPage from './pages/BookList';
import BookAddPage from './pages/BookAdd';

ReactDOM.render((
    <Router history={hashHistory}>
        <div>
            <Route exact path="/" component={HomePage}/>
            <Route path="/user/add" component={UserAddPage}/>
            <Route path="/user/list" component={UserListPage}/>
            <Route path="/user/edit/:id" component={UserEditPage}/>
            <Route path="/book/list" component={BookListPage}/>
            <Route path="/book/add" component={BookAddPage}/>
        </div>
    </Router>
), document.getElementById('app'))
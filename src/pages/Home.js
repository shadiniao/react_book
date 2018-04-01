import React, {Component} from 'react';
import {Link} from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

class Home extends Component {
    render() {
        return (
            <HomeLayout title="Welcome">
                <Link to="/user/list">list user</Link>
                <br/>
                <Link to="/user/add">add user</Link>
                <br/>
                <Link to="/book/list">list book</Link>
                <br/>
                <Link to="/book/add">list add</Link>
                <br/>
            </HomeLayout>
        );
    }
}

export default Home;
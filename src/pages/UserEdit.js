import React, {Component} from 'react';
import HomeLayout from "../layouts/HomeLayout";
import UserEditor from '../components/UserEditor';
import {get, del} from '../utils/request';

export default class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentWillMount() {
        const userId = this.props.match.params.id;
        get(`http://localhost:3000/user/${userId}`)(this.props.history).then(res => {
            this.setState({user: res});
        });
    }

    render() {
        const {user} = this.state;
        return (user
            ? <UserEditor {...this.props} editTarget={user}/>
            : 'loading...');
    }
}
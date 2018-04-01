import React, {Component} from 'react';
import HomeLayout from "../layouts/HomeLayout";
import UserEditor from '../components/UserEditor';

export default class UserAdd extends Component {
    render() {
        return (
            <HomeLayout title="user add">
                <UserEditor {...this.props} />
            </HomeLayout>
        );
    }
}
import React, {Component} from 'react';
import HomeLayout from "../layouts/HomeLayout";
import UserEditor from '../components/UserEditor';

export default class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentWillMount() {
        const userId = this.props.match.params.id;
        fetch(`http://localhost:3000/user/${userId}`)
            .then(res => res.json())
            .then(res => {
                this.setState({user: res});
            });
    }

    render() {
        const {user} = this.state;
        return (
            <HomeLayout title="user update">
                {user
                    ? <UserEditor {...this.props} editTarget={user}/>
                    : 'loading...'}
            </HomeLayout>
        );
    }
}
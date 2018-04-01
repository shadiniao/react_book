import React, {Component} from 'react';
import HomeLayout from "../layouts/HomeLayout";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        };
    }

    componentWillMount() {
        fetch('http://localhost:3000/user')
            .then(res => res.json())
            .then(res => {
                this.setState({userList: res});
            });
    }

    handleEdit(user) {
        this.props.history.push(`/user/edit/${user.id}`);
    }

    handleDel(user) {
        const confirmed = window.confirm(`确定要删除用户${user.name}吗?`);

        if (confirmed) {
            fetch(`http://localhost:3000/user/${user.id}`, {method: 'delete'})
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        userList: this
                            .state
                            .userList
                            .filter(item => item.id !== user.id)
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('delete error');
                })
        }
    }

    render() {
        const {userList} = this.state;
        return (
            <HomeLayout title="user list">
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>user name</th>
                            <th>gender</th>
                            <th>age</th>
                            <th>operat</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userList.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <a href="javascript:void(0)" onClick={() => this.handleEdit(user)}>edit</a>&nbsp;
                                        <a href="javascript:void(0)" onClick={() => this.handleDel(user)}>delete</a>
                                    </td>
                                </tr>
                            );
                        })
}
                    </tbody>
                </table>
            </HomeLayout>
        );
    }
}

export default UserList;
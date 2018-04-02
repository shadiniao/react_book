import React, {Component} from 'react';
import HomeLayout from "../layouts/HomeLayout";
import {get, del} from '../utils/request';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: []
        };
    }

    componentWillMount() {
        get('http://localhost:3000/book')(this.props.history).then(res => {
            this.setState({bookList: res});
        });
    }

    handleEdit(book) {
        this
            .props
            .history
            .push(`/book/edit/${book.id}`);
    }

    handleDel(book) {
        const confirmed = window.confirm(`确定要删除图书${book.name}吗?`);

        if (confirmed) {
            del(`http://localhost:3000/book/${book.id}`)(this.props.history).then(res => {
                this.setState({
                    bookList: this
                        .state
                        .bookList
                        .filter(item => item.id !== book.id)
                });
            }).catch(error => {
                console.log(error);
                alert('delete error');
            })
        }
    }

    render() {
        const {bookList} = this.state;
        return (
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>book name</th>
                        <th>price</th>
                        <th>owner_id</th>
                        <th>operat</th>
                    </tr>
                </thead>

                <tbody>
                    {bookList.map(book => {
                        return (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.price}</td>
                                <td>{book.owner_id}</td>
                                <td>
                                    <a href="javascript:void(0)" onClick={() => this.handleEdit(book)}>edit</a>&nbsp;
                                    <a href="javascript:void(0)" onClick={() => this.handleDel(book)}>delete</a>
                                </td>
                            </tr>
                        );
                    })
}
                </tbody>
            </table>
        );
    }
}

export default BookList;
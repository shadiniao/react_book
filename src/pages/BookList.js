import React, {Component} from 'react';
import {message, Table, Button, Popconfirm} from 'antd';
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
                message.error('delete error');
            })
        }
    }

    render() {
        const {bookList} = this.state;
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            }, {
                title: 'book name',
                dataIndex: 'name'
            }, {
                title: 'price',
                dataIndex: 'price'
            }, {
                title: 'owner_id',
                dataIndex: 'owner_id'
            }, {
                title: 'operat',
                render: (text, record) => (
                    <Button.Group>
                        <Button type="primary"  onClick={() => this.handleEdit(record)} icon="edit" />
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                            <Button type="primary"  icon="delete"/>
                        </Popconfirm>
                    </Button.Group>
                )
            }

        ]
        return (<Table columns={columns} dataSource={bookList} rowKey={row => row.id}/>);
    }
}

export default BookList;
import React, {Component} from 'react';
import BookEditor from '../components/BookEditor';
import {get, del} from '../utils/request';

export default class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: null
        };
    }

    componentWillMount() {
        const bookId = this.props.match.params.id;
        if (!bookId) {
            return;
        }
        get(`http://localhost:3000/book/${bookId}`)(this.props.history).then(res => {
            this.setState({book: res});
        });
    }

    render() {
        const {book} = this.state;
        return (book
            ? <BookEditor {...this.props} editTarget={book}/>
            : 'loading...');
    }
}
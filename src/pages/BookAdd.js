import React, {Component} from 'react';
import HomeLayout from "../layouts/HomeLayout";
import BookEditor from '../components/BookEditor';

export default class BookAdd extends Component {
    render() {
        return (
            <HomeLayout title="book add">
                <BookEditor {...this.props} />
            </HomeLayout>
        );
    }
}
import React, {Component} from 'react';

export default class FormItem extends Component {
    render() {
        const {label, children, valid, error} = this.props;
        return (
            <div>
                <label>{label}:</label>
                {children}
                {!valid && <div>{error}</div>}
            </div>
        );
    }
}
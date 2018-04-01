import React, {Component} from 'react';
import AutoComplete from './AutoComplete';
import FormItem from '../components/FormItem';
import formProvider from '../utils/formProvider';
import HomeLayout from '../layouts/HomeLayout';
import PropTypes from 'prop-types';

class BookEditor extends Component {
    constructor() {
        super();
        this.state = {
            recommendUsers: []
        };
        this.timer = 0;
        this.handleOwnerIdChange = this
            .handleOwnerIdChange
            .bind(this);
    }

    componentWillMount() {
        const {editTarget, setFormValues} = this.props;
        if (editTarget) {
            setFormValues(editTarget);
        }

    }

    getRecommendUsers(partialUserId) {
        fetch('http://localhost:3000/user?id_like=' + partialUserId)
            .then(res => res.json())
            .then(res => {
                if (res.length === 1 && res[0].id === partialUserId) {
                    return;
                }
                this.setState({
                    recommendUsers: res.map(user => {
                        return {text: `${user.id} ${user.name}`, value: user.id}
                    })
                })
            })
    }

    handleOwnerIdChange(value) {
        this
            .props
            .onFormChange('owner_id', value);
        this.setState({recommendUsers: []});

        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (value) {
            this.timer = setTimeout(() => {
                this.getRecommendUsers(value);
                this.timer = 0;
            }, 200);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const {
            form: {
                name,
                price,
                owner_id
            },
            formValid,
            editTarget
        } = this.props;

        if (!formValid) {
            alert('请填写正确的信息后重试');
            return;
        }

        let editType = 'add';
        let apiUrl = 'http://localhost:3000/book';
        let method = 'post';

        if (editTarget) {
            editType = 'update';
            apiUrl += `/${editTarget.id}`;
            method = 'put';
        }

        fetch(apiUrl, {
            method,
            body: JSON.stringify({name: name.value, price: price.value, owner_id: owner_id.value}),
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json()).then((res) => {
            if (res.id) {
                this
                    .props
                    .history
                    .push('/book/list');
                return;
            } else {
                alert('failed');
            }
        }).catch((err) => console.log(err));
    }
    render() {
        const {
            form: {
                name,
                price,
                owner_id
            },
            onFormChange
        } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <FormItem label="书名" valid={name.valid} error={name.error}>
                    <input
                        type="text"
                        name="name"
                        value={name.value}
                        onChange={(e) => onFormChange('name', e.target.value)}/>
                </FormItem>
                <FormItem label="价格" valid={name.valid} error={name.error}>
                    <input
                        type="text"
                        name="price"
                        value={price.value}
                        onChange={(e) => onFormChange('price', e.target.value)}/>
                </FormItem>
                <FormItem label="所有者" valid={owner_id.valid} error={owner_id.error}>
                    <AutoComplete
                        value={owner_id.value}
                        options={this.state.recommendUsers}
                        onValueChange={value => this.handleOwnerIdChange(value)}/>
                </FormItem>
            </form>
        );
    }
}

BookEditor = formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: value => {
                    return value.length > 0;
                },
                error: '请输入用户名'
            }
        ]
    },
    price: {
        defaultValue: 0,
        rules: [
            {
                pattern: value => {
                    return value > 0 && value < 200;
                },
                error: '请输入1~200的价格'
            }
        ]
    },
    owner_id: {
        defaultValue: '',
        rules: [
            {
                pattern: value => {
                    return !!value;
                },
                error: '请选择拥有人'
            }
        ]
    }
})(BookEditor);

export default BookEditor;
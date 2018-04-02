import React, {Component} from 'react';
import AutoComplete from './AutoComplete';
import request, {get} from '../utils/request';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    message
} from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 4
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
        }
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 2,
            offset: 10
        }
    }
};

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

    getRecommendUsers(partialUserId) {
        get('http://localhost:3000/user?id_like=' + partialUserId)(this.props.history).then(res => {
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
        const {form, editTarget} = this.props;

        form.validateFields((err, values) => {

            if (err) {
                message.warn('err');
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

            request(method, apiUrl, values)(this.props.history).then((res) => {
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
        });
    }
    render() {
        const {recommendUsers} = this.state;
        const {
            form,
            editTarget = {}
        } = this.props;
        const {getFieldDecorator} = form;
        return (
            <Form
                onSubmit={this.handleSubmit}
                style={{
                width: '400px'
            }}>
                <FormItem label="书名" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '请输入书名'
                            }
                        ],
                        initialValue: editTarget.name
                    },)(<Input type="text"/>)}
                </FormItem>
                <FormItem label="价格" {...formItemLayout}>
                    {getFieldDecorator('price', {
                        rules: [
                            {
                                required: true,
                                message: '请输入价格'
                            }, {
                                min: 1,
                                max: 999,
                                type: 'number',
                                message: 'please input 1~999 number'
                            }
                        ],
                        initialValue: editTarget.price
                    })(<InputNumber/>)}
                </FormItem>
                <FormItem label="所有者" {...formItemLayout}>
                    {getFieldDecorator('owner_id', {
                        rules: [
                            {
                                required: true,
                                message: '请输入所有者'
                            }
                        ],
                        initialValue: editTarget.owner_id
                    })(<AutoComplete
                        options={this.state.recommendUsers}
                        onChange={this.handleOwnerIdChange}/>)}

                </FormItem>

                <FormItem
                    wrapperCol={{
                    span: 12,
                    offset: 6
                }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

BookEditor = Form.create()(BookEditor);

export default BookEditor;
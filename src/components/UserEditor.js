import React, {Component} from 'react';
import request from '../utils/request';
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
            span: 4,
            offset: 4
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 6
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

class UserEditor extends Component {

    componentWillMount() {
        const {editTarget, form} = this.props;
        if (editTarget) {
            form.setFormValues(editTarget);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const {editTarget, form} = this.props;

        form.validateFields((err, values) => {
            if (err) {
                message.warn('err');
                return;
            }

            let editType = 'add';
            let apiUrl = 'http://localhost:3000/user';
            let method = 'post';

            if (editTarget) {
                editType = 'update';
                apiUrl += `/${editTarget.id}`;
                method = 'put';
            }

            request(method, apiUrl, form)(this.props.history).then((res) => {
                if (res.id) {
                    // this.setState({name: '', age: 0, gender: ''});
                    this
                        .props
                        .history
                        .push('/user/list');
                    return;
                } else {
                    alert('failed');
                }
            }).catch((err) => console.log(err));
        });
    }

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (

            <Form onSubmit={(e) => this.handleSubmit(e)}>
                <FormItem label="name" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input name!'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>

                <FormItem label="age" {...formItemLayout}>
                    {getFieldDecorator('age', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input age!'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>

                <FormItem label="gender" {...formItemLayout}>
                    {getFieldDecorator('gender', {
                        rules: [
                            {
                                required: true,
                                message: '请选择性别'
                            }
                        ]
                    })(
                        <Select placeholder="请选择">
                            <Select.Option value="male">男</Select.Option>
                            <Select.Option value="female">女</Select.Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        submit
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

UserEditor = Form.create()(UserEditor);

export default UserEditor;
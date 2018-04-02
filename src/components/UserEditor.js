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
            span: 8
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
            span: 16,
            offset: 8
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
                message.warn(err);
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

            request(apiUrl, method, form)(this.props.history).then((res) => {
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

            <form onSubmit={(e) => this.handleSubmit(e)}>
                <FormItem label="name" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input name!'
                            }
                        ]
                    })(<input type="text"/>)}
                </FormItem>

                <FormItem label="age" {...formItemLayout}>
                    {getFieldDecorator('age', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input age!'
                            }
                        ]
                    })(<input type="text"/>)}
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
                <FormItem>
                    <Button type="primary" htmlType="submit" {...tailFormItemLayout}>
                        submit
                    </Button>
                </FormItem>
            </form>
        );
    }
}

UserEditor = Form.create()(UserEditor);

export default UserEditor;
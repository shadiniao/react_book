import React, {Component} from 'react'
import {post} from '../utils/request';
import {Form, Icon, Input, Button, message} from 'antd';
import style from '../styles/login-page.less';
const FormItem = Form.Item;

class Login extends Component {
    constructor() {
        super();
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {
                    post('http://localhost:3000/login', values)(this.props.history).then(res => {
                        if (res) {
                            message.info('login success');
                            this
                                .props
                                .history
                                .push(`/`);
                        } else {
                            message.info('account or password error');
                        }
                    });
                }
            })

    }

    render() {
        const {form} = this.props;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = form;

        const accountError = isFieldTouched('account') && getFieldError('account');

        return (
            <div className={style.wrapper}>
                <div className={style.body}>
                    <header className={style.header}>Login</header>

                    <section className={style.form}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('account', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your account!'
                                        }
                                    ]
                                })(
                                    <Input prefix={< Icon type = "user" />} placeholder="account"/>
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!'
                                        }
                                    ]
                                })(
                                    <Input prefix={< Icon type = "lock" />} type="password" placeholder="password"/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className={style.btn}>
                                    Log in
                                </Button>
                            </FormItem>
                        </Form>
                    </section>
                </div>
            </div>
        )
    }
}

Login = Form.create()(Login);
export default Login;
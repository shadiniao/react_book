import React, {Component} from 'react';
import FormItem from '../components/FormItem';
import formProvider from '../utils/formProvider';
import HomeLayout from '../layouts/HomeLayout';
import PropTypes from 'prop-types';

class UserEditor extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        const {editTarget, setFormValues} = this.props;
        if (editTarget) {
            setFormValues(editTarget);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const {
            form: {
                name,
                age,
                gender
            },
            formValid,
            editTarget
        } = this.props;

        if (!formValid) {
            alert('请填写正确的信息后重试');
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

        fetch(apiUrl, {
            method,
            body: JSON.stringify({name: name.value, age: age.value, gender: gender.value}),
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json()).then((res) => {
            if (res.id) {
                // this.setState({name: '', age: 0, gender: ''});
                this.props.history.push('/user/list');
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
                age,
                gender
            },
            onFormChange
        } = this.props;
        return (

            <form onSubmit={(e) => this.handleSubmit(e)}>
                <FormItem label="name" valid={name.valid} error={name.error}>
                    <input
                        type="text"
                        name="name"
                        value={name.value}
                        onChange={(e) => onFormChange('name', e.target.value)}/>
                </FormItem>
                <br/>
                <FormItem label="age" valid={age.valid} error={age.error}>
                    <input
                        type="number"
                        name="age"
                        value={age.value}
                        onChange={(e) => onFormChange('age', e.target.value, 'number')}/>
                </FormItem>
                <br/>
                <FormItem label="gender" valid={gender.valid} error={gender.error}>
                    <select
                        name="gender"
                        id="gender"
                        value={gender.value}
                        onChange={(e) => onFormChange('gender', e.target.value)}>
                        <option value=""></option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </FormItem>
                <br/>
                <input type="submit" value="submit"/>
            </form>
        );
    }
}

UserEditor = formProvider({
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
    age: {
        defaultValue: 0,
        rules: [
            {
                pattern: value => {
                    return value > 0 && value < 200;
                },
                error: '请输入1~200的年龄'
            }
        ]
    },
    gender: {
        defaultValue: '',
        rules: [
            {
                pattern: value => {
                    return !!value;
                },
                error: '请选择性别'
            }
        ]
    }
})(UserEditor);

export default UserEditor;
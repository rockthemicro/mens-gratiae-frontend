import React from 'react';
import axios from 'axios';
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import logInStatusAction from "../../actions/logInStatusAction";
import endpoints from '../endpoints';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    logInStatusAction: () => dispatch(logInStatusAction())
});

const Login = (props) => {
    const onFinish = values => {

        axios.get(endpoints.LOGIN, {
            params: {
                username: values.username,
                password: values.password
            }
        })
            .then((response) => {
                if (response.data.status === 'OK') {
                    props.logInStatusAction();
                    props.history.goBack();
                } else {
                    alert('Username or password are incorrect. Please try again');
                }
            })
            .catch(() => {
                alert('Sorry, an internal error occurred. Please try again later');
            });
    };

    return (
        <Form
            name="normal_login"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            size={"large"}
            style={{maxWidth: '400px', margin: '0 auto'}}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a href="" style={{float: 'right'}}>
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    Log in
                </Button>
                Or <a href="">register now!</a>
            </Form.Item>
        </Form>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
import React from "react";
import axios from "axios";
import { Form, Input, Button, InputNumber } from "antd";

const UserForm = ({closeForm}) => {
    const onFinish = (values) => {
        console.info('VALUES', values);
        axios.post('http://localhost:5000/users', values)
            .then(response => {
                closeForm();
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <Form
            name="addUser"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
                marginTop: '30px',
            }}
            onFinish={onFinish}
            >
            <Form.Item
                label="Username"
                name="name"
                rules={[
                {
                    required: true,
                    message: 'Please input the username!',
                },
                ]}
            >
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
                label="Age"
                name="age"
                style={{textAlign: 'left'}}
                rules={[
                {
                    required: false,
                },
                ]}
            >
                <InputNumber />
            </Form.Item>
            
            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                {
                    required: false,
                    type: "email"
                },
                ]}
            >
                <Input placeholder="email@example.com"/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                Add user
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UserForm;


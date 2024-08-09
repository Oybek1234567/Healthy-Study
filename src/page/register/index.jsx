import { Form, Input, Button, Select} from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
    const [data, setData] = useState();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log("Form values: ", values);

        try {
            const request = {
                phone: values.phone,
                password: values.password,
                name: values.name,
                surname: values.surname,
                dateOfBirth: values.dob,
                role: values.role,
            };

            console.log("Request data: ", request);

            const res = await axios.post(
                "http://localhost:3000/applications/create",
                request
            );

            setData(res.data);
            if(res.data) {
                navigate("/success")
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    label='Phone'
                    name='phone'
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}>
                    <Input
                        type='number'
                        className='border-2 border-black'
                        autoComplete='new-password'
                    />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}>
                    <Input.Password
                        className='border-2 border-black'
                        autoComplete='new-password'
                    />
                </Form.Item>
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[
                        { required: true, message: "Please input your name!" },
                    ]}>
                    <Input className='border-2 border-black' />
                </Form.Item>
                <Form.Item
                    label='Surname'
                    name='surname'
                    rules={[
                        {
                            required: true,
                            message: "Please input your surname!",
                        },
                    ]}>
                    <Input type='text' className='border-2 border-black' />
                </Form.Item>
                <Form.Item
                    label='Date Of Birth'
                    name='dob'
                    rules={[
                        { required: true, message: "Please select your birthday!" },
                    ]}>
                    <Input type='date' className='border-2 border-black' />
                </Form.Item>
                <Form.Item
                    label='Role'
                    name='role'
                    rules={[
                        { required: true, message: "Please select your role!" },
                    ]}>
                    <Select
                        className='w-full'
                        defaultValue={"super"}>
                        <Option value='super'>Super</Option>
                        <Option value='teacher'>O`qituvchi</Option>
                        <Option value='student'>Student</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='w-14 h-10 rounded-sm bg-green-700 text-white mt-10'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default App;

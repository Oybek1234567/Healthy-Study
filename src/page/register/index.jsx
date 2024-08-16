import { Form, Input, Button, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const App = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const requestData = {
                phone: values.phone,
                password: values.password,
                name: values.name,
                surname: values.surname,
                date_of_birth: values.date_of_birth,
                role: values.role,
                passport_series: values.passport_series,
                expiration_date: values.expiration_date,
            };

            console.log("Request data: ", requestData);

            const res = await axios.post(
                "http://localhost:3000/applications/create",
                JSON.stringify(requestData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data) {
                navigate("/success");
            }
        } catch (error) {
            if (!error.response) {
                console.error("Network error");
            } else {
                console.error("Error submitting form: ", error.response);
            }
        }
    };

    return (
        <>
            <Form onFinish={onFinish}>
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
                        {
                            min: 8,
                            message:
                                "Password must be at least 8 characters long!",
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
                    name='date_of_birth'
                    rules={[
                        {
                            required: true,
                            message: "Please select your birthday!",
                        },
                    ]}>
                    <Input type='date' className='border-2 border-black' />
                </Form.Item>
                <Form.Item
                    label='Role'
                    name='role'
                    rules={[
                        { required: true, message: "Please select your role!" },
                    ]}>
                    <Select className='w-full'>
                        <Option value='super'>Super</Option>
                        <Option value='teacher'>O`qituvchi</Option>
                        <Option value='student'>Student</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Passport Series' name='passport_series'>
                    <Input type='text' className='border-2 border-black' />
                </Form.Item>
                <Form.Item label='Expiration Date' name='expiration_date'>
                    <Input
                        type='date'
                        className='w-full border-2 border-black'
                    />
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

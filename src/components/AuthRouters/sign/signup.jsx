import { Form, Input } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const API = "http://localhost:3000";

    const onFinish = async (values) => {
        try {
            const requestData = {
                phone: values.phone,
                password: values.password,
                name: values.name,
                surname: values.surname,
                date_of_birth: values.date_of_birth,
                step: 1,
            };

            const res = await axios.post(
                `${API}/users/create`,
                JSON.stringify(requestData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );   
            console.log(res.data);
            
            if (res.data) {
                localStorage.setItem("signupID", res.data.user_id);
                localStorage.setItem("signupPhone", values.phone);
                navigate("/verify");
            }
        } catch (error) {
            console.error("Error submitting form: ", error.response || error);
        }
    };

    return (
        <div className='dark:bg-gray-900 pt-10 pb-20'>
            <div className='flex flex-col items-center  max-w-lg mx-auto bg-white shadow-lg border-2 border-gray-300 rounded-lg p-8'>
                <h2 className='text-3xl font-semibold text-center mb-6'>
                    Sign Up
                </h2>
                <Form layout='vertical' onFinish={onFinish} className='w-full'>
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
                            className='border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 w-full px-3 py-2 rounded-md'
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
                            className='border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 w-full px-3 py-2 rounded-md'
                            autoComplete='new-password'
                        />
                    </Form.Item>
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}>
                        <Input className='border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 w-full px-3 py-2 rounded-md' />
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
                        <Input
                            type='text'
                            className='border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 w-full px-3 py-2 rounded-md'
                        />
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
                        <Input
                            type='date'
                            className='border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 w-full px-3 py-2 rounded-md'
                        />
                    </Form.Item>
                    <Form.Item>
                        <button
                            type='submit'
                            className='w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'>
                            Submit
                        </button>
                    </Form.Item>
                </Form>
                <Link
                    to='/login'
                    className='underline mt-4 text-blue-600 hover:text-blue-800'>
                    Return to Login
                </Link>
            </div>
        </div>
    );
};

export default Signup;

import { Form, Input, Checkbox } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
    const API = "http://localhost:3000";
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`${API}/users/login`, {
                phone: values.phone,
                password: values.password,
            });
            const token = response.data.token;

            if (response.status === 200 && token) {
                localStorage.setItem("token", token);
                await axios.get(`${API}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Telefon raqam yoki parol xato!");
        }
    };

    return (
        <div className='dark:bg-gray-900 h-screen pt-32'>
            <div className='flex flex-col items-center mb-20 max-w-lg mx-auto bg-white shadow-lg border-2 border-gray-300 rounded-lg p-8'>
                <h2 className='text-3xl font-semibold text-center mb-6'>
                    Log In
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
                    <Form.Item>
                        <div className='flex items-center justify-between'>
                            <Link
                                to='/forgot_password'
                                className='text-sm text-blue-600 hover:underline'>
                                Forgot password?
                            </Link>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <button
                            type='submit'
                            className='w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'>
                            Sign In
                        </button>
                    </Form.Item>
                </Form>
                <p className='text-sm text-center mt-4'>
                    Don’t have an account yet?{" "}
                    <Link
                        to='/signup'
                        className='text-blue-600 hover:underline'>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;

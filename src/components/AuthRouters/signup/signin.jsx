import { Button, Form, Input, Checkbox } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
    const API = "http://localhost:3000";
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.post(
                `${API}/users/login`,
                {
                    phone: values.phone,
                    password: values.password,
                }
            );
            const token = response.data.token;
            console.log("Server javobi:", response.data);

            if (response.status === 200 && token) {
                
                localStorage.setItem("token", token);
                
             await axios.get(`${API}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
             });
             
                console.log(
                    "Token saved to localStorage:",
                    localStorage.getItem("token")
                );

                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Telefon raqam yoki parol xato!");
        }
    };

    return (
        <div className='bg-gray-50 dark:bg-gray-900'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <p className='flex items-center mb-6 text-2xl font-semibold text-white'>
                    Healthy Study
                </p>
                <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                            Sign in to your account
                        </h1>
                        <Form
                            name='signin'
                            className='space-y-4 md:space-y-6'
                            initialValues={{ remember: true }}
                            onFinish={onFinish}>
                            <Form.Item
                                name='phone'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your phone number!",
                                    },
                                ]}>
                                <Input
                                    type='number'
                                    placeholder='+998 99 999 99 99'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                />
                            </Form.Item>

                            <Form.Item
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}>
                                <Input.Password
                                    placeholder='••••••••'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                />
                            </Form.Item>

                            <Form.Item>
                                <div className='flex items-center justify-between'>
                                    <Form.Item
                                        name='remember'
                                        valuePropName='checked'
                                        noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <Link
                                        to='/forgot_password'
                                        className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                                        Forgot password?
                                    </Link>
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='w-full text-sm font-medium'>
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>
                        <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                            Don’t have an account yet?
                            <Link
                                to='/signup'
                                className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;

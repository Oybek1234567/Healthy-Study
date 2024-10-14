import { Form, Input } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
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
            alert("Foydalanuvchi ro'yxatdan o'tdi!")
            window.location.reload();

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
        <div className='mt-10 mb-10 max-w-lg mx-auto bg-white shadow-2xl border-2 border-gray-300 rounded-lg p-8'>
            <h2 className='text-2xl font-semibold text-center mb-6'>Sign Up</h2>
            <Form layout='vertical' onFinish={onFinish}>
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
                        { required: true, message: "Please input your name!" },
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

                <Form.Item label='Passport Series' name='passport_series'>
                    <Input
                        type='text'
                        className='border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 w-full px-3 py-2 rounded-md'
                    />
                </Form.Item>
                <Form.Item label='Expiration Date' name='expiration_date'>
                    <Input
                        type='date'
                        className='w-full border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 px-3 py-2 rounded-md'
                    />
                </Form.Item>
                <Form.Item
                    label='Role'
                    name='role'
                    rules={[
                        { required: true, message: "Please select your role!" },
                    ]}>
                    <select className='w-full border-gray-300 border-2 focus:ring focus:ring-green-200 focus:border-green-500 px-3 py-2 rounded-md'>
                        <option value='student'>Student</option>
                        <option value='guest'>Guest</option>
                    </select>
                </Form.Item>
                <Form.Item>
                    <button
                        type='submit'
                        className='w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'>
                        Submit
                    </button>
                </Form.Item>
            </Form>
            <Link to={"/"} className='underline'>
                Return to Login
            </Link>
        </div>
    );
};

export default Signup;

// VerifyPage.js
import { Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import {Link} from "react-router-dom"; 
const VerifyPage = () => {
    const API = "http://localhost:3000";
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Parse and validate values from localStorage
    const signupID = localStorage.getItem("signupID");
    const signupPhone = localStorage.getItem("signupPhone");

    const onFinish = async (values) => {
        try {
            const requestData = {
                id: Number(signupID), 
                phone: Number(signupPhone), 
                code: values.code,
                step: 2,
            };

            console.log("Request data: ", requestData);

            const response = await axios.post(
                `${API}/users/application/create`,
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Handle success response
            if (response.data.success) {
                setSuccessMessage(
                    "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi!"
                );
                setErrorMessage(null); // Clear any previous error messages
            } else {
                setErrorMessage(response.data.msg);
            }
        } catch (error) {
            console.error(error)
             
        }
    };

    return (
        <div className='flex flex-col items-center mt-20 max-w-lg mx-auto bg-white shadow-lg border-2 border-gray-300 rounded-lg p-8'>
            <h2 className='text-3xl font-semibold text-center mb-6'>
                Verify Code
            </h2>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            {successMessage && (
                <p className='text-green-500'>{successMessage}</p>
            )}
            <Form onFinish={onFinish}>
                <Form.Item
                    name='code'
                    rules={[{ required: true, message: "Kodni kiriting" }]}>
                    <Input
                        placeholder='Kodni tasdiqlang'
                        className='w-full mt-4 px-3 py-2 border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 rounded-md'
                    />
                </Form.Item>
                <button className='w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'>
                    Tasdiqlash
                </button>
            </Form>
            <Link
                to={"/"}
                className='underline mt-4 text-blue-600 hover:text-blue-800'>
                Return to Login
            </Link>
        </div>
    );
};

export default VerifyPage;

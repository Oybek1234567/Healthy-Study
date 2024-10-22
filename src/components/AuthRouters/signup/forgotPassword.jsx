import { Button, Input, Form, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const API = "http://localhost:3000";

    const handleStep1 = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API}/users/forgotpassword`, {
                phone: values.phone,
                step: 1,
            });
            if (response.data.success) {
                message.success("Kod muvaffaqiyatli yuborildi");
                setStep(2);
            } else {
                message.error(response.data.msg || "Xatolik yuz berdi");
            }
        } catch (error) {
            message.error("Xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    const handleStep2 = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(API, {
                phone: values.phone,
                code: values.code,
                newPassword: values.newPassword,
                step: 2,
            });
            if (response.data.success) {
                message.success("Parol muvaffaqiyatli o'zgartirildi");
            } else {
                message.error(response.data.msg || "Xatolik yuz berdi");
            }
        } catch (error) {
            message.error("Xatolik yuz berdi");
        } finally {
            setLoading(false);
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
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                            {step === 1
                                ? "Telefon raqamni kiriting"
                                : "Yangi parolni kiriting"}
                        </h1>

                        {step === 1 ? (
                            <Form
                                form={form}
                                onFinish={handleStep1}
                                className='space-y-4 md:space-y-6'>
                                <Form.Item
                                    name='phone'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Telefon raqamingizni kiriting!",
                                        },
                                    ]}>
                                    <Input
                                        placeholder='Telefon raqamingiz'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        loading={loading}
                                        className='w-full text-sm font-medium'>
                                        Kod yuborish
                                    </Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <Form
                                form={form}
                                onFinish={handleStep2}
                                className='space-y-4 md:space-y-6'>
                                <Form.Item
                                    name='code'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Yuborilgan kodni kiriting!",
                                        },
                                    ]}>
                                    <Input
                                        placeholder='Yuborilgan kod'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='newPassword'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Yangi parolni kiriting!",
                                        },
                                    ]}>
                                    <Input.Password
                                        placeholder='Yangi parol'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='confirmPassword'
                                    dependencies={["newPassword"]}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: "Parolni tasdiqlang!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        "newPassword"
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Parollar mos emas!"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}>
                                    <Input.Password
                                        placeholder='Parolni tasdiqlash'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        loading={loading}
                                        className='w-full text-sm font-medium'>
                                        Parolni o`zgartirish
                                    </Button>
                                </Form.Item>
                            </Form>
                        )}

                        <Link
                            to='/'
                            className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                            Back to Signin
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

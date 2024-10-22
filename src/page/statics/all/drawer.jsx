// import { UploadOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDrawer = ({ open, onClosed }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
            const API = "http://localhost:3000";


    // Upload Img
    // const props = {
    //     name: "file",
    //     action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    //     headers: {
    //         authorization: "authorization-text",
    //     },
    //     onChange(info) {
    //         if (info.file.status !== "uploading") {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (info.file.status === "done") {
    //             message.success(`${info.file.name} file uploaded successfully`);
    //         } else if (info.file.status === "error") {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    // };

    const onFinish = async (values) => {
        console.log("Form values: ", values);

        try {
            const request = {
                phone: values.phone,
                password: values.password,
                name: values.name,
                surname: values.surname,
                date_of_birth: values.date_of_birth,
                role: values.role,
                passport_series: values.passport_series,
                expiration_date: values.expiration_date,
                // passport_photo: values.passport_photo,
            };

            console.log("Request data: ", request);

            const res = await axios.post(
                `${API}/users/create`,
                request
            );

            if (res.data) {
                navigate("/success");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <Drawer title='Register' onClose={onClosed} open={open}>
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
                    <Select className=' '>
                        <Option value='super'>Staff</Option>
                        <Option value='teacher'>Teacher</Option>
                        <Option value='student'>Student</Option>
                        <Option value='module_leader'>Module Leader</Option>
                        <Option value='assistant'>Assistant</Option>
                        <Option value='guest'>Guest</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Passport Series'
                    name='passport_series'
                    rules={[
                        {
                            required: false,
                        },
                    ]}>
                    <Input type='text' className='border-2 border-black' />
                </Form.Item>
                <Form.Item
                    label='Expiration Date'
                    name='expiration_date'
                    rules={[
                        {
                            required: false,
                        },
                    ]}>
                    <Input type='date' className='border-2 border-black' />
                </Form.Item>
                <Form.Item
                    label='Upload Image'
                    name='passport_photo'
                    valuePropName='fileList'
                    getValueFromEvent={(e) => e && e.fileList}>
                    <input type='file' name='' />
                    {/* <Button icon={<UploadOutlined />}>Upload</Button>    */}
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
        </Drawer>
    );
};

export default UserDrawer

import { Button, Drawer, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";

const RoomsDrawer = ({ open, onClose, onCreate }) => {
    const [loading, setLoading] = useState(false);
    const API = "http://localhost:3000";


    const handlePost = async (data) => {
        setLoading(true);
        try {
            window.location.reload()
            alert("Xona yaratildi")
            const response = await axios.post(
                `${API}/rooms/create`,
                data
            );
            console.log(response.data);
            onCreate(data.name, data.max_students);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer
            title='Xona yaratish'
            placement='right'
            onClose={onClose}
            open={open}>
            <Form layout='vertical' onFinish={handlePost}>
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[
                        { required: true, message: "Please enter a name" },
                    ]}>
                    <Input placeholder='Type here' />
                </Form.Item>

                <Form.Item
                    label='Max Students'
                    name='max_students'
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter the maximum number of students",
                        },
                    ]}>
                    <Input type='number' placeholder='Type here' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default RoomsDrawer;

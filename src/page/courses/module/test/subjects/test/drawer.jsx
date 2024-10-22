import { Drawer, Form, Input, Button, Select, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TestsDrawer = ({ open, onClosed, onCreate }) => {
    const { id: unitId } = useParams();
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const API = "http://localhost:3000";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `${API}/questionlevels/all/${unitId}`
                );
                setData(req.data.question_levels);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (unitId) {
            fetchData();
        }
    }, [unitId]);

    const handlePost = async (values) => {
        const data = {
            ...values,
            unit_id: +unitId,
        };

        try {
            await axios.post(`${API}/questions/create`, data);
            console.log("Posted data:", data);

            if (typeof onCreate === "function") {
                onCreate(
                    data.first,
                    data.question,
                    data.second,
                    data.third,
                    data.fourth,
                    data.level_id,
                    data.unit_id
                );
            } else {
                console.error("onCreate is not a function");
            }

            notification.success({ message: "Created successfully" });
            form.resetFields();
            console.log(data);

            // window.location.reload();
        } catch (err) {
            console.error("Error:", err);
            notification.error({ message: "Failed to create" });
        }
    };

    return (
        <Drawer open={open} onClose={onClosed}>
            <Form
                form={form}
                onFinish={handlePost}
                layout='vertical'
                className='p-2'>
                <Form.Item
                    label='Question'
                    name='question'
                    rules={[
                        {
                            required: true,
                            message: "Please enter the question",
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='True answer'
                    name='true'
                    rules={[
                        {
                            required: true,
                            message: "Please enter the first answer",
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Second answer'
                    name='second'
                    rules={[
                        {
                            required: true,
                            message: "Please enter the second answer",
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Third answer'
                    name='third'
                    rules={[
                        {
                            required: true,
                            message: "Please enter the third answer",
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Fourth answer'
                    name='fourth'
                    rules={[
                        {
                            required: true,
                            message: "Please enter the fourth answer",
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Level'
                    name='level_id'
                    rules={[
                        { required: true, message: "Please select the level" },
                    ]}>
                    <Select>
                        {data.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' className='mt-3'>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default TestsDrawer;

import { Drawer, Form, Input, Button, Select, notification } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Option } = Select;

const TestsDrawer = ({ open, onClosed, onCreate }) => {
    const { id: unitId } = useParams();
    const [form] = Form.useForm();

    const handlePost = async (values) => {
        const data = {
            ...values,
            unit_id: unitId,
        };
        try {
        await axios.post(
                "http://localhost:3000/questions/create",
                data
            );
            
            if (typeof onCreate === "function") {
                onCreate(
                    data.question,
                    data.first,
                    data.second,
                    data.third,
                    data.fourth,
                    data.level,
                    data.unit_id
                );
            } else {
                console.error("onCreate is not a function");
            }
            notification.success({ message: "Created successfully" });
            form.resetFields();
            window.location.reload();
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
                    label='First answer'
                    name='first'
                    rules={[
                        {
                            required: true,
                            message: "Please enter the right answer",
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
                <Form.Item label="True Answer" name={"right"} rules={
                    [{ required: true, message: "Please enter the right answer" }]
                }>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label='Level'
                    name='level'
                    rules={[
                        { required: true, message: "Please select the level" },
                    ]}>
                    <Select rules=
                        {[
                        {required: true, message: "Please select the level"}
                    ]}>
                        <Option value='a1'>A1</Option>
                        <Option value='a2'>A2</Option>
                        <Option value='b1'>B1</Option>
                        <Option value='b2'>B2</Option>
                        <Option value='c1'>C1</Option>
                        <Option value='c2'>C2</Option>
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
